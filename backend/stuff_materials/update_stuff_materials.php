<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

// DEBUG: บันทึก log หากต้อง trace
// file_put_contents("debug_update_status.log", json_encode($data));

if (!$data || !isset($data['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required field: id"
    ]);
    exit;
}

// 🔒 ตรวจสอบสถานะว่าต้องเป็น "รับของเรียบร้อยแล้ว"
if (isset($data['User_status']) && trim($data['User_status']) !== 'รับของเรียบร้อยแล้ว') {
    echo json_encode([
        "status" => "error",
        "message" => "User_status must be 'รับของเรียบร้อยแล้ว' เท่านั้น"
    ]);
    exit;
}

try {
    $updatableFields = [
        'running_code',
        'created_at',
        'created_by',
        'reason',
        'total_amount',
        'Admin_status',
        'User_status'
    ];

    $setParts = [];
    $params = [];

    foreach ($updatableFields as $field) {
        if (isset($data[$field])) {
            $setParts[] = "$field = :$field";
            $params[":$field"] = $data[$field];
        }
    }

    if (count($setParts) === 0) {
        echo json_encode([
            "status" => "error",
            "message" => "No fields to update"
        ]);
        exit;
    }

    $params[":id"] = $data['id'];
    $sql = "UPDATE stuff_materials SET " . implode(", ", $setParts) . " WHERE id = :id";

    $stmt = $conn->prepare($sql);
    $stmt->execute($params);

    echo json_encode([
        "status" => "success",
        "message" => "อัปเดตข้อมูลเฉพาะฟิลด์ที่ส่งมาเรียบร้อยแล้ว"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "เกิดข้อผิดพลาดในการอัปเดต: " . $e->getMessage()
    ]);
}
