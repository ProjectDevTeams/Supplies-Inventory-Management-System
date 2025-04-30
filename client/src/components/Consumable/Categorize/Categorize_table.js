import React, { useState, useEffect } from "react";
import "./Categorize_table.css";
import AddCatagorizePopup from "./AddCategorize_popup";
import Categorizebar from "./Categorize_bar";

const mockData = [
  { id: "OF", name: "วัสดุสำนักงาน" },
  { id: "SF", name: "วัสดุความปลอดภัย" },
  { id: "MD", name: "วัสดุทางการแพทย์" },
  { id: "CL", name: "วัสดุทำความสะอาด" },
  { id: "ST", name: "เครื่องเขียน" },
  { id: "EL", name: "อุปกรณ์ไฟฟ้า" },
  { id: "CT", name: "เครื่องมือช่าง" },
];

function Categorize_table() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");

  const itemsPerPage = 5;
  const sortedCompanies = [...mockData].sort((a, b) => a.id.localeCompare(b.id));
  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedCompanies = sortedCompanies.slice(indexOfFirstItem, indexOfLastItem);

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
        <thead className="categorize-thead">
          <tr className="categorize-header-row">
            <th className="categorize-th">อันดับ</th>
            <th className="categorize-th">ID</th>
            <th className="categorize-th">หมวดหมู่</th>
          </tr>
        </thead>
        <tbody className="categorize-tbody">
          {displayedCompanies.map((item, index) => (
            <tr key={index} className="categorize-row">
              <td className="categorize-td">{indexOfFirstItem + index + 1}</td>
              <td className="categorize-td">{item.id}</td>
              <td className="categorize-td">
                {item.name}
                <div className="categorize-actions">
                  <button className="categorize-edit-btn">
                    <img className="img-edit-categorize" src="../image/Edit.png" alt="edit" />
                  </button>
                  <button className="categorize-edit-btn">
                    <img className="img-remove-categorize" src="../image/delete.png" alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="categorize-pagination-wrapper">
        <div className="categorize-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedCompanies.length)} จาก {sortedCompanies.length} แถว
        </div>
        <div className="categorize-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>ก่อนหน้า</button>

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

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default Categorize_table;
