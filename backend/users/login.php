<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->username) && isset($data->password)) {
    $username = $data->username;
    $password = $data->password;

    // ดึงข้อมูลผู้ใช้จาก DB
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // ตรวจสอบรหัสผ่าน (Plaintext หรือใช้ password_verify ถ้ารหัสถูกเข้ารหัส)
        if (password_verify($password, $user['password']) || $user['password'] === $password) {
            // ตรวจสอบสถานะอนุมัติ
            if ($user['approval_status'] !== "อนุมัติ") {
                echo json_encode([
                    "status" => "error",
                    "message" => "บัญชีนี้ยังไม่ได้รับการอนุมัติ"
                ]);
                exit();
            }

            // ✅ Login สำเร็จ
            echo json_encode([
                "status" => "success",
                "id" => $user['id'],
                "username" => $user['username'],
                "full_name" => $user['full_name'],
                "position" => $user['position'],
                "email" => $user['email'],
                "phone" => $user['phone'],
                "permission" => $user['permission'],
                "approval_status" => $user['approval_status']
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
            "message" => "ไม่พบบัญชีผู้ใช้นี้"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน"
    ]);
}

$conn = null;
?>
