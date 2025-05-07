<?php
$host = "localhost";         // โฮสต์ของฐานข้อมูล (ใน XAMPP ใช้ localhost)
$db_name = "supplies_inventory";  // ชื่อฐานข้อมูลที่คุณสร้างไว้
$username = "root";          // ชื่อผู้ใช้ (XAMPP มักใช้ root)
$password = "";              // รหัสผ่าน (XAMPP ปกติไม่มี)

try {
    // สร้าง PDO object สำหรับติดต่อ MySQL
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    
    // ตั้งค่าให้ PDO แจ้ง error เป็น exception (ช่วยในการ debug)
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    // กรณีเชื่อมต่อไม่ได้
    echo "Connection failed: " . $e->getMessage();
    exit;
}
?>
