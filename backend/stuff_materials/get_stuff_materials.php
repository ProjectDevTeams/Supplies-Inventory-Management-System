<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include '../db.php';

$username = $_GET['username'] ?? null;
$id = $_GET['id'] ?? null; // ✅ รับค่า id ด้วย

try {
    if ($id !== null) {
        // ✅ ถ้ามี id ให้ดึงใบเบิกเฉพาะอันนั้น
        $stmt = $conn->prepare("
            SELECT sm.*, u.full_name AS created_by_name
            FROM stuff_materials sm
            LEFT JOIN users u ON sm.created_by = u.id
            WHERE sm.id = ?
        ");
        $stmt->execute([$id]);
    } elseif ($username !== null) {
        // ✅ ถ้ามี username ให้ดึงทั้งหมดของ user นั้น
        $stmt = $conn->prepare("
            SELECT sm.*, u.full_name AS created_by_name
            FROM stuff_materials sm
            LEFT JOIN users u ON sm.created_by = u.id
            WHERE u.username = ?
            ORDER BY sm.id DESC
        ");
        $stmt->execute([$username]);
    } else {
        // ✅ กรณีไม่มี filter ใช้ตอน dev/test เท่านั้น
        $stmt = $conn->prepare("
            SELECT sm.*, u.full_name AS created_by_name
            FROM stuff_materials sm
            LEFT JOIN users u ON sm.created_by = u.id
            ORDER BY sm.id DESC
        ");
        $stmt->execute();
    }

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
            "created_by_id" => $mat['created_by'], // ⭐ เพิ่ม id ของ created_by
            "created_by" => $mat['created_by_name'],
            "supervisor_name" => $mat['supervisor_name'],
            "Admin_status" => $mat['Admin_status'],
            "User_status" => $mat['User_status'],
            "reason" => $mat['reason'] ?? null,
            "items" => $items
        ];
    }

    echo json_encode([
        "status" => "success",
        "data" => $results
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()
    ]);
}
