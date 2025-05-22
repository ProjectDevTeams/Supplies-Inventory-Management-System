<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
require_once '../db.php';

try {
    $stmt = $conn->prepare("
        SELECT
            i.id,
            u.full_name                         AS created_by,
            i.stock_type,
            c.name                              AS company_name,
            i.project_name,
            i.tax_invoice_number,
            i.purchase_order_number,
            DATE(i.created_at)                  AS created_at,
            i.total_price,
            i.approval_status                   AS status
        FROM receive_materials i
        LEFT JOIN users     u ON i.created_by   = u.id
        LEFT JOIN companies c ON i.company_id   = c.id
    ");
    $stmt->execute();
    $receive_materials = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        "status" => "success",
        "data"   => $receive_materials
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
