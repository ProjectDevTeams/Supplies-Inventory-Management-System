<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(["status" => "error", "message" => "Missing ID"]);
    exit;
}

try {
    $stmt = $conn->prepare("DELETE FROM material_categories WHERE id = ?");
    $stmt->execute([$data->id]);

    echo json_encode(["status" => "success", "message" => "ลบหมวดหมู่สำเร็จ"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
