import React, { useState } from "react";
import "./Incoming-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Incomingbar({ onExportExcel, searchTerm, setSearchTerm }) {
  const [budgetYear, setBudgetYear] = useState("");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleYearChange = (e) => setBudgetYear(e.target.value);

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
        <select
          className="incoming-budget-select"
          value={budgetYear}
          onChange={handleYearChange}
        >
          <option disabled value="">
            เลือกปี
          </option>
          <option value="2566">2566</option>
          <option value="2567">2567</option>
          <option value="2568">2568</option>
        </select>
      </div>
    </div>
  );
}
