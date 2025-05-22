<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

require_once '../db.php';

try {
    // ดึงข้อมูลใบรับวัสดุทั้งหมด พร้อมชื่อผู้ใช้และบริษัท
    $stmt = $conn->prepare("
        SELECT 
            rm.*,
            u.full_name AS created_by,
            c.name AS company_name
        FROM receive_materials rm
        LEFT JOIN users u ON rm.created_by = u.id
        LEFT JOIN companies c ON rm.company_id = c.id
        ORDER BY rm.created_at DESC
    ");
    $stmt->execute();
    $mainList = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];

    foreach ($mainList as $row) {
        // ดึงรายการวัสดุแต่ละใบ
        $stmtItems = $conn->prepare("
            SELECT 
                rmi.*,
                m.name,
                m.unit
            FROM receive_material_items rmi
            LEFT JOIN materials m ON rmi.material_id = m.id
            WHERE rmi.receive_material_id = ?
        ");
        $stmtItems->execute([$row['id']]);
        $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

        $row['items'] = $items;
        $result[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $result
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
