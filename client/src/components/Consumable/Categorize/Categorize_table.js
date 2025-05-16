import React, { useState, useEffect } from "react";
import "./Categorize_table.css";
import AddCatagorizePopup from "./AddCategorize_popup";
import EditCatagorizePopup from "./EditCategorize_popup";
import Categorizebar from "./Categorize_bar";
import axios from "axios";
import { API_URL } from "../../../config";

function Categorize_table() {
  // 🟢 State สำหรับควบคุมการเปิดปิด Popup เพิ่มข้อมูล
  const [showAddPopup, setShowAddPopup] = useState(false);

  // 🟢 เก็บ id ที่ต้องการแก้ไข (ใช้เปิด popup edit)
  const [editId, setEditId] = useState(null);

  // 🟢 ข้อมูลหมวดหมู่ทั้งหมดจากฐานข้อมูล
  const [data, setData] = useState([]);

  // 🟢 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 5;

  // 🔄 โหลดข้อมูลหมวดหมู่เมื่อ component ถูก mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // 📦 ดึงข้อมูลหมวดหมู่จาก API
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/material_categories/get_material_categories.php`);
      if (res.data.status === "success" && Array.isArray(res.data.data)) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error("โหลดข้อมูลหมวดหมู่ล้มเหลว:", err);
    }
  };

  // ❌ ลบหมวดหมู่ตาม id และโหลดข้อมูลใหม่
  const handleDelete = async (id) => {
    if (!window.confirm("คุณแน่ใจว่าต้องการลบหมวดหมู่นี้หรือไม่?")) return;
    try {
      await axios.post(`${API_URL}/material_categories/delete_material_categories.php`, { id });
      fetchCategories(); // โหลดใหม่หลังลบ
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการลบหมวดหมู่:", err);
    }
  };

  // 🔤 เรียงตามชื่อภาษาไทย
  const sortedCategories = [...data].sort((a, b) =>
    a.name.localeCompare(b.name, "th")
  );

  // 📄 Pagination Logic
  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedCategories = sortedCategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="categorize-table-container">
      {/* 🔘 ปุ่มเพิ่มหมวดหมู่ */}
      <Categorizebar onAddClick={() => setShowAddPopup(true)} />

      {/* 🔼 Popup เพิ่มข้อมูล */}
      {showAddPopup && (
        <AddCatagorizePopup
          onClose={() => {
            setShowAddPopup(false);
            fetchCategories(); // โหลดใหม่หลังเพิ่ม
          }}
        />
      )}

      {/* 🔼 Popup แก้ไขข้อมูล */}
      {editId !== null && (
        <EditCatagorizePopup
          category={data.find((d) => d.id === editId)}
          onClose={() => setEditId(null)}
          onUpdate={fetchCategories}
        />
      )}

      {/* 🧾 ตารางแสดงหมวดหมู่ */}
      <table className="categorize-table">
        <thead>
          <tr>
            <th className="categorize-th">อันดับ</th>
            <th className="categorize-th">หมวดหมู่</th>
          </tr>
        </thead>
        <tbody>
          {displayedCategories.map((item, index) => (
            <tr key={item.id} className="categorize-row">
              <td className="categorize-td">{indexOfFirstItem + index + 1}</td>
              <td className="categorize-td">
                {item.name}
                <div className="categorize-actions">
                  {/* ✏️ ปุ่มแก้ไข */}
                  <button
                    className="categorize-edit-btn"
                    onClick={() => setEditId(item.id)}
                  >
                    <img
                      className="img-edit-categorize"
                      src="../image/Edit.png"
                      alt="edit"
                    />
                  </button>
                  {/* 🗑️ ปุ่มลบ */}
                  <button
                    className="categorize-delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <img
                      className="img-remove-categorize"
                      src="../image/delete.png"
                      alt="delete"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📟 Pagination Control */}
      <div className="categorize-pagination-wrapper">
        <div className="categorize-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedCategories.length)} จาก {sortedCategories.length} แถว
        </div>
        <div className="categorize-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="categorize-page-input"
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
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default Categorize_table;
