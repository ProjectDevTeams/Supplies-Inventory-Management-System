<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
require_once '../db.php';

// รับข้อมูล JSON จาก frontend
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบว่ามี id และข้อมูลอื่นที่จำเป็น
if (
    !isset($data['id']) ||
    !isset($data['username']) ||
    !isset($data['full_name']) ||
    !isset($data['position']) ||
    !isset($data['email']) ||
    !isset($data['phone']) ||
    !isset($data['permission_id'])
) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields"
    ]);
    exit;
}

try {
    $stmt = $conn->prepare("
        UPDATE users SET 
            username = :username,
            full_name = :full_name,
            position = :position,
            email = :email,
            phone = :phone,
            permission_id = :permission_id
        WHERE id = :id
    ");

    $stmt->bindParam(':username', $data['username']);
    $stmt->bindParam(':full_name', $data['full_name']);
    $stmt->bindParam(':position', $data['position']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':phone', $data['phone']);
    $stmt->bindParam(':permission_id', $data['permission_id'], PDO::PARAM_INT);
    $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);

    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "User updated successfully"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
