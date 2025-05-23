<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$status_user = $data['status_user'] ?? null;

if (!$id || !$status_user) {
  echo json_encode(["status" => "error", "message" => "Missing id or status_user"]);
  exit;
}

try {
  $conn->beginTransaction();

  // หากสถานะคือ "รับของเรียบร้อย" ให้ลด remaining_quantity
  if ($status_user === "รับของเรียบร้อย") {
    // ดึงวัสดุและจำนวนที่เบิกจากใบเบิกนี้
    $stmt = $conn->prepare("SELECT material_id, quantity FROM stuff_material_items WHERE stuff_material_id = ?");
    $stmt->execute([$id]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($items as $item) {
      $material_id = $item['material_id'];
      $quantity = $item['quantity'];

      // อัปเดต remaining_quantity ของวัสดุ
      $updateStmt = $conn->prepare("
        UPDATE materials
        SET remaining_quantity = GREATEST(remaining_quantity - ?, 0)
        WHERE id = ?
      ");
      $updateStmt->execute([$quantity, $material_id]);
    }
  }

  // อัปเดตสถานะผู้ใช้ใน stuff_materials
  $updateStatusStmt = $conn->prepare("
    UPDATE stuff_materials
    SET User_status = ?
    WHERE id = ?
  ");
  $updateStatusStmt->execute([$status_user, $id]);

  $conn->commit();
  echo json_encode(["status" => "success", "message" => "อัปเดตสถานะผู้ใช้สำเร็จ"]);
} catch (Exception $e) {
  $conn->rollBack();
  echo json_encode(["status" => "error", "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()]);
}
