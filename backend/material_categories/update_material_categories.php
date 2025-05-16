<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");

require_once '../db.php';

// รับข้อมูล JSON ที่ส่งมา
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id) || !isset($data->name)) {
  echo json_encode([
    "status" => "error",
    "message" => "Missing ID or name"
  ]);
  exit;
}

try {
  $stmt = $conn->prepare("UPDATE material_categories SET name = ? WHERE id = ?");
  $stmt->execute([$data->name, $data->id]);

  echo json_encode([
    "status" => "success",
    "message" => "อัปเดตหมวดหมู่สำเร็จ"
  ]);
} catch (PDOException $e) {
  echo json_encode([
    "status" => "error",
    "message" => $e->getMessage()
  ]);
}
?>
