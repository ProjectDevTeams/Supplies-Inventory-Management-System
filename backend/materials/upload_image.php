<?php
// upload_image.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Method not allowed, use POST']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'No valid image uploaded']);
    exit;
}

$uploadDir = __DIR__ . '/picture/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$tmp  = $_FILES['image']['tmp_name'];
$ext  = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
$filename = 'material_' . time() . '.' . $ext;
$path = 'materials/picture/' . $filename;
$full = $uploadDir . $filename;

if (!move_uploaded_file($tmp, $full)) {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Failed to move uploaded file']);
    exit;
}

echo json_encode(['status'=>'success','path'=>$path]);
