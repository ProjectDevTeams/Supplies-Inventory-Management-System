<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

include '../db.php';

// preload materials
function getAllMaterials($conn) {
    $stmt = $conn->prepare("SELECT * FROM materials");
    $stmt->execute();
    $materials = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $map = [];
    foreach ($materials as $mat) {
        $map[$mat['id']] = $mat;
    }
    return $map;
}

$id = $_GET['id'] ?? null;
$material_id = $_GET['material_id'] ?? null;
$adjustment_id = $_GET['adjustment_id'] ?? null;

try {
    $materialsMap = getAllMaterials($conn);

    if ($material_id) {
        $stmt = $conn->prepare("
            SELECT 
                ai.*, 
                m.name AS material_name, 
                m.stock_type AS material_stock_type,
                m.remaining_quantity,
                m.unit,
                m.price
            FROM adjustment_items ai
            JOIN materials m ON ai.material_id = m.id
            WHERE ai.material_id = ?
            ORDER BY ai.id DESC
            LIMIT 1
        ");
        $stmt->execute([$material_id]);
        $item = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($item) {
            echo json_encode([
                "status" => "success",
                "data" => $item
            ]);
        } else {
            echo json_encode([
                "status" => "not_found",
                "message" => "ไม่พบรายการวัสดุนี้"
            ]);
        }

    } elseif ($id || $adjustment_id) {
        $targetId = $id ?? $adjustment_id;

        $stmt = $conn->prepare("
            SELECT a.*, u.full_name 
            FROM adjustments a 
            LEFT JOIN users u ON a.created_by = u.id 
            WHERE a.id = ?
        ");
        $stmt->execute([$targetId]);
        $adjustment = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($adjustment) {
            $stmtItems = $conn->prepare("SELECT * FROM adjustment_items WHERE adjustment_id = ?");
            $stmtItems->execute([$targetId]);
            $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

            foreach ($items as &$item) {
                $materialId = $item['material_id'];
                $item['material_name'] = $materialsMap[$materialId]['name'] ?? null;
                $item['material_stock_type'] = $materialsMap[$materialId]['stock_type'] ?? null;
                $item['remaining_quantity'] = $materialsMap[$materialId]['remaining_quantity'] ?? null;
                // old_quantity ถูกรวมอยู่แล้วในการดึงข้อมูล
            }

            echo json_encode([
                "status" => "success",
                "data" => [
                    "id" => $adjustment['id'],
                    "created_by" => $adjustment['created_by'],
                    "created_date" => $adjustment['created_date'],
                    "updated_date" => $adjustment['updated_date'],
                    "status" => $adjustment['status'],
                    "full_name" => $adjustment['full_name'],
                    "items" => $items
                ]
            ]);
        } else {
            echo json_encode([
                "status" => "not_found",
                "message" => "ไม่พบ adjustment ที่ระบุ"
            ]);
        }

    } else {
        $stmt = $conn->prepare("
            SELECT a.*, u.full_name 
            FROM adjustments a 
            LEFT JOIN users u ON a.created_by = u.id
            ORDER BY a.id DESC
        ");
        $stmt->execute();
        $adjustments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $result = [];

        foreach ($adjustments as $adj) {
            $stmtItems = $conn->prepare("SELECT * FROM adjustment_items WHERE adjustment_id = ?");
            $stmtItems->execute([$adj['id']]);
            $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

            foreach ($items as &$item) {
                $materialId = $item['material_id'];
                $item['material_name'] = $materialsMap[$materialId]['name'] ?? null;
                $item['material_stock_type'] = $materialsMap[$materialId]['stock_type'] ?? null;
                $item['remaining_quantity'] = $materialsMap[$materialId]['remaining_quantity'] ?? null;
                // old_quantity มีใน $item อยู่แล้ว
            }

            $result[] = [
                "id" => $adj['id'],
                "created_by" => $adj['created_by'],
                "created_date" => $adj['created_date'],
                "updated_date" => $adj['updated_date'],
                "status" => $adj['status'],
                "full_name" => $adj['full_name'],
                "items" => $items
            ];
        }

        echo json_encode([
            "status" => "success",
            "data" => $result
        ]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
