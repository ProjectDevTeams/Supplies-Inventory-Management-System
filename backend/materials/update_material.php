<?php
// update_material.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, PUT, OPTIONS");
header("Content-Type: application/json");
require_once '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>'ID required']);
        exit;
    }
    $stmt = $conn->prepare("SELECT * FROM materials WHERE id = :id");
    $stmt->execute([':id'=>(int)$_GET['id']]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(['status'=>'success','data'=>$data]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Method not allowed']);
    exit;
}

$raw = file_get_contents("php://input");
$contentType = $_SERVER["CONTENT_TYPE"] ?? "";

try {
    if (strpos($contentType, "application/json") === false) {
        throw new Exception("Content-Type must be application/json");
    }
    $d = json_decode($raw, true);
    if (!$d) throw new Exception("Invalid JSON");
    $id = (int)($d['id'] ?? 0);
    if ($id <= 0) throw new Exception("Invalid ID");

    $stmt = $conn->prepare("SELECT * FROM materials WHERE id = :id");
    $stmt->execute([':id'=>$id]);
    $e = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$e) throw new Exception("Not found");

    $name       = isset($d['name']) && $d['name'] !== ''       ? trim($d['name'])         : $e['name'];
    $cat        = isset($d['category_id']) && $d['category_id']>0 ? (int)$d['category_id'] : $e['category_id'];
    $unit       = isset($d['unit']) && $d['unit'] !== ''       ? trim($d['unit'])         : $e['unit'];
    $stock      = isset($d['stock_type']) && $d['stock_type'] !== '' ? trim($d['stock_type']): $e['stock_type'];
    $min        = isset($d['min_quantity'])                   ? (int)$d['min_quantity']  : $e['min_quantity'];
    $max        = isset($d['max_quantity'])                   ? (int)$d['max_quantity']  : $e['max_quantity'];
    $price      = isset($d['price'])                          ? floatval($d['price'])    : $e['price'];
    $created    = isset($d['created_at']) && $d['created_at'] !== ''
                   ? $d['created_at']." 00:00:00"              : $e['created_at'];
    $img        = isset($d['image']) && $d['image'] !== ''     ? trim($d['image'])        : $e['image'];

    $u = $conn->prepare("
        UPDATE materials SET
          name = :name,
          category_id = :cat,
          unit = :unit,
          stock_type = :stock,
          min_quantity = :min,
          max_quantity = :max,
          price = :price,
          created_at = :created,
          image = :image
        WHERE id = :id
    ");
    $u->execute([
        ':name'=>$name,
        ':cat'=>$cat,
        ':unit'=>$unit,
        ':stock'=>$stock,
        ':min'=>$min,
        ':max'=>$max,
        ':price'=>$price,
        ':created'=>$created,
        ':image'=>$img,
        ':id'=>$id
    ]);

    echo json_encode(['status'=>'success']);
} catch(Exception $e) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
