<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$adjustment_id = $data['adjustment_id'] ?? null;
$items = $data['items'] ?? [];

if (!$adjustment_id || empty($items)) {
  echo json_encode(["status" => "error", "message" => "Missing data"]);
  exit;
}

$sql = "INSERT INTO adjustment_items (adjustment_id, stock_type, material_id, quantity, old_quantity)
        VALUES (:adjustment_id, :stock_type, :material_id, :quantity, :old_quantity)";
$stmt = $conn->prepare($sql);

$successCount = 0;

foreach ($items as $item) {
  $material_id = $item['material_id'];

  // ✅ ดึงค่า remaining_quantity ปัจจุบันจาก materials
  $query = $conn->prepare("SELECT remaining_quantity FROM materials WHERE id = ?");
  $query->execute([$material_id]);
  $old_quantity = $query->fetchColumn();

  $stmt->bindParam(':adjustment_id', $adjustment_id);
  $stmt->bindParam(':stock_type', $item['stock_type']);
  $stmt->bindParam(':material_id', $material_id);
  $stmt->bindParam(':quantity', $item['quantity']);
  $stmt->bindParam(':old_quantity', $old_quantity);

  if ($stmt->execute()) {
    $successCount++;
  }
}

echo json_encode([
  "status" => "success",
  "inserted_items" => $successCount
]);
