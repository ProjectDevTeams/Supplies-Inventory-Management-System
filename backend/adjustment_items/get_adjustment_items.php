<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");
include '../db.php';

$id = $_GET['id'] ?? null;

try {
    if ($id) {
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
            $adjustment["items"] = $stmtItems->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($adjustment);
        } else {
            echo json_encode(["error" => "ไม่พบรายการที่ระบุ"]);
        }
    } else {
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
            $adj['items'] = $stmtItems->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode([
            "status" => "success",
            "data" => $adjustments
        ]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
