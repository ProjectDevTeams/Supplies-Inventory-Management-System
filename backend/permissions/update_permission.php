<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT, POST");
header("Content-Type: application/json");

require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$name = $data['name'] ?? '';
$stock_type = $data['stock_type'] ?? '';

if (!$id || empty($name) || empty($stock_type)) {
  echo json_encode([
    "status" => "error",
    "message" => "กรุณาระบุ id, ชื่อสิทธิ์ และประเภทคลัง (stock_type)"
  ]);
  exit;
}

// คอลัมน์สิทธิ์ย่อยทั้งหมด
$fields = [
  'user', 'menu_stuff', 'manage_data', 'manage_category', 'manage_unit',
  'view_withdraw', 'track_withdraw', 'request_more', 'view_all_history',
  'history_receive', 'history_withdraw', 'history_adjust',
  'report_stock_balance', 'report_receive_monthly', 'report_expense_yearly',
  'report_withdraw', 'report_low_stock', 'approve_withdraw',
  'receive_goods', 'adjust_stock', 'manage_company', 'manage_users'
];

// เตรียม parameter map
$params = [
  ':id' => $id,
  ':name' => $name,
  ':stock_type' => $stock_type
];

foreach ($fields as $field) {
  $params[":$field"] = $data[$field] ?? 0;
}

// สร้าง SQL UPDATE string
$setPart = "name = :name, stock_type = :stock_type";
foreach ($fields as $field) {
  $setPart .= ", $field = :$field";
}

try {
  $sql = "UPDATE permissions SET $setPart WHERE id = :id";
  $stmt = $conn->prepare($sql);
  $stmt->execute($params);

  echo json_encode([
    "status" => "success",
    "message" => "อัปเดตสิทธิ์เรียบร้อยแล้ว"
  ]);
} catch (PDOException $e) {
  echo json_encode([
    "status" => "error",
    "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()
  ]);
}
