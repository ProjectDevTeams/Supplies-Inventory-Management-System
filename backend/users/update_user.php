<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include '../db.php';

$data = json_decode(file_get_contents("php://input"));

try {
    $stmt = $conn->prepare("UPDATE users SET username=?, full_name=?, position=?, email=?, phone=?, permission_id=?, approval_status=? WHERE id=?");
    $stmt->execute([
        $data->username,
        $data->full_name,
        $data->position,
        $data->email,
        $data->phone,
        $data->permission_id,
        $data->approval_status,
        $data->id
    ]);
    echo json_encode(["message" => "แก้ไขผู้ใช้สำเร็จ"]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
