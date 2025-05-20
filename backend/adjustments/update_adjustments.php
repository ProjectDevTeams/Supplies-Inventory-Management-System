<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$adjustment_id = $data['adjustment_id'] ?? null;
$status = $data['status'] ?? null;

try {
  if ($adjustment_id && $status !== null) {
    $stmt = $conn->prepare("UPDATE adjustments SET status = ?, updated_date = NOW() WHERE id = ?");
    $stmt->execute([$status, $adjustment_id]);

    echo json_encode(["status" => "success"]);
  } else {
    echo json_encode(["status" => "error", "message" => "ข้อมูลไม่ครบ"]);
  }
} catch (PDOException $e) {
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
