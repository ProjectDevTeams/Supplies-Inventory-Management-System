<?php
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

    $row       = $conn->query("SELECT COALESCE(MAX(id),0) AS maxid FROM receive_materials")
                     ->fetch(PDO::FETCH_ASSOC);
    $newBillId = $row['maxid'] + 1;

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

    $companyId = null;
    if (!empty($data['company_id']) && $data['stock_type'] === 'วัสดุในคลัง') {
        $companyId = $data['company_id'];
    }

    $stmtBill = $conn->prepare("
        INSERT INTO receive_materials
          (id, created_by, stock_type, company_id, project_name, tax_invoice_number, purchase_order_number, created_at, total_price)
        VALUES
          (:id, :created_by, :stock_type, :company_id, :project_name, :tax_invoice_number, :purchase_order_number, :created_at, :total_price)
    ");
    $stmtBill->bindValue(':id',                    $newBillId,                       PDO::PARAM_INT);
    $stmtBill->bindValue(':created_by',            $data['created_by'],             PDO::PARAM_INT);
    $stmtBill->bindValue(':stock_type',            $data['stock_type'],             PDO::PARAM_STR);
    if (is_null($companyId)) {
        $stmtBill->bindValue(':company_id', null,  PDO::PARAM_NULL);
    } else {
        $stmtBill->bindValue(':company_id', $companyId, PDO::PARAM_INT);
    }
    $stmtBill->bindValue(':project_name',          $data['project_name'] ?? null,    PDO::PARAM_STR);
    $stmtBill->bindValue(':tax_invoice_number',    $data['tax_invoice_number'],      PDO::PARAM_STR);
    $stmtBill->bindValue(':purchase_order_number', $data['purchase_order_number'],   PDO::PARAM_STR);
    $stmtBill->bindValue(':created_at',            $data['created_at'],             PDO::PARAM_STR);
    $stmtBill->bindValue(':total_price',           $totalBill,                      PDO::PARAM_STR);
    $stmtBill->execute();

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
            ':id'             => $nextItemId,
            ':bill_id'        => $newBillId,
            ':mat_id'         => $itm['material_id'],
            ':quantity'       => $itm['quantity'],
            ':price_per_unit' => $itm['price_per_unit'],
            ':total_price'    => $itm['total_price']
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
} catch (Exception $e) {
    if ($conn->inTransaction()) $conn->rollBack();
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
