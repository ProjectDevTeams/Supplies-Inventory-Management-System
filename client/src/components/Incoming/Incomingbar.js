import React from "react";
import "./Incomingbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Incomingbar({ onExportExcel, searchTerm, setSearchTerm }) {
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="incoming-header">
      <div className="incoming-title">รับเข้าวัสดุ</div>

      <div className="incoming-controls">
        {/* 🔍 Search */}
        <div className="incoming-search-container">
          <FontAwesomeIcon icon={faSearch} className="incoming-search-icon" />
          <input
            type="text"
            placeholder="ค้นหา"
            value={searchTerm}
            onChange={handleSearchChange}
            className="incoming-search-input"
          />
        </div>

        {/* ➕ เพิ่มหัวข้อ */}
        <button className="incoming-btn-green">+ เพิ่มหัวข้อ</button>

        {/* 📅 ปีงบ */}
        <select className="incoming-budget-select">
          <option disabled selected>
            เลือกปี
          </option>
          <option>2566</option>
          <option>2567</option>
          <option>2568</option>
        </select>

        {/* 🧾 Export */}
        <button className="incoming-excel-export" onClick={onExportExcel}>
          <img src="/image/excel-icon.png" alt="Excel" />
          <span>Export Excel</span>
        </button>
      </div>
    </div>
  );
} // ← Make sure this closing brace is here

export default Incomingbar;
