<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include '../db.php';

// รับค่า id จาก GET
$id = $_GET['id'] ?? null;
if (!$id) {
  echo json_encode(["status" => "error", "message" => "Missing ID"]);
  exit;
}

// ดึงข้อมูลหลักจาก stuff_materials
$stmt = $conn->prepare("
  SELECT sm.*, u.full_name AS name, u.position AS department
  FROM stuff_materials sm
  LEFT JOIN users u ON sm.created_by = u.id
  WHERE sm.id = ?
");
$stmt->execute([$id]);
$main = $stmt->fetch(PDO::FETCH_ASSOC);

// ถ้าไม่พบข้อมูล
if (!$main) {
  echo json_encode(["status" => "error", "message" => "Not found"]);
  exit;
}

// ดึงรายการวัสดุจาก stuff_material_items
$stmt = $conn->prepare("
  SELECT smi.material_id, m.name, m.unit, smi.quantity, smi.total_price
  FROM stuff_material_items smi
  LEFT JOIN materials m ON smi.material_id = m.id
  WHERE smi.stuff_material_id = ?
");
$stmt->execute([$id]);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

// รวมข้อมูลและส่งกลับ
echo json_encode([
  "status" => "success",
  "data" => array_merge($main, ["items" => $items])
], JSON_UNESCAPED_UNICODE);
