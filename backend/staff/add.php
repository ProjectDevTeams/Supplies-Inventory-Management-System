<?php
include '../db.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// เช็กว่า $data ไม่ว่าง และข้อมูลไม่ว่าง
if (!$data || empty($data['username']) || empty($data['password']) || empty($data['fullname']) || empty($data['permission'])) {
    echo json_encode(["success" => false, "error" => "กรุณากรอกข้อมูลให้ครบถ้วน"]);
    exit;
}

// เตรียมข้อมูล
$username = $data['username'];
$password = $data['password'];
$fullname = $data['fullname'];
$position = $data['position'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$permission = $data['permission'];
$department_id = 1; // ตั้งค่า department ไว้คงที่ก่อน (ถ้ายังไม่มีให้เลือก)

// SQL Insert
$sql = "INSERT INTO users (username, password, fullname, position, email, phone, permission, department_id)
        VALUES ('$username', '$password', '$fullname', '$position', '$email', '$phone', '$permission', $department_id)";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}
?>
