import React from "react";
import "./Incomingbar.css";

function Incomingbar() {
  return (
    <div className="incoming-header">
      <h2 className="incoming-title">รับเข้าวัสดุ</h2>

      <div className="incoming-controls">
        {/* กล่องค้นหา */}
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหา" />
        </div>

        {/* ปุ่มเพิ่มหัวข้อ */}
        <button className="btn green">+ เพิ่มหัวข้อ</button>

        {/* Dropdown ปีงบประมาณ */}
        <select className="budget-select">
          <option disabled selected>เลือกปีงบประมาณ</option>
          <option>2566</option>
          <option>2567</option>
          <option>2568</option>
          <option>2569</option>
          <option>2570</option>
          <option>2571</option>
        </select>

        {/* ปุ่ม Export */}
        <label className="excel-export">
          <img src="../image/excel-icon.png" alt="Excel" />
          <span>Export Excel</span>
        </label>
      </div>
    </div>
  );
}

export default Incomingbar;
