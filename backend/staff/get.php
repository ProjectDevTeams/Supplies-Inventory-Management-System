<?php
include '../db.php';

$sql = "SELECT u.id, u.username, u.fullname, u.email, u.permission, d.name as department
        FROM users u
        LEFT JOIN departments d ON u.department_id = d.id
        ORDER BY u.id DESC";

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
