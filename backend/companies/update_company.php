<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Content-Type: application/json");
require_once '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // CORS pre-flight
    http_response_code(200);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Method Not Allowed'
    ]);
    exit;
}

try {
    // อ่าน JSON body
    $body       = json_decode(file_get_contents('php://input'), true);
    $id         = isset($body['id'])           ? (int)$body['id']           : 0;
    $name       = isset($body['name'])         ? trim($body['name'])        : '';
    $createdBy  = isset($body['created_by'])   ? (int)$body['created_by']   : 0;  // ใช้ created_by แทน

    if ($id <= 0)         throw new Exception("Invalid company id");
    if ($name === '')     throw new Exception("Name is required");
    if ($createdBy <= 0)  throw new Exception("Invalid created_by id");

    // เตรียมคำสั่ง UPDATE: เปลี่ยนชื่อบริษัท, บันทึก created_by ใหม่ และอัปเดตเวลา
    $stmt = $conn->prepare("
        UPDATE companies
           SET name        = :name,
               created_by  = :created_by,
               updated_at  = CURRENT_TIMESTAMP
         WHERE id = :id
    ");
    $stmt->bindValue(':name',       $name,       PDO::PARAM_STR);
    $stmt->bindValue(':created_by', $createdBy,  PDO::PARAM_INT);
    $stmt->bindValue(':id',         $id,         PDO::PARAM_INT);
    $stmt->execute();

    // ดึงข้อมูลที่อัปเดตแล้วกลับมา พร้อมชื่อผู้สร้าง (created_by)
    $sel = $conn->prepare("
        SELECT
          c.id,
          c.name,
          DATE(c.created_at) AS created_at,
          DATE(c.updated_at) AS updated_at,
          u.full_name        AS created_by_name
        FROM companies c
        LEFT JOIN users u ON c.created_by = u.id
        WHERE c.id = :id
    ");
    $sel->bindValue(':id', $id, PDO::PARAM_INT);
    $sel->execute();
    $row = $sel->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'data'   => $row
    ]);
} catch(Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status'  => 'error',
        'message' => $e->getMessage()
    ]);
}
