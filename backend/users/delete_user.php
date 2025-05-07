<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
require_once '../db.php';

// รับค่า id จาก POST (แนะนำให้ใช้ POST ไม่ใช่ GET สำหรับการลบ)
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing user ID"
    ]);
    exit;
}

$user_id = $data['id'];

try {
    // ตรวจสอบก่อนว่ามี user นี้อยู่จริงหรือไม่
    $check = $conn->prepare("SELECT id FROM users WHERE id = :id");
    $check->bindParam(':id', $user_id, PDO::PARAM_INT);
    $check->execute();

    if ($check->rowCount() === 0) {
        echo json_encode([
            "status" => "error",
            "message" => "User not found"
        ]);
        exit;
    }

    // ลบผู้ใช้
    $stmt = $conn->prepare("DELETE FROM users WHERE id = :id");
    $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "User deleted successfully"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
