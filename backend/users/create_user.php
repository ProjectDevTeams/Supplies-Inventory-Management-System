<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data["username"]) &&
    isset($data["password"]) &&
    isset($data["fullname"]) &&
    isset($data["position"]) &&
    isset($data["email"]) &&
    isset($data["phone"]) &&
    isset($data["permission"]) &&
    isset($data["department_id"])
) {
    $stmt = $conn->prepare("INSERT INTO users (username, password, fullname, position, email, phone, permission, department_id)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "sssssssi",
        $data["username"],
        $data["password"], // ควรใช้ password_hash ถ้าจะเข้ารหัส
        $data["fullname"],
        $data["position"],
        $data["email"],
        $data["phone"],
        $data["permission"],
        $data["department_id"]
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "เพิ่มผู้ใช้งานเรียบร้อยแล้ว"]);
    } else {
        echo json_encode(["success" => false, "message" => "ไม่สามารถเพิ่มผู้ใช้งานได้: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ข้อมูลไม่ครบถ้วน"]);
}

$conn->close();