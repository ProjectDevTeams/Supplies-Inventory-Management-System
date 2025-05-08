<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
require_once '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $body = json_decode(file_get_contents('php://input'), true);
    $name = trim($body['name'] ?? '');
    if ($name === '') throw new Exception("Name is required");

    // Insert แค่ชื่อบริษัท (created_by default NULL, updated_at ไม่สนใจ)
    $ins = $conn->prepare("INSERT INTO companies (name) VALUES (:name)");
    $ins->bindValue(':name', $name, PDO::PARAM_STR);
    $ins->execute();
    $newId = $conn->lastInsertId();

    // ดึงข้อมูลแถวใหม่กลับมา (ไม่เอา updated_at)
    $sel = $conn->prepare("
      SELECT
        c.id,
        c.name,
        DATE(c.created_at) AS created_at,
        u.full_name        AS created_by
      FROM companies c
      LEFT JOIN users u ON c.created_by = u.id
      WHERE c.id = :id
    ");
    $sel->bindValue(':id', $newId, PDO::PARAM_INT);
    $sel->execute();
    $row = $sel->fetch(PDO::FETCH_ASSOC);

    echo json_encode(['status'=>'success','data'=>$row]);
} catch(Exception $e) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
