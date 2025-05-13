<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
require_once '../db.php'; // เชื่อมต่อฐานข้อมูล

try {
    // เปลี่ยน JOIN เป็น LEFT JOIN เพื่อให้คืนทุกแถวจาก companies
    $stmt = $conn->prepare("
        SELECT 
            c.id, 
            c.name, 
            DATE(c.created_at) AS created_at, 
            DATE(c.updated_at) AS updated_at,
            u.full_name AS created_by
        FROM companies c
        LEFT JOIN users u ON c.created_by = u.id
    ");

    $stmt->execute();

    $companies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data"   => $companies
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
?>
