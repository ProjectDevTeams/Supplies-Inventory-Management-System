<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

// รับค่าหลัก
$name = $data['name'] ?? '';
$stock_type = $data['stock_type'] ?? '';

if (empty($name) || empty($stock_type)) {
  echo json_encode([
    "status" => "error",
    "message" => "กรุณาระบุชื่อสิทธิ์และประเภทคลัง (stock_type)"
  ]);
  exit;
}

// รายการคอลัมน์สิทธิ์ทั้งหมด (ไม่รวม id, created_at, updated_at)
$fields = [
  'user', 'menu_stuff', 'manage_data', 'manage_category', 'manage_unit',
  'view_withdraw', 'track_withdraw', 'request_more', 'view_all_history',
  'history_receive', 'history_withdraw', 'history_adjust',
  'report_stock_balance', 'report_receive_monthly', 'report_expense_yearly',
  'report_withdraw', 'report_low_stock', 'approve_withdraw',
  'receive_goods', 'adjust_stock', 'manage_company', 'manage_users'
];

// เตรียมข้อมูลสำหรับ bind
$params = [
  ':name' => $name,
  ':stock_type' => $stock_type
];

foreach ($fields as $field) {
  $params[":$field"] = $data[$field] ?? 0;
}

// SQL
$fieldNames = implode(', ', $fields);
$fieldTokens = implode(', ', array_map(fn($f) => ":$f", $fields));

try {
  $sql = "INSERT INTO permissions (name, stock_type, $fieldNames)
          VALUES (:name, :stock_type, $fieldTokens)";
  $stmt = $conn->prepare($sql);
  $stmt->execute($params);

  echo json_encode([
    "status" => "success",
    "message" => "เพิ่มสิทธิ์ใหม่สำเร็จ"
  ]);
} catch (PDOException $e) {
  echo json_encode([
    "status" => "error",
    "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()
  ]);
}
