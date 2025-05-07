<?php
// เชื่อมต่อฐานข้อมูล
require_once '../db.php';

try {
    // เตรียมคำสั่ง SQL พร้อม JOIN กับ permissions
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
    ");

    $stmt->execute();

    // ดึงข้อมูลทั้งหมดในรูปแบบ associative array
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ส่งออกข้อมูลเป็น JSON
    echo json_encode([
        "status" => "success",
        "data" => $users
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
