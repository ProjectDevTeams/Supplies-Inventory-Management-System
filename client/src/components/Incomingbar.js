import React from "react";
import "./Incomingbar.css";

function Incomingbar() {
  return (
    <div className="incomingbar-wrapper">
      <div className="incomingbar-header">
        <h2>รับเข้าวัสดุ</h2>
      </div>

      <div className="incomingbar-controls">
        {/* กล่องค้นหา */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหา" />
        </div>

        {/* ปุ่มเพิ่มหัวข้อ */}
        <button className="btn green">+ เพิ่มหัวข้อ</button>

        {/* Dropdown ปีงบ Mock ปี แก้ด้วยจ้า*/}
        <select className="budget-select">
          <option>เลือกปีงบประมาณ</option>
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
         <input type="file" id="excelFile" accept=".xlsx" hidden />
         </label>
      </div>
    </div>
  );
}

export default Incomingbar;
