<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include '../db.php';

// ดึงข้อมูลใบเบิกทั้งหมด พร้อมชื่อผู้สร้าง
$stmt = $conn->prepare("
  SELECT sm.*, u.full_name AS created_by_name
  FROM stuff_materials sm
  LEFT JOIN users u ON sm.created_by = u.id
  ORDER BY sm.id DESC
");
$stmt->execute();
$materials = $stmt->fetchAll(PDO::FETCH_ASSOC);

$results = [];

foreach ($materials as $mat) {
    $stmtItems = $conn->prepare("
        SELECT smi.material_id, m.name, m.unit, smi.quantity, smi.total_price
        FROM stuff_material_items smi
        LEFT JOIN materials m ON smi.material_id = m.id
        WHERE smi.stuff_material_id = ?
    ");
    $stmtItems->execute([$mat['id']]);
    $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

    $results[] = [
        "id" => $mat['id'],
        "running_code" => $mat['running_code'],
        "created_at" => $mat['created_at'],
        "created_by" => $mat['created_by_name'],
        "supervisor_name" => $mat['supervisor_name'], // ✅ เพิ่มบรรทัดนี้
        "Admin_status" => $mat['Admin_status'],
        "User_status" => $mat['User_status'],
        "items" => $items
    ];
}

echo json_encode([
  "status" => "success",
  "data" => $results
], JSON_UNESCAPED_UNICODE);
