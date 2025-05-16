<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once '../db.php';

// รับข้อมูล JSON จาก client
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->name) || empty(trim($data->name))) {
  echo json_encode([
    "status" => "error",
    "message" => "กรุณาระบุชื่อหมวดหมู่"
  ]);
  exit;
}

try {
  // เตรียมคำสั่ง SQL
  $stmt = $conn->prepare("INSERT INTO material_categories (name) VALUES (:name)");
  $stmt->bindParam(':name', $data->name);
  $stmt->execute();

  echo json_encode([
    "status" => "success",
    "message" => "เพิ่มหมวดหมู่สำเร็จ",
    "id" => $conn->lastInsertId() // ส่ง id ที่เพิ่มกลับไป
  ]);
} catch (PDOException $e) {
  echo json_encode([
    "status" => "error",
    "message" => $e->getMessage()
  ]);
}
?>
