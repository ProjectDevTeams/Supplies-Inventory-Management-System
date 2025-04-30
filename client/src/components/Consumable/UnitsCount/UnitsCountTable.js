import React, { useState } from "react";
import "./UnitsCountTable.css";

function UnitsCountTable() {
  const units = [
    "กระป๋อง", "กระปุก", "ก้อน", "กิโลกรัม", "แกลลอน", "ขวด", "คู่", "เครื่อง",
    "ชุด", "ซอง", "ด้าม", "ถุง", "ใบ", "ผืน", "แผ่น", "แพ็ค", "ม้วน", "ริม", "ลัง", "เล่ม"
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = units.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(units.length / itemsPerPage);

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value);
    setInputPage(page);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputPage >= 1 && inputPage <= totalPages) {
        setCurrentPage(inputPage);
      }
    }
  };

  return (
    <div className="unitscount-table-container">
      <table className="unitscount-table">
        <thead>
          <tr>
            <th>อันดับ</th>
            <th>หน่วยนับ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((unit, index) => (
            <tr key={index}>
              <td className="index-col">{indexOfFirstItem + index + 1}</td>
              <td className="unit-col">
                <span className="unit-name">{unit}</span>
                <div className="unitscount-actions">
                  <button className="unitscount-edit-btn">
                    <img className="img-edit-unitscount" src="./image/Edit.png" alt="Edit" />
                  </button>
                  <button className="unitscount-edit-btn">
                    <img className="img-remove-unitscount" src="./image/delete.png" alt="Delete" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="unitscount-pagination-wrapper">
        <div className="unitscount-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, units.length)} จาก {units.length} แถว
        </div>
        <div className="unitscount-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => {
            const prev = currentPage - 1;
            setCurrentPage(prev);
            setInputPage(prev);
          }}>
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="unitscount-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            onChange={handlePageChange}
            onKeyDown={handleKeyDown}
          />
          <button disabled={currentPage === totalPages} onClick={() => {
            const next = currentPage + 1;
            setCurrentPage(next);
            setInputPage(next);
          }}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnitsCountTable;
