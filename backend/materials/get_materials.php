<?php
header("Access-Control-Allow-Origin: *");               // อนุญาตให้เรียก API ได้จากทุกที่
header("Access-Control-Allow-Headers: *");              // อนุญาต header ทุกชนิด
header("Access-Control-Allow-Methods: *");              // อนุญาตวิธีการ HTTP ทุกรูปแบบ (GET, POST, ฯลฯ)
header("Content-Type: application/json");                 // ระบุว่าส่งข้อมูลออกเป็น JSON

require_once '../db.php'; // เชื่อมต่อฐานข้อมูลผ่าน PDO

try {
    // เตรียมคำสั่ง SQL เพื่อดึงข้อมูลวัสดุทั้งหมด
    $stmt = $conn->prepare(" 
        SELECT 
            m.id,
            -- แปลง backslashes (\\) เป็น forward slashes (/) สำหรับ path รูปภาพ
            REPLACE(m.image, '\\\\', '/') AS image,
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
        LEFT JOIN material_categories mc 
            ON m.category_id = mc.id
    ");

    $stmt->execute();                             // รันคำสั่ง SQL
    $materials = $stmt->fetchAll(PDO::FETCH_ASSOC); // ดึงข้อมูลทั้งหมดใส่ตัวแปร

    // ส่งผลลัพธ์กลับเป็น JSON พร้อมสถานะ success
    echo json_encode([
        "status" => "success",
        "data"   => $materials
    ]);

} catch (PDOException $e) {
    // กรณีเกิดข้อผิดพลาด ให้ส่ง JSON แจ้ง error message
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
