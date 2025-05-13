<?php
header("Content-Type: application/json");
include '../db.php';

$data = json_decode(file_get_contents("php://input"));

try {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$data->id]);
    echo json_encode(["message" => "ลบผู้ใช้สำเร็จ"]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
