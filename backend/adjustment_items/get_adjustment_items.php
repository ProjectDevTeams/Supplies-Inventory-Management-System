<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

include '../db.php';

// ✅ preload materials สำหรับกรณี loop หลาย adjustment
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

try {
    // ✅ กรณี: ดึงข้อมูลโดย material_id โดยตรง → JOIN materials ทันที
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

    // ✅ กรณี: ดึง adjustment เดียว (เดิม)
    } elseif ($id) {
        $materialsMap = getAllMaterials($conn);

        $stmt = $conn->prepare("
            SELECT a.*, u.full_name 
            FROM adjustments a 
            LEFT JOIN users u ON a.created_by = u.id 
            WHERE a.id = ?
        ");
        $stmt->execute([$id]);
        $adjustment = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($adjustment) {
            $stmtItems = $conn->prepare("SELECT * FROM adjustment_items WHERE adjustment_id = ?");
            $stmtItems->execute([$id]);
            $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

            foreach ($items as &$item) {
                $materialId = $item['material_id'];
                $item['material'] = $materialsMap[$materialId] ?? null;
            }

            $adjustment["items"] = $items;
            echo json_encode($adjustment);
        } else {
            echo json_encode(["error" => "ไม่พบรายการที่ระบุ"]);
        }

    // ✅ กรณี: ดึงทั้งหมด (เดิม)
    } else {
        $materialsMap = getAllMaterials($conn);

        $stmt = $conn->prepare("
            SELECT a.*, u.full_name 
            FROM adjustments a 
            LEFT JOIN users u ON a.created_by = u.id
        ");
        $stmt->execute();
        $adjustments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($adjustments as &$adj) {
            $stmtItems = $conn->prepare("SELECT * FROM adjustment_items WHERE adjustment_id = ?");
            $stmtItems->execute([$adj['id']]);
            $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

            foreach ($items as &$item) {
                $materialId = $item['material_id'];
                $item['material'] = $materialsMap[$materialId] ?? null;
            }

            $adj['items'] = $items;
        }

        echo json_encode([
            "status" => "success",
            "data" => $adjustments
        ]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
