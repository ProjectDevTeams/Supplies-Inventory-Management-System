<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include '../db.php';


$raw = file_get_contents("php://input");
$data = json_decode($raw, true);



if (!isset($data['id'])) {
    echo json_encode(["status" => "error", "message" => "Missing ID"]);
    exit;
}

$id = $data['id'];
$running_code = $data['running_code'] ?? null;
$created_at = $data['created_at'] ?? null;
$created_by = $data['created_by'] ?? null;
$reason = $data['reason'] ?? null;
$total_amount = $data['total_amount'] ?? null;
$admin_status = $data['Admin_status'] ?? null;
$user_status = $data['User_status'] ?? null;


$fields = [];
$params = [];

if ($running_code !== null) {
    $fields[] = "running_code = ?";
    $params[] = $running_code;
}
if ($created_at !== null) {
    $fields[] = "created_at = ?";
    $params[] = $created_at;
}
if ($created_by !== null) {
    $fields[] = "created_by = ?";
    $params[] = $created_by;
}
if ($reason !== null) {
    $fields[] = "reason = ?";
    $params[] = $reason;
}
if ($total_amount !== null) {
    $fields[] = "total_amount = ?";
    $params[] = $total_amount;
}
if ($admin_status !== null) {
    $fields[] = "Admin_status = ?";
    $params[] = $admin_status;
}
if ($user_status !== null) {
    $fields[] = "User_status = ?";
    $params[] = $user_status;
}

if (empty($fields)) {
    echo json_encode(["status" => "error", "message" => "No fields to update"]);
    exit;
}

$params[] = $id;
$sql = "UPDATE stuff_materials SET " . implode(", ", $fields) . " WHERE id = ?";

$stmt = $conn->prepare($sql);
if ($stmt->execute($params)) {
    echo json_encode(["status" => "success", "message" => "Updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Update failed"]);
}
?>
