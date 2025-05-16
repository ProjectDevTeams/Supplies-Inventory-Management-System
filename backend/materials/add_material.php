<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$contentType = $_SERVER["CONTENT_TYPE"] ?? "";

try {
    if (strpos($contentType, "application/json") !== false) {
        $body = json_decode(file_get_contents("php://input"), true);
        if (!$body) throw new Exception("Invalid JSON");

        $name       = trim($body['name'] ?? '');
        $categoryId = (int) ($body['category_id'] ?? 0);
        $unit       = trim($body['unit'] ?? '');
        $stockType  = trim($body['stock_type'] ?? '');
        $carryOver  = (int) ($body['carry_over_quantity'] ?? 0);
        $minQty     = (int) ($body['min_quantity'] ?? 0);
        $maxQty     = (int) ($body['max_quantity'] ?? 0);
        $price      = floatval($body['price'] ?? 0);
        $createdAt  = !empty($body['created_at']) ? ($body['created_at'] . " 00:00:00") : date('Y-m-d H:i:s');
        $imagePath  = trim($body['image'] ?? '');
    } else {
        $name       = trim($_POST['name'] ?? '');
        $categoryId = (int) ($_POST['category_id'] ?? 0);
        $unit       = trim($_POST['unit'] ?? '');
        $stockType  = trim($_POST['stock_type'] ?? '');
        $carryOver  = (int) ($_POST['carry_over_quantity'] ?? 0);
        $minQty     = (int) ($_POST['min_quantity'] ?? 0);
        $maxQty     = (int) ($_POST['max_quantity'] ?? 0);
        $price      = floatval($_POST['price'] ?? 0);
        $createdAt  = !empty($_POST['created_at']) ? ($_POST['created_at'] . " 00:00:00") : date('Y-m-d H:i:s');

        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            throw new Exception("เกิดปัญหาในการอัปโหลดภาพ");
        }

        $tmp = $_FILES['image']['tmp_name'];
        $clientFilePath = $_POST['image'] ?? '';
        $filename = basename($clientFilePath);

        $dir = __DIR__ . '/picture/';
        if (!is_dir($dir)) mkdir($dir, 0755, true);

        $dest = $dir . $filename;

        if (!move_uploaded_file($tmp, $dest)) {
            throw new Exception("ไม่สามารถย้ายไฟล์ภาพ");
        }

        $imagePath = 'materials/picture/' . $filename;
    }

    if ($name === '') throw new Exception("ชื่อวัสดุเป็นค่าว่าง");
    if ($categoryId <= 0) throw new Exception("ประเภทวัสดุไม่ถูกต้อง");

    $remain = $carryOver;
    $received = 0;
    $issued = 0;
    $adjusted = 0;

    $sql = "INSERT INTO materials
               (image, name, category_id, unit, stock_type,
                carry_over_quantity, max_quantity, min_quantity,
                price, remaining_quantity, received_quantity,
                issued_quantity, adjusted_quantity, created_at)
            VALUES
               (:image, :name, :cat, :unit, :stock,
                :carry, :max, :min,
                :price, :remain, :received,
                :issued, :adjusted, :created)";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':image', $imagePath, PDO::PARAM_STR);
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->bindValue(':cat', $categoryId, PDO::PARAM_INT);
    $stmt->bindValue(':unit', $unit, PDO::PARAM_STR);
    $stmt->bindValue(':stock', $stockType, PDO::PARAM_STR);
    $stmt->bindValue(':carry', $carryOver, PDO::PARAM_INT);
    $stmt->bindValue(':max', $maxQty, PDO::PARAM_INT);
    $stmt->bindValue(':min', $minQty, PDO::PARAM_INT);
    $stmt->bindValue(':price', $price);
    $stmt->bindValue(':remain', $remain, PDO::PARAM_INT);
    $stmt->bindValue(':received', $received, PDO::PARAM_INT);
    $stmt->bindValue(':issued', $issued, PDO::PARAM_INT);
    $stmt->bindValue(':adjusted', $adjusted, PDO::PARAM_INT);
    $stmt->bindValue(':created', $createdAt, PDO::PARAM_STR);
    $stmt->execute();

    $newId = $conn->lastInsertId();
    $sel = $conn->prepare("SELECT * FROM materials WHERE id = :id");
    $sel->bindValue(':id', $newId, PDO::PARAM_INT);
    $sel->execute();
    $newRow = $sel->fetch(PDO::FETCH_ASSOC);

    echo json_encode(['status'=>'success','data'=>$newRow]);
}
catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
