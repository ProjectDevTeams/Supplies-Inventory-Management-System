<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST' || $method === 'PUT') {
    $raw  = file_get_contents('php://input');
    $data = json_decode($raw, true);
}

if ($method === 'GET') {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>'Missing id']);
        exit;
    }
    $billId = (int)$_GET['id'];

    $stmt = $conn->prepare("
        SELECT 
          i.id,
          i.created_by,
          i.stock_type,
          i.company_id,
          c.name                 AS company_name,
          i.project_name,
          i.tax_invoice_number,
          i.purchase_order_number,
          i.created_at,
          i.total_price,
          i.approval_status
        FROM receive_materials i
        LEFT JOIN companies c ON i.company_id = c.id
        WHERE i.id = :id
    ");
    $stmt->execute([':id' => $billId]);
    $bill = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$bill) {
        http_response_code(404);
        echo json_encode(['status'=>'error','message'=>'Bill not found']);
        exit;
    }

    $stmt2 = $conn->prepare("
        SELECT
          rmi.material_id,
          m.name               AS material_name,
          rmi.quantity,
          rmi.price_per_unit,
          rmi.total_price
        FROM receive_material_items rmi
        LEFT JOIN materials m ON rmi.material_id = m.id
        WHERE rmi.receive_material_id = :id
    ");
    $stmt2->execute([':id' => $billId]);
    $items = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'data'   => [
            'bill'  => $bill,
            'items' => $items
        ]
    ]);
    exit;
}

if ($method === 'POST') {
    if (
        !isset(
            $data['created_by'],
            $data['stock_type'],
            $data['tax_invoice_number'],
            $data['purchase_order_number'],
            $data['created_at'],
            $data['items']
        ) ||
        !is_array($data['items']) ||
        empty($data['items'])
    ) {
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>'Missing or invalid parameters']);
        exit;
    }

    try {
        $conn->beginTransaction();

        $row   = $conn->query("SELECT COALESCE(MAX(id),0) AS maxid FROM receive_materials")
                      ->fetch(PDO::FETCH_ASSOC);
        $newId = $row['maxid'] + 1;

        $total = 0;
        foreach ($data['items'] as $it) {
            if (
                !isset(
                    $it['material_id'],
                    $it['quantity'],
                    $it['price_per_unit'],
                    $it['total_price']
                )
            ) {
                throw new Exception("Missing item fields");
            }
            $total += floatval($it['total_price']);
        }

        $stmtIns = $conn->prepare("
            INSERT INTO receive_materials
              (id, created_by, stock_type, company_id, project_name,
               tax_invoice_number, purchase_order_number,
               created_at, total_price, approval_status)
            VALUES
              (:id, :created_by, :stock_type, :company_id, :project_name,
               :tax_invoice_number, :purchase_order_number,
               :created_at, :total_price, 'รออนุมัติ')
        ");
        $stmtIns->execute([
            ':id'                    => $newId,
            ':created_by'            => $data['created_by'],
            ':stock_type'            => $data['stock_type'],
            ':company_id'            => $data['company_id'] ?? null,
            ':project_name'          => $data['project_name'] ?? null,
            ':tax_invoice_number'    => $data['tax_invoice_number'],
            ':purchase_order_number' => $data['purchase_order_number'],
            ':created_at'            => $data['created_at'],
            ':total_price'           => $total
        ]);

        $stmtItem = $conn->prepare("
            INSERT INTO receive_material_items
              (receive_material_id, material_id, quantity, price_per_unit, total_price)
            VALUES
              (:bill, :mat_id, :qty, :ppu, :tp)
        ");
        foreach ($data['items'] as $it) {
            $stmtItem->execute([
                ':bill'   => $newId,
                ':mat_id' => $it['material_id'],
                ':qty'    => $it['quantity'],
                ':ppu'    => $it['price_per_unit'],
                ':tp'     => $it['total_price']
            ]);
        }

        $conn->commit();
        echo json_encode(['status'=>'success','bill_id'=>$newId,'message'=>'Bill created']);
    } catch (Exception $e) {
        if ($conn->inTransaction()) $conn->rollBack();
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
    }
    exit;
}

if ($method === 'PUT') {
    if (
        !isset(
            $data['id'],
            $data['created_by'],
            $data['stock_type'],
            $data['tax_invoice_number'],
            $data['purchase_order_number'],
            $data['created_at'],
            $data['approval_status'],
            $data['items']
        ) ||
        !is_array($data['items'])
    ) {
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>'Missing or invalid parameters']);
        exit;
    }

    try {
        $billId = (int)$data['id'];
        $conn->beginTransaction();

        $total = 0;
        foreach ($data['items'] as $it) {
            if (
                !isset(
                    $it['quantity'],
                    $it['price_per_unit'],
                    $it['total_price']
                )
            ) {
                throw new Exception("Missing item fields");
            }
            $total += floatval($it['total_price']);
        }

        $stmtUpd = $conn->prepare("
            UPDATE receive_materials
            SET
              created_by            = :created_by,
              stock_type            = :stock_type,
              company_id            = :company_id,
              project_name          = :project_name,
              tax_invoice_number    = :tax_invoice_number,
              purchase_order_number = :purchase_order_number,
              created_at            = :created_at,
              total_price           = :total_price,
              approval_status       = :approval_status
            WHERE id = :id
        ");
        $stmtUpd->execute([
            ':id'                    => $billId,
            ':created_by'            => $data['created_by'],
            ':stock_type'            => $data['stock_type'],
            ':company_id'            => $data['company_id'] ?? null,
            ':project_name'          => $data['project_name'] ?? null,
            ':tax_invoice_number'    => $data['tax_invoice_number'],
            ':purchase_order_number' => $data['purchase_order_number'],
            ':created_at'            => $data['created_at'],
            ':total_price'           => $total,
            ':approval_status'       => $data['approval_status']
        ]);

        $conn->prepare("
            DELETE FROM receive_material_items
            WHERE receive_material_id = :id
        ")->execute([':id' => $billId]);

        $stmtFindMat = $conn->prepare("SELECT id FROM materials WHERE name = :name LIMIT 1");
        $stmtItem    = $conn->prepare("
            INSERT INTO receive_material_items
              (receive_material_id, material_id, quantity, price_per_unit, total_price)
            VALUES
              (:bill, :mat_id, :qty, :ppu, :tp)
        ");
        foreach ($data['items'] as $it) {
            if (!empty($it['material_id'])) {
                $mid = $it['material_id'];
            } else {
                $stmtFindMat->execute([':name' => $it['material_name']]);
                $mid = $stmtFindMat->fetchColumn() ?: null;
            }

            $stmtItem->execute([
                ':bill'   => $billId,
                ':mat_id' => $mid,
                ':qty'    => $it['quantity'],
                ':ppu'    => $it['price_per_unit'],
                ':tp'     => $it['total_price']
            ]);
        }

        $conn->commit();
        echo json_encode(['status'=>'success','message'=>'Bill updated']);
    } catch (Exception $e) {
        if ($conn->inTransaction()) $conn->rollBack();
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['status'=>'error','message'=>'Method Not Allowed']);
