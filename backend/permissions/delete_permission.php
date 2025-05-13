<?php
header('Content-Type: application/json');
include 'db.php'; // หรือใช้ require '../db.php' หาก db.php อยู่นอกโฟลเดอร์

// รับข้อมูล JSON ที่ส่งเข้ามา
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบว่าได้รับ id มาหรือไม่
if (!isset($data['id'])) {
  echo json_encode(['status' => 'error', 'message' => 'Missing ID']);
  exit;
}

$id = $data['id'];

// ใช้ prepared statement ป้องกัน SQL injection
$sql = "DELETE FROM permissions WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(['status' => 'success']);
} else {
  echo json_encode(['status' => 'error', 'message' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
