<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../db.php'; 

$data = json_decode(file_get_contents("php://input"));

if (isset($data->username) && isset($data->password) && !isset($data->id)) {
    
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
    $success = $stmt->execute([
        password_hash($data->password, PASSWORD_DEFAULT),
        $data->username
    ]);

    if ($success) {
        echo json_encode(["status" => "success", "message" => "อัปเดตรหัสผ่านแล้ว"]);
    } else {
        echo json_encode(["status" => "error", "message" => "ไม่สามารถอัปเดตรหัสผ่านได้"]);
    }

    $conn = null;
    exit();
}


if (
    isset($data->id) &&
    isset($data->username) &&
    isset($data->full_name) &&
    isset($data->position) &&
    isset($data->email) &&
    isset($data->phone) &&
    isset($data->permission) &&
    isset($data->approval_status)
) {
    // เช็ค username ซ้ำกับ user อื่น
    $check_stmt = $conn->prepare("SELECT id FROM users WHERE username = ? AND id != ?");
    $check_stmt->execute([$data->username, $data->id]);
    if ($check_stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Username นี้ถูกใช้แล้ว"]);
        exit();
    }

    $stmt = $conn->prepare("UPDATE users SET username = ?, full_name = ?, position = ?, email = ?, phone = ?, permission = ?, approval_status = ? WHERE id = ?");
    $success = $stmt->execute([
        $data->username,
        $data->full_name,
        $data->position,
        $data->email,
        $data->phone,
        $data->permission,
        $data->approval_status,
        $data->id
    ]);

    echo json_encode([
        "status" => $success ? "success" : "error",
        "message" => $success ? "อัปเดตข้อมูลสำเร็จ" : "ไม่สามารถอัปเดตข้อมูลได้"
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "ข้อมูลไม่ครบถ้วน"]);
}

$conn = null;
?>
