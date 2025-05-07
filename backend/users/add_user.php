<?php
require_once '../db.php';

// รับข้อมูล JSON ที่ถูกส่งมาจาก frontend
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบว่าได้รับฟิลด์ครบหรือไม่
if (
    !isset($data['username']) ||
    !isset($data['password']) ||
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

// เข้ารหัสรหัสผ่านก่อนเก็บ
$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

try {
    // ตรวจสอบว่า username ซ้ำหรือไม่
    $checkStmt = $conn->prepare("SELECT id FROM users WHERE username = :username");
    $checkStmt->bindParam(':username', $data['username']);
    $checkStmt->execute();

    if ($checkStmt->rowCount() > 0) {
        echo json_encode([
            "status" => "error",
            "message" => "Username already exists"
        ]);
        exit;
    }

    // เพิ่มผู้ใช้ใหม่
    $stmt = $conn->prepare("
        INSERT INTO users (username, password, full_name, position, email, phone, permission_id)
        VALUES (:username, :password, :full_name, :position, :email, :phone, :permission_id)
    ");

    $stmt->bindParam(':username', $data['username']);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':full_name', $data['full_name']);
    $stmt->bindParam(':position', $data['position']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':phone', $data['phone']);
    $stmt->bindParam(':permission_id', $data['permission_id'], PDO::PARAM_INT);

    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "User added successfully"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
