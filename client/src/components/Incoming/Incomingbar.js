import React from "react";
import "./Incomingbar.css";


function Incomingbar({ onExportExcel }) {
  return (
    <div className="incoming-header">
      <h2 className="incoming-title">รับเข้าวัสดุ</h2>

      <div className="incoming-controls">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหา" />
        </div>

        <button className="btn green">+ เพิ่มหัวข้อ</button>

        <select className="budget-select">
          <option disabled selected>เลือกปีงบประมาณ</option>
          <option>2566</option>
          <option>2567</option>
        </select>

        {/* ✅ ปุ่ม Export Excel พร้อมไอคอน */}
        <button className="excel-export" onClick={onExportExcel}>
          <img src="/image/excel-icon.png" alt="Excel" />
          <span>Export Excel</span>
        </button>
      </div>
    </div>
  );
}

export default Incomingbar;
