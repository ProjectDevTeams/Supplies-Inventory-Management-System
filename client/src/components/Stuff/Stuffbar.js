import React from "react";
import "./Stuffbar.css";

function Stuffbar() {
  return (
      <div className="stuff-header">
        <h2 className="stuff-title">เบิกวัสดุ</h2>

        <div className="stuff-controls">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="ค้นหา" />
          </div>

          <button className="btn blue">รออนุมัติ</button>
          <button className="btn purple">ติดตามสถานะการเบิก</button>
          <button className="btn orange">รายการขอจัดซื้อเพิ่มเติม</button>
        </div>
      </div>
  );
}

export default Stuffbar;
