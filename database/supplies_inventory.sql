-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2025 at 05:00 AM
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
(1, 'วัสดุในคลัง', 1, -2, '2025-05-06 09:20:18'),
(2, 'วัสดุในคลัง', 2, 5, '2025-05-06 09:20:18'),
(3, 'วัสดุนอกคลัง', 3, -1, '2025-05-06 09:20:18');

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
(1, 'บริษัท ไทยสโตร์ จำกัด', '2025-05-06 09:20:18', 1, '2025-05-08 02:32:19'),
(2, 'บริษัท ออฟฟิศซัพพลาย', '2025-05-06 09:20:18', NULL, '2025-05-08 02:32:19'),
(4, 'test1', '2025-05-09 03:25:54', NULL, '2025-05-11 07:35:15');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `material_code` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
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

INSERT INTO `materials` (`id`, `material_code`, `image`, `name`, `category_id`, `unit_id`, `stock_type`, `carry_over_quantity`, `max_quantity`, `min_quantity`, `price`, `remaining_quantity`, `received_quantity`, `issued_quantity`, `adjusted_quantity`, `created_at`) VALUES
(1, 'M001', '', 'ปากกา', 1, 1, 'วัสดุในคลัง', 10, 100, 20, 5.00, 50, 0, 0, 0, '2025-05-06 09:20:18'),
(2, 'M002', '', 'กระดาษ A4', 2, 2, 'วัสดุในคลัง', 5, 200, 30, 100.00, 120, 0, 0, 0, '2025-05-06 09:20:18'),
(3, 'M003', '', 'ปลั๊กไฟ', 3, 1, 'วัสดุนอกคลัง', 2, 50, 10, 150.00, 15, 0, 0, 0, '2025-05-06 09:20:18'),
(4, 'TEST-LOW-001', '', 'ตัวอย่างวัสดุใกล้หมด', 1, 1, 'วัสดุในคลัง', 10, 100, 5, 20.00, 3, 10, 5, -2, '2025-05-07 02:29:12');

-- --------------------------------------------------------

--
-- Table structure for table `material_categories`
--

CREATE TABLE `material_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `short_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_categories`
--

INSERT INTO `material_categories` (`id`, `name`, `short_name`) VALUES
(1, 'เครื่องเขียน', 'คข'),
(2, 'อุปกรณ์สำนักงาน', 'อส'),
(3, 'อุปกรณ์ไฟฟ้า', 'อฟ');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `stock_type` enum('วัสดุในคลัง','วัสดุนอกคลัง') DEFAULT 'วัสดุในคลัง',
  `menu_stuff` tinyint(1) DEFAULT 0,
  `manage_data` tinyint(1) DEFAULT 0,
  `manage_category` tinyint(1) DEFAULT 0,
  `manage_unit` tinyint(1) DEFAULT 0,
  `view_withdraw` tinyint(1) DEFAULT 0,
  `track_withdraw` tinyint(1) DEFAULT 0,
  `request_more` tinyint(1) DEFAULT 0,
  `view_all_history` tinyint(1) DEFAULT 0,
  `history_receive` tinyint(1) DEFAULT 0,
  `history_withdraw` tinyint(1) DEFAULT 0,
  `history_adjust` tinyint(1) DEFAULT 0,
  `report_stock_balance` tinyint(1) DEFAULT 0,
  `report_receive_monthly` tinyint(1) DEFAULT 0,
  `report_expense_yearly` tinyint(1) DEFAULT 0,
  `report_withdraw` tinyint(1) DEFAULT 0,
  `report_low_stock` tinyint(1) DEFAULT 0,
  `approve_withdraw` tinyint(1) DEFAULT 0,
  `receive_goods` tinyint(1) DEFAULT 0,
  `adjust_stock` tinyint(1) DEFAULT 0,
  `manage_company` tinyint(1) DEFAULT 0,
  `manage_users` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `user` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `stock_type`, `menu_stuff`, `manage_data`, `manage_category`, `manage_unit`, `view_withdraw`, `track_withdraw`, `request_more`, `view_all_history`, `history_receive`, `history_withdraw`, `history_adjust`, `report_stock_balance`, `report_receive_monthly`, `report_expense_yearly`, `report_withdraw`, `report_low_stock`, `approve_withdraw`, `receive_goods`, `adjust_stock`, `manage_company`, `manage_users`, `created_at`, `updated_at`, `user`) VALUES
(1, 'เจ้าหน้าที่คลัง', 'วัสดุในคลัง', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2025-05-07 15:02:23', '2025-05-07 08:02:23', 0),
(2, 'หัวหน้าหน่วยงาน', 'วัสดุในคลัง', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2025-05-07 15:02:23', '2025-05-07 08:02:23', 0),
(3, 'ผู้ดูแลระบบ', 'วัสดุในคลัง', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2025-05-07 15:02:23', '2025-05-07 08:02:23', 0),
(4, 'หัวหน้างาน', 'วัสดุในคลัง', 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2025-05-08 11:05:02', '2025-05-08 04:05:02', 1),
(5, 'เจ้าหน้าที่', 'วัสดุนอกคลัง', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2025-05-08 11:16:53', NULL, 1),
(6, 'test', 'วัสดุในคลัง', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2025-05-08 11:35:43', NULL, 1),
(7, 'test01', 'วัสดุในคลัง', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2025-05-08 11:36:12', NULL, 1),
(8, 'test02', 'วัสดุในคลัง', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2025-05-08 11:36:40', NULL, 1),
(9, 'test03', 'วัสดุในคลัง', 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, '2025-05-08 11:37:50', '2025-05-08 05:13:39', 0);

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
(1, 1, 30, 'วัสดุใกล้หมด', '2025-05-06 09:20:19'),
(2, 2, 50, 'ใช้ในกิจกรรมเดือนหน้า', '2025-05-06 09:20:19'),
(3, 3, 10, 'มีโครงการใหม่ที่ต้องใช้', '2025-05-06 09:20:19');

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
(1, 'วัสดุในคลัง', 1, 'INV001', 'PO001', '2024-01-01', 500.00),
(2, 'วัสดุในคลัง', 2, 'INV002', 'PO002', '2024-02-01', 1000.00),
(3, 'วัสดุนอกคลัง', NULL, 'INV003', 'PO003', '2024-03-01', 450.00);

-- --------------------------------------------------------

--
-- Table structure for table `receive_material_items`
--

CREATE TABLE `receive_material_items` (
  `id` int(11) NOT NULL,
  `receive_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL,
  `price_per_unit` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total_price` decimal(12,2) GENERATED ALWAYS AS (`price_per_unit` * `quantity`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receive_material_items`
--

INSERT INTO `receive_material_items` (`id`, `receive_id`, `material_id`, `price_per_unit`, `quantity`) VALUES
(1, 1, 1, 5.00, 50),
(2, 2, 2, 100.00, 10),
(3, 3, 3, 150.00, 3);

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`) VALUES
(1, 'ชิ้น'),
(2, 'กล่อง'),
(3, 'ขวด');

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
  `permission_id` int(11) DEFAULT NULL,
  `approval_status` enum('รออนุมัติ','อนุมัติ','ไม่อนุมัติ') DEFAULT 'รออนุมัติ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `position`, `email`, `phone`, `permission_id`, `approval_status`) VALUES
(1, 'user01', 'pass123', 'สมชาย คลังดี', 'เจ้าหน้าที่', 'somchai@example.com', '0812345678', 1, 'อนุมัติ'),
(3, 'admin', 'adminpass', 'ผู้ดูแล ระบบ', 'แอดมิน', 'admin@example.com', '0834567890', 3, 'อนุมัติ'),
(14, 'Test00', '$2y$10$IB1Fsa/.1Tw/yIlTuxSHre8Ayq624zkJND2GZedd1cDtXIqO5qyJS', 'Test00', 'เจ้าหน้าที่', 'test@gmail.com', '0000000000', 1, 'รออนุมัติ');

-- --------------------------------------------------------

--
-- Table structure for table `withdraw_materials`
--

CREATE TABLE `withdraw_materials` (
  `id` int(11) NOT NULL,
  `stock_type` enum('วัสดุในคลัง','วัสดุนอกคลัง') DEFAULT NULL,
  `fiscal_code` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `requester_name` varchar(255) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `total_quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `withdraw_materials`
--

INSERT INTO `withdraw_materials` (`id`, `stock_type`, `fiscal_code`, `created_at`, `requester_name`, `reason`, `created_by`, `total_quantity`) VALUES
(1, 'วัสดุในคลัง', '001-02/2568', '2024-04-01', 'หัวหน้าแผนก A', 'ใช้ประชุม', 1, 10),
(3, 'วัสดุนอกคลัง', '003-02/2568', '2024-04-15', 'หัวหน้าคลังนอก', 'ออกภาคสนาม', 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `withdraw_material_items`
--

CREATE TABLE `withdraw_material_items` (
  `id` int(11) NOT NULL,
  `withdraw_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `withdraw_material_items`
--

INSERT INTO `withdraw_material_items` (`id`, `withdraw_id`, `material_id`, `quantity`) VALUES
(1, 1, 1, 5),
(3, 3, 3, 3);

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
  ADD UNIQUE KEY `material_code` (`material_code`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `unit_id` (`unit_id`);

--
-- Indexes for table `material_categories`
--
ALTER TABLE `material_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
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
-- Indexes for table `receive_material_items`
--
ALTER TABLE `receive_material_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receive_id` (`receive_id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `withdraw_materials`
--
ALTER TABLE `withdraw_materials`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fiscal_code` (`fiscal_code`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `withdraw_material_items`
--
ALTER TABLE `withdraw_material_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `withdraw_id` (`withdraw_id`),
  ADD KEY `material_id` (`material_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adjustments`
--
ALTER TABLE `adjustments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `material_categories`
--
ALTER TABLE `material_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `purchase_requests`
--
ALTER TABLE `purchase_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `receive_materials`
--
ALTER TABLE `receive_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `receive_material_items`
--
ALTER TABLE `receive_material_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `withdraw_materials`
--
ALTER TABLE `withdraw_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `withdraw_material_items`
--
ALTER TABLE `withdraw_material_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `materials_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `material_categories` (`id`),
  ADD CONSTRAINT `materials_ibfk_2` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`);

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
-- Constraints for table `receive_material_items`
--
ALTER TABLE `receive_material_items`
  ADD CONSTRAINT `receive_material_items_ibfk_1` FOREIGN KEY (`receive_id`) REFERENCES `receive_materials` (`id`),
  ADD CONSTRAINT `receive_material_items_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

--
-- Constraints for table `withdraw_materials`
--
ALTER TABLE `withdraw_materials`
  ADD CONSTRAINT `withdraw_materials_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `withdraw_material_items`
--
ALTER TABLE `withdraw_material_items`
  ADD CONSTRAINT `withdraw_material_items_ibfk_1` FOREIGN KEY (`withdraw_id`) REFERENCES `withdraw_materials` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `withdraw_material_items_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
