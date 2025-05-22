-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2025 at 06:31 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supplies_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `adjustments`
--

CREATE TABLE `adjustments` (
  `id` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` date DEFAULT curdate() COMMENT 'วันที่สร้าง',
  `updated_date` date DEFAULT curdate() COMMENT 'วันที่แก้ไข',
  `status` enum('รออนุมัติ','อนุมัติ','ไม่อนุมัติ') DEFAULT 'รออนุมัติ' COMMENT 'สถานะการอนุมัติ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adjustments`
--

INSERT INTO `adjustments` (`id`, `created_by`, `created_date`, `updated_date`, `status`) VALUES
(6, 3, '2025-05-16', '2025-05-16', 'อนุมัติ'),
(7, 3, '2025-05-16', '2025-05-16', 'อนุมัติ'),
(8, 3, '2025-05-16', '2025-05-16', 'อนุมัติ'),
(12, 1, '2025-05-21', '2025-05-21', 'อนุมัติ'),
(13, 1, '2025-05-21', '2025-05-21', 'อนุมัติ');

--
-- Triggers `adjustments`
--
DELIMITER $$
CREATE TRIGGER `trg_adjustments_set_quantity` AFTER UPDATE ON `adjustments` FOR EACH ROW BEGIN
  IF NEW.status = 'อนุมัติ' AND OLD.status <> 'อนุมัติ' THEN
    -- ตั้งค่า remaining_quantity ให้ตรงกับ quantity ใน adjustment_items
    UPDATE materials m
    JOIN adjustment_items ai ON ai.material_id = m.id
    SET m.remaining_quantity = ai.quantity
    WHERE ai.adjustment_id = NEW.id;
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_adjustments_update_date` BEFORE UPDATE ON `adjustments` FOR EACH ROW BEGIN
  SET NEW.updated_date = CURRENT_DATE;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `adjustment_items`
--

CREATE TABLE `adjustment_items` (
  `id` int(11) NOT NULL,
  `adjustment_id` int(11) NOT NULL,
  `stock_type` enum('วัสดุในคลัง','วัสดุนอกคลัง') DEFAULT NULL,
  `material_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 0 COMMENT 'จำนวนที่ปรับ',
  `old_quantity` int(11) DEFAULT 0 COMMENT 'จำนวนก่อนการปรับ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adjustment_items`
--

INSERT INTO `adjustment_items` (`id`, `adjustment_id`, `stock_type`, `material_id`, `quantity`, `old_quantity`) VALUES
(1, 6, 'วัสดุในคลัง', 1, 5, 0),
(2, 6, 'วัสดุในคลัง', 2, 10, 0),
(3, 7, 'วัสดุนอกคลัง', 3, 8, 0),
(4, 7, 'วัสดุในคลัง', 4, 6, 0),
(5, 8, 'วัสดุในคลัง', 5, 3, 0),
(6, 8, 'วัสดุนอกคลัง', 6, 12, 0),
(12, 12, 'วัสดุนอกคลัง', 1, 10, 2),
(13, 13, 'วัสดุในคลัง', 1, 50, 10);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `created_at`, `created_by`, `updated_at`) VALUES
(6, 'บริษัท เอเทค คอร์ปอเรชั่น', '2025-05-14 08:01:30', NULL, NULL),
(7, 'ห้างหุ้นส่วน ซีเอ็น เทรดดิ้ง', '2025-05-14 08:01:30', NULL, NULL),
(8, 'บริษัท โกลบอล ซัพพลาย', '2025-05-14 08:01:30', NULL, NULL),
(9, 'อัพเดต1', '2025-05-14 08:01:30', 2, '2025-05-21 08:12:53'),
(10, 'อัพเดต2', '2025-05-14 08:01:30', 2, '2025-05-21 08:12:08'),
(11, 'test', '2025-05-14 08:53:46', NULL, NULL),
(12, 'tes123', '2025-05-14 08:54:07', NULL, '2025-05-14 08:54:30');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `stock_type` enum('วัสดุในคลัง','วัสดุนอกคลัง') DEFAULT 'วัสดุในคลัง',
  `carry_over_quantity` int(11) DEFAULT 0,
  `max_quantity` int(11) DEFAULT 0,
  `min_quantity` int(11) DEFAULT 0,
  `price` decimal(10,2) DEFAULT 0.00,
  `remaining_quantity` int(11) DEFAULT 0,
  `received_quantity` int(11) DEFAULT 0,
  `issued_quantity` int(11) DEFAULT 0,
  `adjusted_quantity` int(11) DEFAULT 0,
  `status` varchar(100) GENERATED ALWAYS AS (case when `remaining_quantity` <= `min_quantity` then 'วัสดุใกล้หมดสต็อก' else 'เบิกได้' end) STORED,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `image`, `name`, `category_id`, `unit`, `stock_type`, `carry_over_quantity`, `max_quantity`, `min_quantity`, `price`, `remaining_quantity`, `received_quantity`, `issued_quantity`, `adjusted_quantity`, `created_at`) VALUES
(1, 'materials/picture/________________________________________20250515092800.jpg', 'เทปกาวสองหน้า', 1, 'ม้วน', 'วัสดุในคลัง', 1, 0, 0, 220.00, 51, 2, 2, 0, '2025-05-12 17:00:00'),
(2, '', 'เทปกาวสองหน้า', 1, 'ชิ้น', 'วัสดุนอกคลัง', 2, 10, 2, 15.00, 10, 5, 1, 0, '2025-05-05 17:00:00'),
(3, '', 'ดินสอ 2B', 1, 'แท่ง', 'วัสดุนอกคลัง', 1, 6, 1, 5.00, 3, 3, 2, 0, '2025-05-06 09:20:18'),
(4, '', 'ปากกาเจลสีดำ', 1, 'ด้าม', 'วัสดุในคลัง', 2, 8, 2, 10.00, 10, 6, 2, 0, '2025-05-06 09:20:18'),
(5, '', 'กระดาษ A4', 1, 'รีม', 'วัสดุในคลัง', 0, 5, 2, 120.00, 3, 2, 1, 0, '2025-05-06 09:20:18'),
(6, '', 'คลิปหนีบกระดาษ', 1, 'กล่อง', 'วัสดุนอกคลัง', 1, 10, 2, 25.00, 12, 4, 0, 0, '2025-05-06 09:20:18'),
(7, '', 'แฟ้มแข็ง', 1, 'เล่ม', 'วัสดุในคลัง', 0, 4, 1, 30.00, 2, 3, 1, 0, '2025-05-06 09:20:18'),
(8, '', 'สมุดปกแข็ง', 1, 'เล่ม', 'วัสดุนอกคลัง', 1, 3, 1, 35.00, 1, 2, 1, 0, '2025-05-06 09:20:18'),
(9, '', 'กระดาษโน้ต', 1, 'ชุด', 'วัสดุในคลัง', 0, 6, 2, 12.00, 10, 5, 2, 0, '2025-05-06 09:20:18'),
(10, '', 'เทปใส', 1, 'ม้วน', 'วัสดุในคลัง', 1, 3, 1, 8.00, 2, 1, 1, 0, '2025-05-06 09:20:18'),
(11, '', 'สติ๊กเกอร์ A4', 1, 'แผ่น', 'วัสดุนอกคลัง', 2, 5, 2, 5.00, 3, 3, 0, 0, '2025-05-06 09:20:18'),
(12, '', 'แฟ้มซองพลาสติก', 1, 'ซอง', 'วัสดุในคลัง', 1, 6, 2, 7.00, 3, 4, 1, 0, '2025-05-06 09:20:18'),
(13, '', 'ลวดเย็บกระดาษ', 1, 'กล่อง', 'วัสดุนอกคลัง', 0, 3, 1, 18.00, 0, 2, 2, 0, '2025-05-06 09:20:18'),
(14, '', 'ปากกาลูกลื่น', 1, 'ด้าม', 'วัสดุในคลัง', 2, 6, 2, 12.00, 4, 5, 1, 0, '2025-05-06 09:20:18'),
(15, '', 'แฟ้มห่วง', 1, 'เล่ม', 'วัสดุในคลัง', 1, 5, 2, 40.00, 2, 3, 1, 0, '2025-05-06 09:20:18'),
(16, '', 'เครื่องเย็บกระดาษ', 1, 'เครื่อง', 'วัสดุนอกคลัง', 0, 3, 1, 85.00, 2, 2, 0, 0, '2025-05-06 09:20:18'),
(17, '', 'น้ำยาล้างบอร์ด', 1, 'ขวด', 'วัสดุในคลัง', 1, 2, 1, 30.00, 0, 1, 1, 0, '2025-05-06 09:20:18'),
(18, '', 'สก็อตเทป', 1, 'ม้วน', 'วัสดุในคลัง', 0, 4, 1, 6.00, 2, 3, 1, 0, '2025-05-06 09:20:18'),
(19, '', 'กล่องเอกสาร', 1, 'กล่อง', 'วัสดุในคลัง', 2, 6, 2, 55.00, 4, 4, 0, 0, '2025-05-06 09:20:18'),
(20, '', 'แผ่นพลาสติกใส', 1, 'แผ่น', 'วัสดุนอกคลัง', 1, 4, 1, 3.00, 1, 2, 1, 0, '2025-05-06 09:20:18');

-- --------------------------------------------------------

--
-- Table structure for table `material_categories`
--

CREATE TABLE `material_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_categories`
--

INSERT INTO `material_categories` (`id`, `name`) VALUES
(1, 'เครื่องเขียน'),
(2, 'อุปกรณ์สำนักงาน'),
(3, 'อุปกรณ์ไฟฟ้า');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_extras`
--

CREATE TABLE `purchase_extras` (
  `id` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` date DEFAULT curdate(),
  `reason` text DEFAULT NULL,
  `approval_status` enum('รออนุมัติ','อนุมัติ','ไม่อนุมัติ') DEFAULT 'รออนุมัติ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_extras`
--

INSERT INTO `purchase_extras` (`id`, `created_by`, `created_date`, `reason`, `approval_status`) VALUES
(1, 3, '2025-05-19', 'ขอซื้อวัสดุเพิ่มเติมสำหรับโปรเจกต์ A', 'อนุมัติ'),
(2, 3, '2025-05-19', 'จัดซื้อด่วนเพื่อซ่อมแซมอุปกรณ์', 'อนุมัติ'),
(3, 3, '2025-05-19', 'ขอเบิกแฟ้มเพิ่มสำหรับฝ่ายบัญชี', 'อนุมัติ');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_extra_items`
--

CREATE TABLE `purchase_extra_items` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `purchase_extra_id` int(11) NOT NULL,
  `material_id` int(11) DEFAULT NULL,
  `new_material_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_extra_items`
--

INSERT INTO `purchase_extra_items` (`id`, `image`, `purchase_extra_id`, `material_id`, `new_material_name`, `quantity`) VALUES
(1, 'materials/picture/tape.jpg', 1, 1, NULL, 5),
(2, NULL, 2, NULL, 'พัดลมตั้งโต๊ะ 16 นิ้ว', 2),
(3, NULL, 3, 2, NULL, 10);

-- --------------------------------------------------------

--
-- Table structure for table `purchase_requests`
--

CREATE TABLE `purchase_requests` (
  `id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `requested_quantity` int(11) NOT NULL,
  `reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_requests`
--

INSERT INTO `purchase_requests` (`id`, `material_id`, `requested_quantity`, `reason`, `created_at`) VALUES
(1, 1, 50, 'จัดซื้อเพื่อเติมสต็อกประจำไตรมาส', '2025-05-14 08:08:54'),
(2, 2, 20, 'เตรียมใช้ในงานซ่อมแซมระบบ', '2025-05-14 08:08:54'),
(3, 3, 15, 'วัสดุหมด ต้องจัดซื้อเพิ่ม', '2025-05-14 08:08:54'),
(4, 4, 30, 'คำขอจากฝ่ายผลิต', '2025-05-14 08:08:54'),
(5, 5, 100, 'สำรองเพื่อรองรับโครงการใหม่', '2025-05-14 08:08:54');

-- --------------------------------------------------------

--
-- Table structure for table `receive_materials`
--

CREATE TABLE `receive_materials` (
  `id` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `stock_type` enum('วัสดุในคลัง','วัสดุนอกคลัง') DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `tax_invoice_number` varchar(100) DEFAULT NULL,
  `purchase_order_number` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT 0.00,
  `approval_status` enum('รออนุมัติ','อนุมัติ','ไม่อนุมัติ') DEFAULT 'รออนุมัติ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receive_materials`
--

INSERT INTO `receive_materials` (`id`, `created_by`, `stock_type`, `company_id`, `project_name`, `tax_invoice_number`, `purchase_order_number`, `created_at`, `total_price`, `approval_status`) VALUES
(1, 3, 'วัสดุในคลัง', 6, NULL, 'INV-001', 'PO-001', '2025-05-16', 485.00, 'อนุมัติ'),
(2, 3, 'วัสดุในคลัง', 7, NULL, 'INV-002', 'PO-002', '2025-05-16', 70.00, 'รออนุมัติ'),
(3, 3, 'วัสดุนอกคลัง', 8, NULL, 'INV-003', 'PO-003', '2025-05-16', 220.00, 'อนุมัติ'),
(4, 3, 'วัสดุในคลัง', 6, NULL, 'INV-004', 'PO-004', '2025-05-20', 1500.00, 'อนุมัติ'),
(5, 3, 'วัสดุในคลัง', 7, NULL, 'INV-005', 'PO-005', '2025-04-30', 1500.00, 'อนุมัติ'),
(6, 1, 'วัสดุนอกคลัง', 7, NULL, 'ทอลอง', 'ทดลอง', '2025-05-23', 200.00, 'อนุมัติ'),
(7, 1, 'วัสดุนอกคลัง', 6, NULL, '111111', '018', '2025-05-22', 22.00, 'อนุมัติ'),
(8, 1, 'วัสดุในคลัง', NULL, 'โครงการ ABC', 'INV-123', 'PO-456', '2025-05-22', 305.00, 'รออนุมัติ'),
(9, 1, 'วัสดุในคลัง', 6, NULL, '111', '111', '2025-05-23', 1.00, 'รออนุมัติ'),
(10, 1, 'วัสดุนอกคลัง', 6, '', 'กกก', 'กกก', '2025-05-23', 1.00, 'รออนุมัติ');

--
-- Triggers `receive_materials`
--
DELIMITER $$
CREATE TRIGGER `trg_receive_approval_add_quantity` AFTER UPDATE ON `receive_materials` FOR EACH ROW BEGIN
  -- เงื่อนไข: เมื่อสถานะเปลี่ยนเป็น 'อนุมัติ' เท่านั้น
  IF NEW.approval_status = 'อนุมัติ' AND OLD.approval_status <> 'อนุมัติ' THEN
    -- เพิ่มปริมาณวัสดุในคลังตามรายการใน receive_material_items
    UPDATE materials m
    JOIN receive_material_items rmi ON rmi.material_id = m.id
    SET m.remaining_quantity = m.remaining_quantity + rmi.quantity
    WHERE rmi.receive_material_id = NEW.id
      AND rmi.material_id IS NOT NULL;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `receive_material_items`
--

CREATE TABLE `receive_material_items` (
  `id` int(11) NOT NULL,
  `receive_material_id` int(11) NOT NULL,
  `material_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 0,
  `price_per_unit` decimal(10,2) DEFAULT 0.00,
  `total_price` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receive_material_items`
--

INSERT INTO `receive_material_items` (`id`, `receive_material_id`, `material_id`, `quantity`, `price_per_unit`, `total_price`) VALUES
(1, 1, NULL, 2, 300.00, 440.00),
(2, 1, NULL, 3, 15.00, 45.00),
(3, 2, NULL, 10, 10.00, 50.00),
(4, 2, NULL, 2, 10.00, 20.00),
(5, 3, 1, 20, 120.00, 120.00),
(6, 3, 2, 40, 25.00, 100.00),
(16, 4, 1, 20, 30.00, 600.00),
(17, 4, 4, 30, 30.00, 900.00),
(20, 5, 1, 50, 30.00, 1500.00),
(23, 6, 10, 2, 100.00, 200.00),
(25, 7, 1, 1, 22.00, 22.00),
(26, 8, 5, 10, 15.50, 155.00),
(27, 8, 7, 3, 50.00, 150.00),
(28, 9, 1, 1, 1.00, 1.00),
(34, 10, 11, 1, 1.00, 1.00);

--
-- Triggers `receive_material_items`
--
DELIMITER $$
CREATE TRIGGER `trg_after_delete_receive_item` AFTER DELETE ON `receive_material_items` FOR EACH ROW BEGIN
  UPDATE receive_materials
  SET total_price = (
    SELECT IFNULL(SUM(total_price), 0)
    FROM receive_material_items
    WHERE receive_material_id = OLD.receive_material_id
  )
  WHERE id = OLD.receive_material_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_after_insert_receive_item` AFTER INSERT ON `receive_material_items` FOR EACH ROW BEGIN
  UPDATE receive_materials
  SET total_price = (
    SELECT IFNULL(SUM(total_price), 0)
    FROM receive_material_items
    WHERE receive_material_id = NEW.receive_material_id
  )
  WHERE id = NEW.receive_material_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_after_update_receive_item` AFTER UPDATE ON `receive_material_items` FOR EACH ROW BEGIN
  UPDATE receive_materials
  SET total_price = (
    SELECT IFNULL(SUM(total_price), 0)
    FROM receive_material_items
    WHERE receive_material_id = NEW.receive_material_id
  )
  WHERE id = NEW.receive_material_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `stuff_materials`
--

CREATE TABLE `stuff_materials` (
  `id` int(11) NOT NULL,
  `running_code` varchar(20) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT 0.00,
  `Admin_status` enum('รออนุมัติ','อนุมัติ','ไม่อนุมัติ') DEFAULT 'รออนุมัติ',
  `User_status` enum('รอรับของ','รับของเรียบร้อยแล้ว') DEFAULT 'รอรับของ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stuff_materials`
--

INSERT INTO `stuff_materials` (`id`, `running_code`, `created_at`, `created_by`, `reason`, `total_amount`, `Admin_status`, `User_status`) VALUES
(1, '2568/05/001', '2025-05-16', 11, 'เบิกเพื่อใช้งานงานใหม่', 2525.00, 'อนุมัติ', 'รับของเรียบร้อยแล้ว'),
(2, 'SM-68/05/002', '2025-05-16', 1, 'เบิกสำหรับจัดอบรมภายใน', 300.00, 'อนุมัติ', 'รอรับของ'),
(3, 'SM-68/05/003', '2025-05-16', 3, 'เบิกสำหรับซ่อมบำรุงทั่วไป', 220.00, 'รออนุมัติ', 'รอรับของ');

--
-- Triggers `stuff_materials`
--
DELIMITER $$
CREATE TRIGGER `trg_stuff_user_receive` AFTER UPDATE ON `stuff_materials` FOR EACH ROW BEGIN
  -- เช็กว่า User_status เปลี่ยนเป็น "รับของเรียบร้อยแล้ว"
  IF NEW.User_status = 'รับของเรียบร้อยแล้ว' AND OLD.User_status <> 'รับของเรียบร้อยแล้ว' THEN
    -- หักวัสดุในคลังตามรายการ
    UPDATE materials m
    JOIN stuff_material_items smi ON smi.material_id = m.id
    SET m.remaining_quantity = m.remaining_quantity - smi.quantity
    WHERE smi.stuff_material_id = NEW.id;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `stuff_material_items`
--

CREATE TABLE `stuff_material_items` (
  `id` int(11) NOT NULL,
  `stuff_material_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 0,
  `total_price` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stuff_material_items`
--

INSERT INTO `stuff_material_items` (`id`, `stuff_material_id`, `material_id`, `quantity`, `total_price`) VALUES
(1, 1, 1, 10, 2200.00),
(2, 1, 2, 20, 300.00),
(3, 1, 3, 5, 25.00),
(4, 2, 2, 20, 300.00),
(5, 3, 5, 1, 120.00),
(6, 3, 6, 4, 100.00);

--
-- Triggers `stuff_material_items`
--
DELIMITER $$
CREATE TRIGGER `trg_calc_total_price` BEFORE INSERT ON `stuff_material_items` FOR EACH ROW BEGIN
  DECLARE materialPrice DECIMAL(10,2);
  SELECT price INTO materialPrice FROM materials WHERE id = NEW.material_id;
  SET NEW.total_price = materialPrice * NEW.quantity;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_update_total_amount_after_delete` AFTER DELETE ON `stuff_material_items` FOR EACH ROW BEGIN
  UPDATE stuff_materials
  SET total_amount = (
    SELECT IFNULL(SUM(total_price), 0)
    FROM stuff_material_items
    WHERE stuff_material_id = OLD.stuff_material_id
  )
  WHERE id = OLD.stuff_material_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_update_total_amount_after_insert` AFTER INSERT ON `stuff_material_items` FOR EACH ROW BEGIN
  UPDATE stuff_materials
  SET total_amount = (
    SELECT SUM(total_price)
    FROM stuff_material_items
    WHERE stuff_material_id = NEW.stuff_material_id
  )
  WHERE id = NEW.stuff_material_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_update_total_amount_after_update` AFTER UPDATE ON `stuff_material_items` FOR EACH ROW BEGIN
  UPDATE stuff_materials
  SET total_amount = (
    SELECT SUM(total_price)
    FROM stuff_material_items
    WHERE stuff_material_id = NEW.stuff_material_id
  )
  WHERE id = NEW.stuff_material_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_update_total_price` BEFORE UPDATE ON `stuff_material_items` FOR EACH ROW BEGIN
  DECLARE materialPrice DECIMAL(10,2);
  SELECT price INTO materialPrice FROM materials WHERE id = NEW.material_id;
  SET NEW.total_price = materialPrice * NEW.quantity;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `permission` enum('ผู้ใช้งาน','แอดมิน','ผู้ช่วยแอดมิน') DEFAULT 'ผู้ใช้งาน',
  `approval_status` enum('รออนุมัติ','อนุมัติ','ไม่อนุมัติ') DEFAULT 'รออนุมัติ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `position`, `email`, `phone`, `permission`, `approval_status`) VALUES
(1, 'admin1', 'admin1234', 'สมชาย แอดมิน', 'ผู้ดูแลระบบ', 'admin1@example.com', '0812345678', 'แอดมิน', 'อนุมัติ'),
(2, 'assistant1', 'assist1234', 'สายฝน ผู้ช่วย', 'ผู้ช่วยแอดมิน', 'assist1@example.com', '0823456789', 'ผู้ช่วยแอดมิน', 'อนุมัติ'),
(3, 'user1', '$2y$10$hR79d9RbIo8FlhJivkGkSOCrb3PIKJEXhfDzFFlpXYTQ1WE4YPDpq', 'วราภรณ์ ผู้ใช้', 'เจ้าหน้าที่พัสดุ', 'user1@example.com', '0834567890', 'ผู้ใช้งาน', 'อนุมัติ'),
(4, 'user2', 'user5678', 'ปิยะพงษ์ สต๊อก', 'เจ้าหน้าที่คลัง', 'user2@example.com', '0845678901', 'ผู้ใช้งาน', 'รออนุมัติ'),
(6, 'user123', '$2y$10$OtEWucdWjiBec9zRpE/54eXqvOmQ11bEOBV6ZUkIUBdbj/m4uO83q', 'สมศรี พนักงาน', 'เจ้าหน้าที่', 'user123@example.com', '0891234567', 'ผู้ใช้งาน', 'อนุมัติ'),
(8, 'user789', '$2y$10$5aren321Auyl6Ry4e8kJyuuSCoux9OjbJMYnGuv/GYU5db6Nj8HOW', 'วราภรณ์ ผู้ใช้ (แก้ไข)', 'เจ้าหน้าที่พัสดุ', 'user1_new@example.com', '0899999999', 'ผู้ใช้งาน', 'อนุมัติ'),
(9, 'Test00', '$2y$10$0qn.bVPRHj34TmQpGAPpg.g4b8q/xP0x32qyKMYOvlogMGujr5f3K', 'Test', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 'แอดมิน', 'รออนุมัติ'),
(10, 'yindee', '$2y$10$1DpPL8AojeVFYYj2sNjfd.sJQrOiL7Ql4z2tiSf6ZPEh5rzZ6mYUi', 'phoorin', 'เจ้าหน้าที่', '123phoorin@gmail.com', '0961243799', 'ผู้ใช้งาน', 'อนุมัติ'),
(11, 'nick', '$2y$10$DQRTP5QyayCcpfHjBN3TGu/dfcXxtLDt8yiUCo8i4./0/oKvQ21Gm', 'Test', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 'ผู้ใช้งาน', 'อนุมัติ'),
(12, 'testadmin', '$2y$10$ZuiDFq96JhTJKKWlJ6/z6eHD87QfWAOS3bRzdUgDinEnl5Dc4bi9G', 'Test', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 'แอดมิน', 'รออนุมัติ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adjustments`
--
ALTER TABLE `adjustments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `adjustment_items`
--
ALTER TABLE `adjustment_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adjustment_id` (`adjustment_id`),
  ADD KEY `fk_adjustment_material_id` (`material_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `unit` (`unit`);

--
-- Indexes for table `material_categories`
--
ALTER TABLE `material_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_extras`
--
ALTER TABLE `purchase_extras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_purchase_extras_created_by` (`created_by`);

--
-- Indexes for table `purchase_extra_items`
--
ALTER TABLE `purchase_extra_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_purchase_extra_material` (`material_id`);

--
-- Indexes for table `purchase_requests`
--
ALTER TABLE `purchase_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `receive_materials`
--
ALTER TABLE `receive_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_receive_materials_company` (`company_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `receive_material_items`
--
ALTER TABLE `receive_material_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receive_material_id` (`receive_material_id`),
  ADD KEY `fk_receive_material_items_material` (`material_id`);

--
-- Indexes for table `stuff_materials`
--
ALTER TABLE `stuff_materials`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `running_code` (`running_code`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `stuff_material_items`
--
ALTER TABLE `stuff_material_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_stuff_material_id` (`stuff_material_id`),
  ADD KEY `fk_material_id` (`material_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adjustments`
--
ALTER TABLE `adjustments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `adjustment_items`
--
ALTER TABLE `adjustment_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `material_categories`
--
ALTER TABLE `material_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchase_extras`
--
ALTER TABLE `purchase_extras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchase_extra_items`
--
ALTER TABLE `purchase_extra_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchase_requests`
--
ALTER TABLE `purchase_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `receive_materials`
--
ALTER TABLE `receive_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `receive_material_items`
--
ALTER TABLE `receive_material_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `stuff_materials`
--
ALTER TABLE `stuff_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stuff_material_items`
--
ALTER TABLE `stuff_material_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adjustments`
--
ALTER TABLE `adjustments`
  ADD CONSTRAINT `adjustments_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `adjustment_items`
--
ALTER TABLE `adjustment_items`
  ADD CONSTRAINT `fk_adjustment_items` FOREIGN KEY (`adjustment_id`) REFERENCES `adjustments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_adjustment_material_items` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `materials_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `material_categories` (`id`);

--
-- Constraints for table `purchase_extras`
--
ALTER TABLE `purchase_extras`
  ADD CONSTRAINT `fk_purchase_extras_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `purchase_extra_items`
--
ALTER TABLE `purchase_extra_items`
  ADD CONSTRAINT `fk_purchase_extra_material` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `purchase_requests`
--
ALTER TABLE `purchase_requests`
  ADD CONSTRAINT `purchase_requests_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);

--
-- Constraints for table `receive_materials`
--
ALTER TABLE `receive_materials`
  ADD CONSTRAINT `fk_receive_materials_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_receive_materials_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `receive_material_items`
--
ALTER TABLE `receive_material_items`
  ADD CONSTRAINT `fk_receive_material_items` FOREIGN KEY (`receive_material_id`) REFERENCES `receive_materials` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_receive_material_items_material` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `stuff_materials`
--
ALTER TABLE `stuff_materials`
  ADD CONSTRAINT `fk_stuff_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `stuff_material_items`
--
ALTER TABLE `stuff_material_items`
  ADD CONSTRAINT `fk_material_item_material` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`),
  ADD CONSTRAINT `fk_stuff_material_items` FOREIGN KEY (`stuff_material_id`) REFERENCES `stuff_materials` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
