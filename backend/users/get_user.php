<?php
header("Content-Type: application/json");
include '../db.php';

$id = $_GET['id'] ?? null;
if (!$id) {
    echo json_encode(["error" => "Missing user ID"]);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($user);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
