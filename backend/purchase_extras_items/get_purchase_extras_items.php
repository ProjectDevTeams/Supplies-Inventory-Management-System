<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
include '../db.php';

// รับค่า id จาก GET
$id = $_GET['id'] ?? null;
if (!$id) {
  echo json_encode(["status" => "error", "message" => "Missing ID"]);
  exit;
}

// ดึงข้อมูลหลักจาก purchase_extras
$stmt = $conn->prepare("
  SELECT pe.*, u.full_name AS name, u.position AS department
  FROM purchase_extras pe
  LEFT JOIN users u ON pe.created_by = u.id
  WHERE pe.id = ?
");
$stmt->execute([$id]);
$main = $stmt->fetch(PDO::FETCH_ASSOC);

// ถ้าไม่พบข้อมูล
if (!$main) {
  echo json_encode(["status" => "error", "message" => "Not found"]);
  exit;
}

// ดึงรายการวัสดุจาก purchase_extra_items
$stmt = $conn->prepare("
  SELECT pei.material_id, pei.new_material_name, pei.quantity, pei.image,
         m.name, m.unit
  FROM purchase_extra_items pei
  LEFT JOIN materials m ON pei.material_id = m.id
  WHERE pei.purchase_extra_id = ?
");
$stmt->execute([$id]);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

// รวมข้อมูลและส่งกลับ
echo json_encode([
  "status" => "success",
  "data" => array_merge($main, ["items" => $items])
], JSON_UNESCAPED_UNICODE);
