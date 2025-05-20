<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include '../db.php';

// ดึงข้อมูลคำขอจัดซื้อทั้งหมด พร้อมชื่อผู้สร้าง
$stmt = $conn->prepare("
  SELECT pe.*, u.full_name AS created_by_name
  FROM purchase_extras pe
  LEFT JOIN users u ON pe.created_by = u.id
  ORDER BY pe.id DESC
");
$stmt->execute();
$extras = $stmt->fetchAll(PDO::FETCH_ASSOC);

$results = [];

foreach ($extras as $row) {
    // ดึงรายการวัสดุแต่ละใบคำขอ
    $stmtItems = $conn->prepare("
        SELECT pei.material_id, pei.new_material_name, pei.quantity, pei.image,
               m.name AS material_name, m.unit
        FROM purchase_extra_items pei
        LEFT JOIN materials m ON pei.material_id = m.id
        WHERE pei.purchase_extra_id = ?
    ");
    $stmtItems->execute([$row['id']]);
    $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

    $results[] = [
        "id" => $row['id'],
        "created_date" => $row['created_date'],
        "created_by" => $row['created_by_name'],
        "reason" => $row['reason'],
        "approval_status" => $row['approval_status'],
        "items" => $items
    ];
}

echo json_encode([
  "status" => "success",
  "data" => $results
], JSON_UNESCAPED_UNICODE);
