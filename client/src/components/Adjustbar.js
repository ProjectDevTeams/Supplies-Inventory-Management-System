import React from "react";
import "./Adjustbar.css";

function Adjustbar() {
  return (
    <div className="adjust-header">
      <h2 className="adjust-title">ปรับยอด</h2>

      <div className="adjust-controls">
        {/* ช่องค้นหา */}
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหา" />
        </div>

        {/* ปุ่มเพิ่มหัวข้อ */}
        <button className="btn green">+ เพิ่มหัวข้อ</button>
      </div>
    </div>
  );
}

export default Adjustbar;
