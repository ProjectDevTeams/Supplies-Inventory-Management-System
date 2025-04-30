<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");


include_once("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["id"])) {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $data["id"]);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "ลบผู้ใช้งานเรียบร้อยแล้ว"]);
    } else {
        echo json_encode(["success" => false, "message" => "ไม่สามารถลบผู้ใช้งานได้: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ไม่พบ ID ที่ต้องการลบ"]);
}

$conn->close();