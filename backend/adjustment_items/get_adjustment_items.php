<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");

header("Content-Type: application/json");
include '../db.php';

$id = $_GET['id'] ?? null;

try {
    if ($id) {
        // ดึงรายการ adjustments
        $stmt = $conn->prepare("SELECT * FROM adjustments WHERE id = ?");
        $stmt->execute([$id]);
        $adjustment = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($adjustment) {
            // ดึงรายการ items ที่เกี่ยวข้อง
            $stmtItems = $conn->prepare("SELECT * FROM adjustment_items WHERE adjustment_id = ?");
            $stmtItems->execute([$id]);
            $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

            // รวมข้อมูลทั้ง adjustment และรายการ items
            $adjustment["items"] = $items;

            echo json_encode($adjustment);
        } else {
            echo json_encode(["error" => "ไม่พบรายการที่ระบุ"]);
        }
    } else {
        // ถ้าไม่มี id → ดึงทั้งหมด
        $stmt = $conn->prepare("SELECT * FROM adjustments");
        $stmt->execute();
        $adjustments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($adjustments);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
