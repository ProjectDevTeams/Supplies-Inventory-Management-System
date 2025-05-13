<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");

require_once '../db.php';

try {
    $stmt = $conn->prepare("SELECT * FROM permissions");
    $stmt->execute();
    $permissions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $permissions
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()
    ]);
}
