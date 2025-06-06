-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2025 at 04:43 AM
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
  `old_quantity` int(11) DEFAULT 0 COMMENT 'จำนวนก่อนการปรับ',
  `difference` int(11) DEFAULT 0 COMMENT 'ส่วนต่างระหว่าง quantity กับ old_quantity'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `adjustment_items`
--
DELIMITER $$
CREATE TRIGGER `trg_ai_set_difference` BEFORE INSERT ON `adjustment_items` FOR EACH ROW BEGIN
  SET NEW.difference = ABS(NEW.old_quantity - NEW.quantity);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_ai_update_difference` BEFORE UPDATE ON `adjustment_items` FOR EACH ROW BEGIN
  SET NEW.difference = ABS(NEW.old_quantity - NEW.quantity);
END
$$
DELIMITER ;

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
  `running_code` varchar(20) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` date DEFAULT curdate(),
  `reason` text DEFAULT NULL,
  `approval_status` enum('รออนุมัติ','อนุมัติ','ไม่อนุมัติ') DEFAULT 'รออนุมัติ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_extras`
--

INSERT INTO `purchase_extras` (`id`, `running_code`, `created_by`, `created_date`, `reason`, `approval_status`) VALUES
(1, '2568/05/001', 3, '2025-05-19', 'ขอซื้อวัสดุเพิ่มเติมสำหรับโปรเจกต์ A', 'อนุมัติ'),
(2, '2568/05/002', 3, '2025-05-19', 'จัดซื้อด่วนเพื่อซ่อมแซมอุปกรณ์', 'ไม่อนุมัติ'),
(3, '2568/05/003', 3, '2025-05-19', 'ขอเบิกแฟ้มเพิ่มสำหรับฝ่ายบัญชี', 'อนุมัติ'),
(4, '2568/05/004', 3, '2025-05-27', 'ขอซื้ออุปกรณ์เพิ่มเติม', 'รออนุมัติ'),
(5, '2568/05/005', 3, '2025-05-27', 'test', 'รออนุมัติ'),
(6, '2568/05/006', 3, '2025-05-27', 'test 2', 'รออนุมัติ'),
(7, '2568/05/007', 3, '2025-05-27', 'test 3', 'รออนุมัติ'),
(8, '2568/05/008', 3, '2025-05-27', 'test33333', 'รออนุมัติ'),
(9, '2568/05/009', 3, '2025-05-27', 'test', 'รออนุมัติ'),
(10, '2568/05/010', 3, '2025-05-27', '123', 'รออนุมัติ'),
(11, '2568/05/011', 3, '2025-05-29', '555555555555555', 'รออนุมัติ'),
(12, '2568/06/001', 3, '2025-06-02', '', 'อนุมัติ');

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
(1, 3, 'วัสดุในคลัง', NULL, NULL, 'INV-001', 'PO-001', '2025-05-16', 0.00, 'ไม่อนุมัติ'),
(2, 3, 'วัสดุในคลัง', NULL, NULL, 'INV-002', 'PO-002', '2025-05-16', 0.00, 'รออนุมัติ'),
(3, 3, 'วัสดุนอกคลัง', NULL, NULL, 'INV-003', 'PO-003', '2025-05-16', 0.00, 'อนุมัติ'),
(4, 3, 'วัสดุในคลัง', NULL, NULL, 'INV-004', 'PO-004', '2025-05-20', 0.00, 'อนุมัติ'),
(5, 3, 'วัสดุในคลัง', NULL, NULL, 'INV-005', 'PO-005', '2025-04-30', 0.00, 'อนุมัติ'),
(6, 1, 'วัสดุนอกคลัง', NULL, NULL, 'ทอลอง', 'ทดลอง', '2025-05-23', 0.00, 'อนุมัติ'),
(7, 1, 'วัสดุนอกคลัง', NULL, NULL, '111111', '018', '2025-05-22', 0.00, 'อนุมัติ'),
(8, 1, 'วัสดุในคลัง', NULL, 'โครงการ ABC', 'INV-123', 'PO-456', '2025-05-22', 0.00, 'รออนุมัติ'),
(9, 1, 'วัสดุในคลัง', NULL, NULL, '111', '111', '2025-05-23', 0.00, 'รออนุมัติ'),
(10, 1, 'วัสดุนอกคลัง', NULL, '', 'กกก', 'กกก', '2025-05-23', 0.00, 'รออนุมัติ'),
(11, 3, 'วัสดุในคลัง', NULL, NULL, '888888888888', '88888888888888', '2025-05-23', 0.00, 'อนุมัติ');

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
DELIMITER $$
CREATE TRIGGER `trg_set_received_quantity_after_approval` AFTER UPDATE ON `receive_materials` FOR EACH ROW BEGIN
  -- ตรวจสอบว่ามีการเปลี่ยนสถานะเป็น 'อนุมัติ'
  IF NEW.approval_status = 'อนุมัติ' AND OLD.approval_status <> 'อนุมัติ' THEN

    -- ตั้งค่า received_quantity ให้เท่ากับ quantity ของรายการรับวัสดุ
    UPDATE materials m
    JOIN receive_material_items rmi ON rmi.material_id = m.id
    SET m.received_quantity = rmi.quantity
    WHERE rmi.receive_material_id = NEW.id;

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
  `supervisor_name` varchar(100) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT 0.00,
  `Admin_status` enum('รออนุมัติ','อนุมัติ','ไม่อนุมัติ') DEFAULT 'รออนุมัติ',
  `User_status` enum('รอรับของ','รับของเรียบร้อยแล้ว') DEFAULT 'รอรับของ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stuff_materials`
--

INSERT INTO `stuff_materials` (`id`, `running_code`, `created_at`, `created_by`, `supervisor_name`, `reason`, `total_amount`, `Admin_status`, `User_status`) VALUES
(1, '2568/05/001', '2025-05-26', 3, '', '', 0.00, 'รออนุมัติ', 'รอรับของ'),
(2, '2568/05/002', '2025-05-26', 3, '', '', 0.00, 'รออนุมัติ', 'รอรับของ'),
(3, '2568/05/003', '2025-05-26', 4, '', '', 0.00, 'รออนุมัติ', 'รอรับของ'),
(4, '2568/05/004', '2025-05-26', 1, '', '', 0.00, 'รออนุมัติ', 'รอรับของ'),
(5, '2568/06/001', '2025-06-02', 3, 'user1', 'user1', 0.00, 'อนุมัติ', 'รับของเรียบร้อยแล้ว'),
(6, '2568/06/002', '2025-06-05', 3, 'อาคม ยินดี', 'test', 0.00, 'รออนุมัติ', 'รอรับของ'),
(7, '2568/06/003', '2025-06-05', 3, '123', '1223', 0.00, 'รออนุมัติ', 'รอรับของ');

--
-- Triggers `stuff_materials`
--
DELIMITER $$
CREATE TRIGGER `trg_set_issued_quantity_after_receive` AFTER UPDATE ON `stuff_materials` FOR EACH ROW BEGIN
  -- เงื่อนไข: เมื่อ User_status เปลี่ยนเป็น "รับของเรียบร้อยแล้ว"
  IF NEW.User_status = 'รับของเรียบร้อยแล้ว' AND OLD.User_status <> 'รับของเรียบร้อยแล้ว' THEN

    -- ตั้งค่า issued_quantity ให้เท่ากับ quantity ในใบเบิกนั้น ๆ
    UPDATE materials m
    JOIN stuff_material_items smi ON smi.material_id = m.id
    SET m.issued_quantity = smi.quantity
    WHERE smi.stuff_material_id = NEW.id;

  END IF;
END
$$
DELIMITER ;
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
(1, 'admin1', '1234', 'สมชาย แอดมิน', 'ผู้ดูแลระบบ', 'admin1@example.com', '0812345678', 'แอดมิน', 'อนุมัติ'),
(2, 'assistant1', 'assist1234', 'สายฝน ผู้ช่วย', 'ผู้ช่วยแอดมิน', 'assist1@example.com', '0823456789', 'ผู้ช่วยแอดมิน', 'อนุมัติ'),
(3, 'user1', '123', 'วราภรณ์ ผู้ใช้', 'เจ้าหน้าที่พัสดุ', 'user1@example.com', '0834567890', 'ผู้ใช้งาน', 'อนุมัติ'),
(4, 'user2', '123', 'ปิยะพงษ์ สต๊อก', 'เจ้าหน้าที่คลัง', 'user2@example.com', '0845678901', 'ผู้ใช้งาน', 'อนุมัติ'),
(6, 'user123', '$2y$10$OtEWucdWjiBec9zRpE/54eXqvOmQ11bEOBV6ZUkIUBdbj/m4uO83q', 'สมศรี พนักงาน', 'เจ้าหน้าที่', 'user123@example.com', '0891234567', 'ผู้ใช้งาน', 'อนุมัติ'),
(8, 'user789', '$2y$10$5aren321Auyl6Ry4e8kJyuuSCoux9OjbJMYnGuv/GYU5db6Nj8HOW', 'วราภรณ์ ผู้ใช้ (แก้ไข)', 'เจ้าหน้าที่พัสดุ', 'user1_new@example.com', '0899999999', 'ผู้ใช้งาน', 'อนุมัติ'),
(9, 'Test00', '$2y$10$0qn.bVPRHj34TmQpGAPpg.g4b8q/xP0x32qyKMYOvlogMGujr5f3K', 'Test', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 'แอดมิน', 'รออนุมัติ'),
(10, 'yindee', '$2y$10$1DpPL8AojeVFYYj2sNjfd.sJQrOiL7Ql4z2tiSf6ZPEh5rzZ6mYUi', 'phoorin', 'เจ้าหน้าที่', '123phoorin@gmail.com', '0961243799', 'ผู้ใช้งาน', 'อนุมัติ'),
(11, 'nick', '$2y$10$DQRTP5QyayCcpfHjBN3TGu/dfcXxtLDt8yiUCo8i4./0/oKvQ21Gm', 'Test', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 'ผู้ใช้งาน', 'อนุมัติ'),
(12, 'testadmin', '$2y$10$ZuiDFq96JhTJKKWlJ6/z6eHD87QfWAOS3bRzdUgDinEnl5Dc4bi9G', 'Test', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 'แอดมิน', 'อนุมัติ');

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
  ADD UNIQUE KEY `running_code` (`running_code`),
  ADD KEY `fk_purchase_extras_created_by` (`created_by`);

--
-- Indexes for table `purchase_extra_items`
--
ALTER TABLE `purchase_extra_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_purchase_extra_material` (`material_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `adjustment_items`
--
ALTER TABLE `adjustment_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `material_categories`
--
ALTER TABLE `material_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchase_extras`
--
ALTER TABLE `purchase_extras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `purchase_extra_items`
--
ALTER TABLE `purchase_extra_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `receive_materials`
--
ALTER TABLE `receive_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `receive_material_items`
--
ALTER TABLE `receive_material_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stuff_materials`
--
ALTER TABLE `stuff_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stuff_material_items`
--
ALTER TABLE `stuff_material_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
