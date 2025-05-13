<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

require_once '../db.php'; // เชื่อมต่อฐานข้อมูล

try {
    // ดึงข้อมูลวัสดุจากฐานข้อมูลทั้งหมด
    $stmt = $conn->prepare("SELECT 
                                m.id,
                                m.image,
                                m.name,
                                mc.name AS category,
                                m.unit,
                                m.stock_type AS location,
                                m.price,
                                m.status,
                                m.carry_over_quantity,
                                m.issued_quantity,
                                m.remaining_quantity AS remain,
                                m.min_quantity AS low,
                                m.max_quantity AS high,
                                m.received_quantity AS brought
                            FROM materials m
                            LEFT JOIN material_categories mc ON m.category_id = mc.id");

    $stmt->execute();
    $materials = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ส่งข้อมูลทั้งหมดในรูปแบบ JSON
    echo json_encode([
        "status" => "success",
        "data"   => $materials
    ]);

} catch (PDOException $e) {
    // ส่งข้อความผิดพลาดหากเกิดข้อผิดพลาดใน SQL
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
?>
