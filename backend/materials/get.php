<?php
include '../db.php';

$result = $conn->query("SELECT * FROM materials ORDER BY id ASC");
$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
