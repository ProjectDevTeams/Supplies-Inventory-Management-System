<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");


header("Content-Type: application/json");
include '../db.php';

$id = $_GET['id'] ?? null;

try {
    if ($id) {
        // ถ้ามีการส่ง id → ดึงรายการเดียว
        $stmt = $conn->prepare("SELECT * FROM adjustments WHERE id = ?");
        $stmt->execute([$id]);
        $adjustment = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($adjustment) {
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
