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

// รับข้อมูล JSON จาก frontend
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$approval_status = $data['approval_status'] ?? null;
$reason = $data['reason'] ?? null;

if (!$id) {
    echo json_encode(["status" => "error", "message" => "Missing ID"]);
    exit;
}

// เตรียมอัปเดตข้อมูลแบบ dynamic
$fields = [];
$params = [];

if ($approval_status !== null) {
    $fields[] = "approval_status = ?";
    $params[] = $approval_status;
}

if ($reason !== null) {
    $fields[] = "reason = ?";
    $params[] = $reason;
}

if (empty($fields)) {
    echo json_encode(["status" => "error", "message" => "No fields to update"]);
    exit;
}

$params[] = $id;
$sql = "UPDATE purchase_extras SET " . implode(", ", $fields) . " WHERE id = ?";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    echo json_encode(["status" => "success", "message" => "อัปเดตข้อมูลสำเร็จ"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
