<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
require_once '../db.php';

// ตรวจสอบว่ามีการส่ง id มาหรือไม่
if (!isset($_GET['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing user ID"
    ]);
    exit;
}

$user_id = $_GET['id'];

try {
    // เตรียมคำสั่ง SQL พร้อม JOIN เพื่อดึงสิทธิ์
    $stmt = $conn->prepare("
        SELECT 
            users.id,
            users.username,
            users.full_name,
            users.position,
            users.email,
            users.phone,
            permissions.name AS permission_name,
            users.permission_id
        FROM users
        LEFT JOIN permissions ON users.permission_id = permissions.id
        WHERE users.id = :id
    ");

    $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode([
            "status" => "success",
            "data" => $user
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "User not found"
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
