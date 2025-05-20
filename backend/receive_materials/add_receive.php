<?php
// File: backend/receive_materials/add_receive.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . '/../db.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['status'=>'error','message'=>'Method Not Allowed']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    if (
        !isset(
            $data['created_by'],
            $data['stock_type'],
            $data['company_id'],
            $data['tax_invoice_number'],
            $data['purchase_order_number'],
            $data['created_at'],
            $data['items']
        )
        || !is_array($data['items'])
        || empty($data['items'])
    ) {
        throw new Exception('Missing or invalid parameters');
    }

    $conn->beginTransaction();

    // หา ID ใหม่
    $row       = $conn->query("SELECT COALESCE(MAX(id),0) AS maxid FROM receive_materials")
                     ->fetch(PDO::FETCH_ASSOC);
    $newBillId = $row['maxid'] + 1;

    // คำนวณยอดรวม
    $totalBill = 0;
    foreach ($data['items'] as $itm) {
        if (
            !isset(
                $itm['material_id'],
                $itm['quantity'],
                $itm['price_per_unit'],
                $itm['total_price']
            )
        ) {
            throw new Exception('Missing item fields');
        }
        $totalBill += (float)$itm['total_price'];
    }

    // INSERT header
    $stmtBill = $conn->prepare("
        INSERT INTO receive_materials
          (id, created_by, stock_type, company_id, tax_invoice_number, purchase_order_number, created_at, total_price)
        VALUES
          (:id, :created_by, :stock_type, :company_id, :tax_invoice_number, :purchase_order_number, :created_at, :total_price)
    ");
    $stmtBill->execute([
        ':id'                    => $newBillId,
        ':created_by'            => $data['created_by'],
        ':stock_type'            => $data['stock_type'],
        ':company_id'            => $data['company_id'],
        ':tax_invoice_number'    => $data['tax_invoice_number'],
        ':purchase_order_number' => $data['purchase_order_number'],
        ':created_at'            => $data['created_at'],
        ':total_price'           => $totalBill
    ]);

    // INSERT รายการย่อย (ใช้ material_id แทน material_name)
    $stmtItem = $conn->prepare("
        INSERT INTO receive_material_items
          (id, receive_material_id, material_id, quantity, price_per_unit, total_price)
        VALUES
          (:id, :bill_id, :mat_id, :quantity, :price_per_unit, :total_price)
    ");
    $row2       = $conn->query("SELECT COALESCE(MAX(id),0) AS maxid FROM receive_material_items")
                      ->fetch(PDO::FETCH_ASSOC);
    $nextItemId = $row2['maxid'] + 1;

    foreach ($data['items'] as $itm) {
        $stmtItem->execute([
            ':id'              => $nextItemId,
            ':bill_id'         => $newBillId,
            ':mat_id'          => $itm['material_id'],        // ต้องมี material_id
            ':quantity'        => $itm['quantity'],
            ':price_per_unit'  => $itm['price_per_unit'],
            ':total_price'     => $itm['total_price']
        ]);
        $nextItemId++;
    }

    $conn->commit();

    echo json_encode([
        'status'  => 'success',
        'bill_id' => $newBillId,
        'message' => 'Receive material added successfully'
    ]);
    exit;
}
catch (Exception $e) {
    if ($conn->inTransaction()) $conn->rollBack();
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
