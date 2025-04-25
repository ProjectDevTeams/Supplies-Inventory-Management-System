import React from "react";
import "./Incomingbar.css";

function Incoming() {
  return (
    <div className="incoming-header">
  <h2>รับเข้าวัสดุ</h2>

  <div className="incoming-controls">
  <div className="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหา" />
        </div>

    <button className="btn green">+ เพิ่มหัวข้อ</button>

    <select className="budget-select">
      <option>เลือกปีงบประมาณ</option>
      <option>2565</option>
      <option>2566</option>
      <option>2567</option>
      <option>2568</option>
      <option>2569</option>
      <option>2570</option>
    </select>

    <label className="excel-export">
      <img src="/excel-icon.png" alt="Excel" />
      <span>Export Excel</span>
      <input type="file" id="excelFile" accept=".xlsx" hidden />
    </label>
  </div>
</div>
  );
}

export default Incoming;
