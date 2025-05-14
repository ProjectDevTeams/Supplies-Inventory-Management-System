// Categorize_table.js
import React, { useState, useEffect } from "react";
import "./Categorize_table.css";
import AddCatagorizePopup from "./AddCategorize_popup";
import Categorizebar from "./Categorize_bar";

// เปลี่ยน mockData ให้เก็บเฉพาะชื่อหมวดหมู่
const mockData = [
  { name: "วัสดุสำนักงาน" },
  { name: "วัสดุความปลอดภัย" },
  { name: "วัสดุทางการแพทย์" },
  { name: "วัสดุทำความสะอาด" },
  { name: "เครื่องเขียน" },
  { name: "อุปกรณ์ไฟฟ้า" },
  { name: "เครื่องมือช่าง" },
];

function Categorize_table() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");

  const itemsPerPage = 5;
  // เรียงลำดับตามชื่อ
  const sortedCategories = [...mockData].sort((a, b) =>
    a.name.localeCompare(b.name, "th")
  );
  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedCategories = sortedCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="categorize-table-container">
      <Categorizebar onAddClick={() => setShowPopup(true)} />
      {showPopup && <AddCatagorizePopup onClose={() => setShowPopup(false)} />}

      <table className="categorize-table">
        <thead>
          <tr>
            <th className="categorize-th">อันดับ</th>
            <th className="categorize-th">หมวดหมู่</th>
          </tr>
        </thead>
        <tbody>
          {displayedCategories.map((item, index) => (
            <tr key={index} className="categorize-row">
              <td className="categorize-td">
                {indexOfFirstItem + index + 1}
              </td>
              <td className="categorize-td">
                {item.name}
                <div className="categorize-actions">
                  <button className="categorize-edit-btn">
                    <img
                      className="img-edit-categorize"
                      src="../image/Edit.png"
                      alt="edit"
                    />
                  </button>
                  <button className="categorize-delete-btn">
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

      <div className="categorize-pagination-wrapper">
        <div className="categorize-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedCategories.length)} จาก {sortedCategories.length} แถว
        </div>
        <div className="categorize-pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="categorize-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
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
            placeholder={`${currentPage} / ${totalPages}`}
          />

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default Categorize_table;
