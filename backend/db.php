<?php
$host = "localhost";                // โฮสต์ของฐานข้อมูล
$db_name = "stiinfras_safety";      // ชื่อฐานข้อมูล
$username = "stiinfras_safety";     // ชื่อผู้ใช้
$password = "B6y229SoC8f";          // รหัสผ่าน

try {
    // สร้าง PDO object สำหรับเชื่อมต่อ MySQL
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    
    // ตั้งค่าให้ PDO แจ้ง error เป็น exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    // กรณีเชื่อมต่อไม่สำเร็จ
    echo "Connection failed: " . $e->getMessage();
    exit;
}
?>
