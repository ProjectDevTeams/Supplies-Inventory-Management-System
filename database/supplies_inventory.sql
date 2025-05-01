-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2025 at 10:10 AM
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
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `description`) VALUES
(1, 'ฝ่ายซ่อมบำรุง', 'ดูแลเรื่องอุปกรณ์และวัสดุในหน่วยงาน'),
(2, 'ฝ่ายบัญชี', 'จัดการเอกสารด้านการเงิน');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `price_per_unit` decimal(10,2) DEFAULT NULL,
  `stock_qty` int(11) DEFAULT 0,
  `min_stock` int(11) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `initial_stock` int(11) DEFAULT 0 COMMENT 'ยอดยกมา',
  `max_stock` int(11) DEFAULT 0 COMMENT 'ยอดสูงสุดที่ควรมี',
  `received_qty` int(11) DEFAULT 0 COMMENT 'จำนวนที่รับเข้าทั้งหมด',
  `issued_qty` int(11) DEFAULT 0 COMMENT 'จำนวนที่จ่ายออกทั้งหมด'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `name`, `category`, `unit`, `price_per_unit`, `stock_qty`, `min_stock`, `image`, `initial_stock`, `max_stock`, `received_qty`, `issued_qty`) VALUES
(1, 'กระดาษ A4', 'เครื่องเขียน', 'รีม', 100.00, 25, 10, NULL, 0, 0, 0, 0),
(2, 'ปากกาลูกลื่น', 'เครื่องเขียน', 'ด้าม', 5.00, 200, 50, NULL, 0, 0, 0, 0),
(3, 'แฟ้มเอกสาร', 'เครื่องเขียน', 'เล่ม', 25.00, 80, 10, NULL, 100, 200, 300, 220);

-- --------------------------------------------------------

--
-- Table structure for table `mt_adjustments`
--

CREATE TABLE `mt_adjustments` (
  `id` int(11) NOT NULL,
  `material_id` int(11) DEFAULT NULL,
  `old_quantity` int(11) DEFAULT NULL,
  `new_quantity` int(11) DEFAULT NULL,
  `adjustment_date` date DEFAULT NULL,
  `reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mt_adjustments`
--

INSERT INTO `mt_adjustments` (`id`, `material_id`, `old_quantity`, `new_quantity`, `adjustment_date`, `reason`) VALUES
(1, 1, 30, 25, '2025-04-01', 'เบิกผิดจำนวน'),
(2, 2, 250, 200, '2025-04-01', 'วัสดุชำรุด');

-- --------------------------------------------------------

--
-- Table structure for table `mt_receipts`
--

CREATE TABLE `mt_receipts` (
  `id` int(11) NOT NULL,
  `material_id` int(11) DEFAULT NULL,
  `supplier_name` varchar(100) DEFAULT NULL,
  `tax_no` varchar(50) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price_per_unit` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mt_receipts`
--

INSERT INTO `mt_receipts` (`id`, `material_id`, `supplier_name`, `tax_no`, `purchase_date`, `quantity`, `price_per_unit`, `total_price`) VALUES
(1, 1, 'บริษัท พิมพ์ดี จำกัด', '1234567890123', '2025-03-30', 50, 100.00, 5000.00),
(2, 2, 'ร้านเครื่องเขียน ABC', '9876543210123', '2025-03-29', 300, 5.00, 1500.00);

-- --------------------------------------------------------

--
-- Table structure for table `mt_requests`
--

CREATE TABLE `mt_requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mt_requests`
--

INSERT INTO `mt_requests` (`id`, `user_id`, `request_date`, `purpose`, `status`) VALUES
(1, 2, '2025-04-01', 'สำหรับงานประชุมภายใน', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `mt_request_details`
--

CREATE TABLE `mt_request_details` (
  `id` int(11) NOT NULL,
  `mt_request_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mt_request_details`
--

INSERT INTO `mt_request_details` (`id`, `mt_request_id`, `material_id`, `quantity`, `total_price`) VALUES
(1, 1, 1, 5, 500.00),
(2, 1, 2, 10, 50.00);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `tax_no` varchar(50) DEFAULT NULL,
  `contact_name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `company_name`, `tax_no`, `contact_name`, `phone`, `address`) VALUES
(1, 'บริษัท พิมพ์ดี จำกัด', '1234567890123', 'คุณวรรณา', '0800000000', '123 ถ.ราษฎร์บำรุง หาดใหญ่'),
(2, 'ร้านเครื่องเขียน ABC', '9876543210123', 'คุณประสิทธิ์', '0823456789', '456 ถ.ศรีภูวนารถ สงขลา');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `permission` enum('admin','user') DEFAULT 'user',
  `department_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `position`, `email`, `phone`, `permission`, `department_id`) VALUES
(1, 'admin001', 'admin123', 'นายสมชาย แอดมิน', 'เจ้าหน้าที่พัสดุ', 'admin@example.com', '0812345678', 'admin', 1),
(2, 'user001', 'user123', 'นางสาวน้ำใส ผู้ใช้', 'เจ้าหน้าที่บัญชี', 'user@example.com', '0899999999', 'user', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mt_adjustments`
--
ALTER TABLE `mt_adjustments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `mt_receipts`
--
ALTER TABLE `mt_receipts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `mt_requests`
--
ALTER TABLE `mt_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `mt_request_details`
--
ALTER TABLE `mt_request_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mt_request_id` (`mt_request_id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `mt_adjustments`
--
ALTER TABLE `mt_adjustments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mt_receipts`
--
ALTER TABLE `mt_receipts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mt_requests`
--
ALTER TABLE `mt_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mt_request_details`
--
ALTER TABLE `mt_request_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mt_adjustments`
--
ALTER TABLE `mt_adjustments`
  ADD CONSTRAINT `mt_adjustments_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);

--
-- Constraints for table `mt_receipts`
--
ALTER TABLE `mt_receipts`
  ADD CONSTRAINT `mt_receipts_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);

--
-- Constraints for table `mt_requests`
--
ALTER TABLE `mt_requests`
  ADD CONSTRAINT `mt_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `mt_request_details`
--
ALTER TABLE `mt_request_details`
  ADD CONSTRAINT `mt_request_details_ibfk_1` FOREIGN KEY (`mt_request_id`) REFERENCES `mt_requests` (`id`),
  ADD CONSTRAINT `mt_request_details_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
