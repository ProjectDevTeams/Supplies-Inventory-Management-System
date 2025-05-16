<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once '../db.php';

try {
  $stmt = $conn->prepare("SELECT id, name FROM material_categories ORDER BY id ASC");
  $stmt->execute();
  $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode([
    "status" => "success",
    "data" => $categories
  ]);
} catch (PDOException $e) {
  echo json_encode([
    "status" => "error",
    "message" => $e->getMessage()
  ]);
}
?>
