<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// เชื่อมต่อฐานข้อมูล
include_once("../db.php");

// ดึงข้อมูลจากตาราง users
$sql = "SELECT id, username, fullname, position AS `group`, email, phone, permission AS role FROM users";
$result = $conn->query($sql);

// ตรวจสอบผลลัพธ์
if ($result->num_rows > 0) {
    $users = [];

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $users
    ]);
} else {
    echo json_encode([
        "success" => true,
        "data" => []
    ]);
}

// ปิดการเชื่อมต่อ
$conn->close();
?>
