<?php
include '../db.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

try {
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute([':username' => $data->username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data->password, $user['password'])) {
        unset($user['password']);
        echo json_encode($user);
    } else {
        echo json_encode(["message" => "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"]);
    }
} catch (PDOException $e) {
    echo json_encode(["message" => $e->getMessage()]);
}
?>
