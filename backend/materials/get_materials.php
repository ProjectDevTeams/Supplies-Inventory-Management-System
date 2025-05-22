<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

require_once '../db.php';

try {
    // ดึงข้อมูลวัสดุ (เพิ่ม created_at)
    $stmt = $conn->prepare("
        SELECT 
            m.id,
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
            m.received_quantity AS brought,
            m.created_at                                -- ✅ เพิ่มตรงนี้
        FROM materials m
        LEFT JOIN material_categories mc ON m.category_id = mc.id
    ");
    $stmt->execute();
    $materials = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ===== 🧹 ลบรูปที่ไม่ได้ใช้งานจาก materials table =====
    $dir = __DIR__ . '/picture/';
    $basePath = 'materials/picture/';

    $usedPaths = array_column($materials, 'image');
    $usedFiles = array_map(function($path) use ($basePath) {
        return str_replace($basePath, '', $path);
    }, $usedPaths);

    $files = scandir($dir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        if (!in_array($file, $usedFiles)) {
            @unlink($dir . $file);
        }
    }

    echo json_encode([
        "status" => "success",
        "data"   => $materials
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
