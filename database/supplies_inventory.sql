USE supplies_inventory;


-- Mock data for users
INSERT INTO users (username, password, fullname, position, email, phone, permission, department_id) VALUES
('user01', 'hashedpass1', 'ชื่อผู้ใช้1', 'เจ้าหน้าที่', 'user1@example.com', '0800000001', 'user', 1),
('user02', 'hashedpass2', 'ชื่อผู้ใช้2', 'เจ้าหน้าที่', 'user2@example.com', '0800000002', 'user', 1),
('user03', 'hashedpass3', 'ชื่อผู้ใช้3', 'เจ้าหน้าที่', 'user3@example.com', '0800000003', 'user', 2),
('user04', 'hashedpass4', 'ชื่อผู้ใช้4', 'เจ้าหน้าที่', 'user4@example.com', '0800000004', 'user', 2),
('user05', 'hashedpass5', 'ชื่อผู้ใช้5', 'เจ้าหน้าที่', 'user5@example.com', '0800000005', 'user', 2),
('user06', 'hashedpass6', 'ชื่อผู้ใช้6', 'เจ้าหน้าที่', 'user6@example.com', '0800000006', 'user', 1),
('user07', 'hashedpass7', 'ชื่อผู้ใช้7', 'เจ้าหน้าที่', 'user7@example.com', '0800000007', 'user', 1),
('user08', 'hashedpass8', 'ชื่อผู้ใช้8', 'เจ้าหน้าที่', 'user8@example.com', '0800000008', 'user', 1),
('user09', 'hashedpass9', 'ชื่อผู้ใช้9', 'เจ้าหน้าที่', 'user9@example.com', '0800000009', 'user', 1),
('user10', 'hashedpass10', 'ชื่อผู้ใช้10', 'เจ้าหน้าที่', 'user10@example.com', '0800000010', 'user', 2);

-- Mock data for suppliers
INSERT INTO suppliers (name, address, phone, tax_id) VALUES
('ซัพพลายเออร์ 1', 'ที่อยู่ 1', '0740000001', 'TAX000001'),
('ซัพพลายเออร์ 2', 'ที่อยู่ 2', '0740000002', 'TAX000002'),
('ซัพพลายเออร์ 3', 'ที่อยู่ 3', '0740000003', 'TAX000003'),
('ซัพพลายเออร์ 4', 'ที่อยู่ 4', '0740000004', 'TAX000004'),
('ซัพพลายเออร์ 5', 'ที่อยู่ 5', '0740000005', 'TAX000005'),
('ซัพพลายเออร์ 6', 'ที่อยู่ 6', '0740000006', 'TAX000006'),
('ซัพพลายเออร์ 7', 'ที่อยู่ 7', '0740000007', 'TAX000007'),
('ซัพพลายเออร์ 8', 'ที่อยู่ 8', '0740000008', 'TAX000008'),
('ซัพพลายเออร์ 9', 'ที่อยู่ 9', '0740000009', 'TAX000009'),
('ซัพพลายเออร์ 10', 'ที่อยู่ 10', '0740000010', 'TAX000010');

-- Mock data for mt_requests
INSERT INTO mt_requests (user_id, request_date, status, purpose) VALUES
(2, '2025-04-02', 'pending', 'ขอเบิกวัสดุครั้งที่ 1'),
(6, '2025-04-03', 'not approved', 'ขอเบิกวัสดุครั้งที่ 2'),
(4, '2025-04-04', 'approved', 'ขอเบิกวัสดุครั้งที่ 3'),
(9, '2025-04-05', 'approved', 'ขอเบิกวัสดุครั้งที่ 4'),
(5, '2025-04-06', 'not approved', 'ขอเบิกวัสดุครั้งที่ 5'),
(1, '2025-04-07', 'not approved', 'ขอเบิกวัสดุครั้งที่ 6'),
(9, '2025-04-08', 'pending', 'ขอเบิกวัสดุครั้งที่ 7'),
(6, '2025-04-09', 'pending', 'ขอเบิกวัสดุครั้งที่ 8'),
(3, '2025-04-10', 'not approved', 'ขอเบิกวัสดุครั้งที่ 9'),
(5, '2025-04-11', 'not approved', 'ขอเบิกวัสดุครั้งที่ 10');

-- Mock data for mt_request_details
INSERT INTO mt_request_details (request_id, material_id, quantity, total_price) VALUES
(1, 3, 1, 10),
(2, 3, 9, 369),
(3, 3, 2, 28),
(4, 2, 1, 17),
(5, 2, 7, 168),
(6, 2, 6, 180),
(7, 1, 2, 66),
(8, 2, 8, 376),
(9, 2, 8, 192),
(10, 2, 7, 252);

-- Mock data for mt_receipts
INSERT INTO mt_receipts (material_id, supplier_id, purchase_date, price_per_unit, quantity, total_price) VALUES
(3, 4, '2025-04-02', 36, 29, 1044),
(2, 6, '2025-04-03', 36, 35, 1260),
(2, 9, '2025-04-04', 42, 48, 2016),
(2, 1, '2025-04-05', 21, 18, 378),
(1, 5, '2025-04-06', 12, 86, 1032),
(3, 7, '2025-04-07', 29, 21, 609),
(3, 1, '2025-04-08', 15, 62, 930),
(1, 10, '2025-04-09', 29, 92, 2668),
(2, 3, '2025-04-10', 5, 42, 210),
(2, 4, '2025-04-11', 12, 94, 1128);
