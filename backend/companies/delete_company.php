<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Content-Type: application/json");
require_once '../db.php';

if ($_SERVER['REQUEST_METHOD']==='OPTIONS') {
    // CORS pre‑flight
    http_response_code(200);
    exit;
}

try {
    // parse JSON body
    $body = json_decode(file_get_contents('php://input'), true);
    $id = isset($body['id']) ? (int)$body['id'] : 0;
    if ($id <= 0) {
        throw new Exception("Invalid company id");
    }

    // perform delete
    $stmt = $conn->prepare("DELETE FROM companies WHERE id = :id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        throw new Exception("No company found with id $id");
    }

    echo json_encode([
      'status'  => 'success',
      'message' => "Company #{$id} deleted"
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
      'status'  => 'error',
      'message' => $e->getMessage()
    ]);
}
