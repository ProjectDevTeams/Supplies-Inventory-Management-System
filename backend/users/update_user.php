<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data["id"]) &&
    isset($data["username"]) &&
    isset($data["fullname"]) &&
    isset($data["position"]) &&
    isset($data["email"]) &&
    isset($data["phone"]) &&
    isset($data["permission"]) &&
    isset($data["department_id"])
) {
    $sql = "UPDATE users 
            SET username = ?, fullname = ?, position = ?, email = ?, phone = ?, permission = ?, department_id = ? 
            WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssssssii",
        $data["username"],
        $data["fullname"],
        $data["position"],
        $data["email"],
        $data["phone"],
        $data["permission"],
        $data["department_id"],
        $data["id"]
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "อัปเดตข้อมูลผู้ใช้งานเรียบร้อยแล้ว"]);
    } else {
        echo json_encode(["success" => false, "message" => "เกิดข้อผิดพลาดในการอัปเดต: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ข้อมูลไม่ครบถ้วน"]);
}

$conn->close();