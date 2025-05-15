<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../db.php'; 

$data = json_decode(file_get_contents("php://input"));

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
    $id = $data->id;
    $username = $data->username;
    $full_name = $data->full_name;
    $position = $data->position;
    $email = $data->email;
    $phone = $data->phone;
    $permission = $data->permission;
    $approval_status = $data->approval_status;

 
    $check_stmt = $conn->prepare("SELECT id FROM users WHERE username = ? AND id != ?");
    $check_stmt->execute([$username, $id]);
    if ($check_stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Username นี้ถูกใช้แล้ว"]);
        exit();
    }

    
    $stmt = $conn->prepare("UPDATE users SET username = ?, full_name = ?, position = ?, email = ?, phone = ?, permission = ?, approval_status = ? WHERE id = ?");
    $success = $stmt->execute([
        $username, $full_name, $position,
        $email, $phone, $permission, $approval_status,
        $id
    ]);

    if ($success) {
        echo json_encode(["status" => "success", "message" => "อัปเดตข้อมูลสำเร็จ"]);
    } else {
        echo json_encode(["status" => "error", "message" => "ไม่สามารถอัปเดตข้อมูลได้"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "ข้อมูลไม่ครบถ้วน"]);
}

$conn = null;
?>
