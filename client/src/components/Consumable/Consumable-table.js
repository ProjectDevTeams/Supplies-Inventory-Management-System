import React, { useState, useEffect } from "react";

import "./Consumable-table.css";
import AddnewPopup from "./addnew-popup";
import Consumable from "./Consumablebar";

const mockData = [
  { code: "OF001", image: "https://via.placeholder.com/60", name: "เทปกาวสองหน้า", category: "วัสดุสำนักงาน", unit: "ม้วน", location: "คลังหลัก", price: 220, status: "ใกล้หมดสต็อก!", in: 2, out: 2, remain: 1, low: 1, high: 5, brought: 1 },
  { code: "OF002", image: "https://via.placeholder.com/60", name: "แฟ้ม A4 สีฟ้า", category: "แฟ้มเอกสาร", unit: "ชิ้น", location: "คลังหลัก", price: 15, status: "พร้อมใช้", in: 5, out: 1, remain: 4, low: 2, high: 10, brought: 2 },
  { code: "OF003", image: "https://via.placeholder.com/60", name: "ดินสอ 2B", category: "เครื่องเขียน", unit: "แท่ง", location: "คลังรอง", price: 5, status: "ใกล้หมดสต็อก!", in: 3, out: 2, remain: 1, low: 1, high: 6, brought: 1 },
  { code: "OF004", image: "https://via.placeholder.com/60", name: "ปากกาเจลสีดำ", category: "เครื่องเขียน", unit: "ด้าม", location: "คลังวัสดุ", price: 10, status: "พร้อมใช้", in: 6, out: 2, remain: 4, low: 2, high: 8, brought: 2 },
  { code: "OF005", image: "https://via.placeholder.com/60", name: "กระดาษ A4", category: "กระดาษ", unit: "รีม", location: "คลังหลัก", price: 120, status: "ใกล้หมดสต็อก!", in: 2, out: 1, remain: 1, low: 2, high: 5, brought: 0 },
  { code: "OF006", image: "https://via.placeholder.com/60", name: "คลิปหนีบกระดาษ", category: "เครื่องเขียน", unit: "กล่อง", location: "คลังรอง", price: 25, status: "พร้อมใช้", in: 4, out: 0, remain: 4, low: 2, high: 10, brought: 1 },
  { code: "OF007", image: "https://via.placeholder.com/60", name: "แฟ้มแข็ง", category: "แฟ้มเอกสาร", unit: "เล่ม", location: "คลังหลัก", price: 30, status: "พร้อมใช้", in: 3, out: 1, remain: 2, low: 1, high: 4, brought: 0 },
  { code: "OF008", image: "https://via.placeholder.com/60", name: "สมุดปกแข็ง", category: "สมุด", unit: "เล่ม", location: "คลังรอง", price: 35, status: "ใกล้หมดสต็อก!", in: 2, out: 1, remain: 1, low: 1, high: 3, brought: 1 },
  { code: "OF009", image: "https://via.placeholder.com/60", name: "กระดาษโน้ต", category: "กระดาษ", unit: "ชุด", location: "คลังวัสดุ", price: 12, status: "พร้อมใช้", in: 5, out: 2, remain: 3, low: 2, high: 6, brought: 0 },
  { code: "OF010", image: "https://via.placeholder.com/60", name: "เทปใส", category: "วัสดุสำนักงาน", unit: "ม้วน", location: "คลังหลัก", price: 8, status: "ใกล้หมดสต็อก!", in: 1, out: 1, remain: 0, low: 1, high: 3, brought: 1 },
  { code: "OF011", image: "https://via.placeholder.com/60", name: "สติ๊กเกอร์ A4", category: "กระดาษ", unit: "แผ่น", location: "คลังรอง", price: 5, status: "พร้อมใช้", in: 3, out: 0, remain: 3, low: 2, high: 5, brought: 2 },
  { code: "OF012", image: "https://via.placeholder.com/60", name: "แฟ้มซองพลาสติก", category: "แฟ้มเอกสาร", unit: "ซอง", location: "คลังหลัก", price: 7, status: "พร้อมใช้", in: 4, out: 1, remain: 3, low: 2, high: 6, brought: 1 },
  { code: "OF013", image: "https://via.placeholder.com/60", name: "ลวดเย็บกระดาษ", category: "เครื่องเขียน", unit: "กล่อง", location: "คลังรอง", price: 18, status: "ใกล้หมดสต็อก!", in: 2, out: 2, remain: 0, low: 1, high: 3, brought: 0 },
  { code: "OF014", image: "https://via.placeholder.com/60", name: "ปากกาลูกลื่น", category: "เครื่องเขียน", unit: "ด้าม", location: "คลังวัสดุ", price: 12, status: "พร้อมใช้", in: 5, out: 1, remain: 4, low: 2, high: 6, brought: 2 },
  { code: "OF015", image: "https://via.placeholder.com/60", name: "แฟ้มห่วง", category: "แฟ้มเอกสาร", unit: "เล่ม", location: "คลังหลัก", price: 40, status: "พร้อมใช้", in: 3, out: 1, remain: 2, low: 2, high: 5, brought: 1 },
  { code: "OF016", image: "https://via.placeholder.com/60", name: "เครื่องเย็บกระดาษ", category: "เครื่องใช้สำนักงาน", unit: "เครื่อง", location: "คลังรอง", price: 85, status: "พร้อมใช้", in: 2, out: 0, remain: 2, low: 1, high: 3, brought: 0 },
  { code: "OF017", image: "https://via.placeholder.com/60", name: "น้ำยาล้างบอร์ด", category: "ทำความสะอาด", unit: "ขวด", location: "คลังวัสดุ", price: 30, status: "ใกล้หมดสต็อก!", in: 1, out: 1, remain: 0, low: 1, high: 2, brought: 1 },
  { code: "OF018", image: "https://via.placeholder.com/60", name: "สก็อตเทป", category: "วัสดุสำนักงาน", unit: "ม้วน", location: "คลังหลัก", price: 6, status: "พร้อมใช้", in: 3, out: 1, remain: 2, low: 1, high: 4, brought: 0 },
  { code: "OF019", image: "https://via.placeholder.com/60", name: "กล่องเอกสาร", category: "วัสดุสำนักงาน", unit: "กล่อง", location: "คลังหลัก", price: 55, status: "พร้อมใช้", in: 4, out: 0, remain: 4, low: 2, high: 6, brought: 2 },
  { code: "OF020", image: "https://via.placeholder.com/60", name: "แผ่นพลาสติกใส", category: "วัสดุสำนักงาน", unit: "แผ่น", location: "คลังรอง", price: 3, status: "ใกล้หมดสต็อก!", in: 2, out: 1, remain: 1, low: 1, high: 4, brought: 1 }
];


const itemsPerPage = 5;

function Consumable_Table({ searchTerm, setSearchTerm }) {

  // const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [inputPage, setInputPage] = useState("");

  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = mockData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage(""); // เคลียร์เมื่อเปลี่ยนหน้า
  }, [currentPage]);

  return (
    <div className="table-container-consumable">
      <Consumable
        onAddClick={() => setShowPopup(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <table className="consumable-table">
        <thead className="consumable-thead">
          <tr className="consumable-thead-row">
            <th className="consumable-th">รหัส</th>
            <th className="consumable-th">รูปภาพ</th>
            <th className="consumable-th">รายการ</th>
            <th className="consumable-th">ยอดยกมา</th>
            <th className="consumable-th">ยอดต่ำสุด</th>
            <th className="consumable-th">ยอดสูงสุด</th>
            <th className="consumable-th">รับ</th>
            <th className="consumable-th">จ่าย</th>
            <th className="consumable-th">คงเหลือ</th>
          </tr>
        </thead>
        <tbody className="consumable-tbody">
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="9" className="consumable-no-data">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            currentItems.map((item, index) => (
              <tr key={index} className="consumable-tr">
                <td className="consumable-td">{item.code}</td>
                <td className="consumable-td">
                  <img src={item.image} alt={item.name} className="item-image" />
                </td>
                <td className="item-cell consumable-td">
                  <b>ชื่อ :</b> {item.name}
                  <br />
                  หมวดหมู่ : {item.category}
                  <br />
                  หน่วยนับ : {item.unit} | คลังวัสดุ : {item.location}
                  <br />
                  ราคา/หน่วย : {item.price}
                  <br />
                  สถานะ : <span className={`item-status ${item.status === "ใกล้หมดสต็อก!" ? "low-stock" : "in-stock"}`}>{item.status}</span>
                  <div className="item-actions">
                    <a href="#" className="edit">✏ แก้ไข</a>
                    <a href="#" className="adjust">ปรับยอด</a>
                  </div>
                </td>
                <td className="consumable-td">{item.brought}</td>
                <td className="consumable-td">{item.low}</td>
                <td className="consumable-td">{item.high}</td>
                <td className="consumable-td">{item.in}</td>
                <td className="consumable-td">{item.out}</td>
                <td className="consumable-td">{item.remain}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showPopup && <AddnewPopup onClose={() => setShowPopup(false)} />}

      <div className="consumable-pagination-wrapper">
        <div className="consumable-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, mockData.length)} จาก {mockData.length} แถว
        </div>
        <div className="consumable-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>ก่อนหน้า</button>

          <input
            type="number"
            className="consumable-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            placeholder={`${currentPage} / ${totalPages}`}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = parseInt(inputPage.trim(), 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
                e.target.blur();
              }
            }}
          />

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default Consumable_Table;