<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['created_by']) ||
    !isset($data['reason']) ||
    !isset($data['items']) || !is_array($data['items'])
) {
    echo json_encode(["status" => "error", "message" => "ข้อมูลไม่ครบถ้วน"]);
    exit;
}

try {
    $conn->beginTransaction();

    $month = date("m");
    $year = date("Y") + 543;
    $prefix = "$year/$month";

    $stmt = $conn->prepare("SELECT running_code FROM purchase_extras WHERE running_code LIKE ? ORDER BY id DESC LIMIT 1");
    $stmt->execute(["$prefix/%"]);
    $lastCode = $stmt->fetchColumn();

    $nextNumber = 1;
    if ($lastCode) {
        $parts = explode("/", $lastCode);
        $lastNumber = (int)$parts[2];
        $nextNumber = $lastNumber + 1;
    }

    $running_code = sprintf("%s/%03d", $prefix, $nextNumber);

    // ✅ เพิ่ม purchase_extras
    $stmt = $conn->prepare("INSERT INTO purchase_extras (running_code, created_by, reason) VALUES (?, ?, ?)");
    $stmt->execute([$running_code, $data['created_by'], $data['reason']]);
    $purchase_extra_id = $conn->lastInsertId();

    // ✅ เพิ่มรายการพร้อม image
    $stmt = $conn->prepare("INSERT INTO purchase_extra_items (purchase_extra_id, material_id, new_material_name, quantity, image) VALUES (?, ?, ?, ?, ?)");
    foreach ($data['items'] as $item) {
        $stmt->execute([
            $purchase_extra_id,
            $item['material_id'] ?? null,
            $item['new_material_name'] ?? null,
            $item['quantity'] ?? 1,
            $item['image'] ?? null
        ]);
    }

    $conn->commit();
    echo json_encode(["status" => "success", "message" => "เพิ่มข้อมูลสำเร็จ", "running_code" => $running_code]);
} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
