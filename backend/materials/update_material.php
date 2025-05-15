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

try {
    $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
    if ($id <= 0) throw new Exception("ID ไม่ถูกต้อง");

    // ดึงข้อมูลวัสดุเดิมจากฐานข้อมูล
    $stmt = $conn->prepare("SELECT * FROM materials WHERE id = :id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$existing) throw new Exception("ไม่พบวัสดุที่ต้องการแก้ไข");

    $name       = trim($_POST['name']);
    $categoryId = (int) $_POST['category_id'];
    $unit       = trim($_POST['unit']);
    $stockType  = trim($_POST['stock_type']);
    $minQty     = (int) $_POST['min_quantity'];
    $maxQty     = (int) $_POST['max_quantity'];
    $price      = floatval($_POST['price']);
    $createdAt  = $_POST['created_at'] . " 00:00:00";
    $imagePath  = $_POST['image'] ?? $existing['image'];

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $tmp = $_FILES['image']['tmp_name'];
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $base = preg_replace('/[^A-Za-z0-9_\-]/', '_', strtolower($name));
        $time = date('YmdHis');
        $file = "{$base}_{$time}.{$ext}";
        $dir  = __DIR__ . '/picture/';
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        $dest = $dir . $file;
        if (!move_uploaded_file($tmp, $dest)) throw new Exception("ไม่สามารถย้ายไฟล์ภาพ");
        $imagePath = "materials/picture/" . $file;
    }

    $sql = "UPDATE materials SET 
                name = :name,
                category_id = :category_id,
                unit = :unit,
                stock_type = :stock_type,
                min_quantity = :min_quantity,
                max_quantity = :max_quantity,
                price = :price,
                created_at = :created_at,
                image = :image
            WHERE id = :id";

    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':category_id' => $categoryId,
        ':unit' => $unit,
        ':stock_type' => $stockType,
        ':min_quantity' => $minQty,
        ':max_quantity' => $maxQty,
        ':price' => $price,
        ':created_at' => $createdAt,
        ':image' => $imagePath,
        ':id' => $id
    ]);

    echo json_encode(['status' => 'success']);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
