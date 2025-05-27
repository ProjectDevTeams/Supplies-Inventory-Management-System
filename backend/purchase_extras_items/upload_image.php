<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");


$upload_dir = __DIR__ . "/picture/";
$response = [];


if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

foreach ($_FILES as $key => $file) {
    $tmp = $file['tmp_name'];
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $time = date("YmdHis");
    $filename = "material_purchase_{$time}_{$key}." . $ext;
    $target = $upload_dir . $filename;


    $relative_path = "purchase_extras_items/picture/" . $filename;

    if (move_uploaded_file($tmp, $target)) {
        $response[$key] = $relative_path;
    } else {
        $response[$key] = null;
    }
}

echo json_encode([
  "status" => "success",
  "uploaded" => $response
]);
