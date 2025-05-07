<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

require_once '../db.php'; // ไฟล์นี้กำหนด $conn = new PDO(...)

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$password = $data['password'];

try {
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($password, $user['password'])) {
            unset($user['password']); // ไม่ส่งรหัสผ่านกลับไป
            echo json_encode([
                "status" => "success",
                "message" => "เข้าสู่ระบบสำเร็จ",
                "user" => $user
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "รหัสผ่านไม่ถูกต้อง"
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "ไม่พบชื่อผู้ใช้นี้"
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "เกิดข้อผิดพลาดในระบบ: " . $e->getMessage()
    ]);
}
