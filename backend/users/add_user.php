<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../db.php'; 

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->username) &&
    isset($data->password) &&
    isset($data->full_name) &&
    isset($data->position) &&
    isset($data->email) &&
    isset($data->phone) &&
    isset($data->permission) &&
    isset($data->approval_status)
) {
    $username = $data->username;
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $full_name = $data->full_name;
    $position = $data->position;
    $email = $data->email;
    $phone = $data->phone;
    $permission = $data->permission;
    $approval_status = $data->approval_status;

    // ตรวจสอบ username ซ้ำ
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Username นี้ถูกใช้แล้ว"]);
        exit();
    }

    // เพิ่มผู้ใช้
    $insert = $conn->prepare("INSERT INTO users (username, password, full_name, position, email, phone, permission, approval_status)
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $success = $insert->execute([
        $username, $password, $full_name, $position,
        $email, $phone, $permission, $approval_status
    ]);

    if ($success) {
        echo json_encode(["status" => "success", "message" => "เพิ่มผู้ใช้สำเร็จ"]);
    } else {
        echo json_encode(["status" => "error", "message" => "เกิดข้อผิดพลาดในการเพิ่มข้อมูล"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "ข้อมูลไม่ครบถ้วน"]);
}
?>
