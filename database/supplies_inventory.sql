-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2025 at 05:22 AM
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
  `stock_type` enum('วัสดุในคลัง','วัสดุนอกคลัง') DEFAULT NULL,
  `material_id` int(11) NOT NULL,
  `adjust_quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adjustments`
--

INSERT INTO `adjustments` (`id`, `stock_type`, `material_id`, `adjust_quantity`, `created_at`) VALUES
(1, 'วัสดุในคลัง', 1, 10, '2025-01-01 02:00:00'),
(2, 'วัสดุในคลัง', 2, -5, '2025-01-02 03:00:00'),
(3, 'วัสดุนอกคลัง', 3, 8, '2025-01-03 04:00:00'),
(4, 'วัสดุในคลัง', 4, -2, '2025-01-04 06:00:00'),
(5, 'วัสดุนอกคลัง', 5, 15, '2025-01-05 08:00:00');

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
(9, 'ร้าน อุปกรณ์สำนักงานดีดี', '2025-05-14 08:01:30', NULL, NULL),
(10, 'บริษัท วัสดุก่อสร้างไทย', '2025-05-14 08:01:30', NULL, NULL),
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
(1, 'materials/picture/________________________________________20250515092800.jpg', 'เทปกาวสองหน้า', 1, 'ม้วน', 'วัสดุในคลัง', 1, 0, 0, 220.00, 1, 2, 2, 0, '2025-05-12 17:00:00'),
(2, '', 'แฟ้ม A4 สีฟ้า', 1, 'ชิ้น', 'วัสดุในคลัง', 2, 10, 2, 15.00, 4, 5, 1, 0, '2025-05-06 09:20:18'),
(3, '', 'ดินสอ 2B', 1, 'แท่ง', 'วัสดุนอกคลัง', 1, 6, 1, 5.00, 1, 3, 2, 0, '2025-05-06 09:20:18'),
(4, '', 'ปากกาเจลสีดำ', 1, 'ด้าม', 'วัสดุในคลัง', 2, 8, 2, 10.00, 4, 6, 2, 0, '2025-05-06 09:20:18'),
(5, '', 'กระดาษ A4', 1, 'รีม', 'วัสดุในคลัง', 0, 5, 2, 120.00, 1, 2, 1, 0, '2025-05-06 09:20:18'),
(6, '', 'คลิปหนีบกระดาษ', 1, 'กล่อง', 'วัสดุนอกคลัง', 1, 10, 2, 25.00, 4, 4, 0, 0, '2025-05-06 09:20:18'),
(7, '', 'แฟ้มแข็ง', 1, 'เล่ม', 'วัสดุในคลัง', 0, 4, 1, 30.00, 2, 3, 1, 0, '2025-05-06 09:20:18'),
(8, '', 'สมุดปกแข็ง', 1, 'เล่ม', 'วัสดุนอกคลัง', 1, 3, 1, 35.00, 1, 2, 1, 0, '2025-05-06 09:20:18'),
(9, '', 'กระดาษโน้ต', 1, 'ชุด', 'วัสดุในคลัง', 0, 6, 2, 12.00, 3, 5, 2, 0, '2025-05-06 09:20:18'),
(10, '', 'เทปใส', 1, 'ม้วน', 'วัสดุในคลัง', 1, 3, 1, 8.00, 0, 1, 1, 0, '2025-05-06 09:20:18'),
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
  `stock_type` enum('วัสดุในคลัง','วัสดุนอกคลัง') DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `tax_invoice_number` varchar(100) DEFAULT NULL,
  `purchase_order_number` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receive_materials`
--

INSERT INTO `receive_materials` (`id`, `stock_type`, `company_id`, `tax_invoice_number`, `purchase_order_number`, `created_at`, `total_price`) VALUES
(1, 'วัสดุในคลัง', NULL, 'TIV001', 'PO001', '2025-01-01', 12500.00),
(2, 'วัสดุในคลัง', NULL, 'TIV002', 'PO002', '2025-01-05', 8700.00),
(3, 'วัสดุนอกคลัง', NULL, 'TIV003', 'PO003', '2025-01-10', 15000.00),
(4, 'วัสดุในคลัง', NULL, 'TIV004', 'PO004', '2025-01-12', 6200.00),
(5, 'วัสดุนอกคลัง', 6, 'TIV005', 'PO005', '2025-01-15', 9200.00);

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
  `total_amount` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stuff_materials`
--

INSERT INTO `stuff_materials` (`id`, `running_code`, `created_at`, `created_by`, `reason`, `total_amount`) VALUES
(1, 'SM-68/05/001', '2025-05-16', 3, 'เบิกเพื่อใช้งานกิจกรรมบริษัท', 485.00),
(2, 'SM-68/05/002', '2025-05-16', 3, 'เบิกสำหรับจัดอบรมภายใน', 45.00),
(3, 'SM-68/05/003', '2025-05-16', 3, 'เบิกสำหรับซ่อมบำรุงทั่วไป', 220.00);

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
(1, 1, 1, 2, 440.00),
(2, 1, 2, 3, 45.00),
(3, 2, 3, 5, 25.00),
(4, 2, 4, 2, 20.00),
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
(9, 'Test00', '$2y$10$0qn.bVPRHj34TmQpGAPpg.g4b8q/xP0x32qyKMYOvlogMGujr5f3K', 'Test', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 'ผู้ใช้งาน', 'รออนุมัติ'),
(10, 'yindee', '$2y$10$1DpPL8AojeVFYYj2sNjfd.sJQrOiL7Ql4z2tiSf6ZPEh5rzZ6mYUi', 'phoorin', 'เจ้าหน้าที่', '123phoorin@gmail.com', '0961243799', 'ผู้ใช้งาน', 'อนุมัติ'),
(11, 'nick', '$2y$10$ozbXD6q.2dUNUpDp1h64OeYFNZm.w/SFqlGayORS0meuGmTFLs.Eu', 'Test', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 'ผู้ใช้งาน', 'รออนุมัติ'),
(12, 'testadmin', '$2y$10$ZuiDFq96JhTJKKWlJ6/z6eHD87QfWAOS3bRzdUgDinEnl5Dc4bi9G', 'Test', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 'แอดมิน', 'รออนุมัติ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adjustments`
--
ALTER TABLE `adjustments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `material_id` (`material_id`);

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
  ADD KEY `company_id` (`company_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- AUTO_INCREMENT for table `purchase_requests`
--
ALTER TABLE `purchase_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `receive_materials`
--
ALTER TABLE `receive_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `adjustments_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);

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
-- Constraints for table `purchase_requests`
--
ALTER TABLE `purchase_requests`
  ADD CONSTRAINT `purchase_requests_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);

--
-- Constraints for table `receive_materials`
--
ALTER TABLE `receive_materials`
  ADD CONSTRAINT `receive_materials_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL;

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
