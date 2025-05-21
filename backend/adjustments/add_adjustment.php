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
$created_by = $data['created_by'] ?? null;

if (!$created_by) {
  echo json_encode(["status" => "error", "message" => "Missing created_by"]);
  exit;
}

$sql = "INSERT INTO adjustments (created_by) VALUES (:created_by)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(":created_by", $created_by);

if ($stmt->execute()) {
  echo json_encode([
    "status" => "success",
    "adjustment_id" => $conn->lastInsertId()
  ]);
} else {
  echo json_encode(["status" => "error", "message" => "Failed to insert"]);
}
