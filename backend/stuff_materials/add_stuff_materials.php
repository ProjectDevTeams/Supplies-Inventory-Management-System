<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include '../db.php';

// รับข้อมูล JSON จาก React หรือ frontend
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบค่าว่างที่จำเป็น (ไม่ต้องมี running_code แล้ว)
if (
    !isset($data['created_by']) ||
    !isset($data['reason']) ||
    !isset($data['total_amount']) ||
    !isset($data['Admin_status']) ||
    !isset($data['User_status']) ||
    !isset($data['items']) || !is_array($data['items'])
) {
    echo json_encode([
        "status" => "error",
        "message" => "ข้อมูลไม่ครบถ้วน"
    ]);
    exit;
}

try {
    // เริ่ม transaction
    $conn->beginTransaction();

    // สร้าง running_code อัตโนมัติ
    $month = date("m");
    $year = date("Y") + 543; // ปี พ.ศ.
    $prefix = "SM-$year/$month";

    $stmtCode = $conn->prepare("
        SELECT running_code FROM stuff_materials 
        WHERE running_code LIKE ? 
        ORDER BY id DESC 
        LIMIT 1
    ");
    $stmtCode->execute(["$prefix/%"]);
    $lastCode = $stmtCode->fetchColumn();

    if ($lastCode) {
        $parts = explode("/", $lastCode);
        $lastNumber = (int)$parts[2];
        $nextNumber = str_pad($lastNumber + 1, 3, "0", STR_PAD_LEFT);
    } else {
        $nextNumber = "001";
    }

    $running_code = "$prefix/$nextNumber";

    // เพิ่มใบเบิก
    $stmt = $conn->prepare("
        INSERT INTO stuff_materials 
        (running_code, created_at, created_by, reason, total_amount, Admin_status, User_status) 
        VALUES (?, NOW(), ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $running_code,
        $data['created_by'],
        $data['reason'],
        $data['total_amount'],
        $data['Admin_status'],
        $data['User_status']
    ]);

    $stuff_material_id = $conn->lastInsertId();

    // เพิ่มวัสดุในใบเบิก
    $stmtItem = $conn->prepare("
        INSERT INTO stuff_material_items 
        (stuff_material_id, material_id, quantity, total_price) 
        VALUES (?, ?, ?, ?)
    ");
    foreach ($data['items'] as $item) {
        $stmtItem->execute([
            $stuff_material_id,
            $item['material_id'],
            $item['quantity'],
            $item['total_price']
        ]);
    }

    $conn->commit();

    echo json_encode([
        "status" => "success",
        "message" => "เพิ่มใบเบิกเรียบร้อยแล้ว",
        "id" => $stuff_material_id,
        "running_code" => $running_code
    ]);
} catch (PDOException $e) {
    $conn->rollBack();
    echo json_encode([
        "status" => "error",
        "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()
    ]);
}
