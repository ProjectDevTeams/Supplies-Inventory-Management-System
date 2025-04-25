import React from "react";
import "./Stuffbar.css";

function Stuff() {
  return (
    <div className="request-header">
      <h2>เบิกวัสดุ</h2>
      <div className="request-controls">
        <div className="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหา" />
        </div>

        <button className="btn blue">
          รออนุมัติ
        </button>

        <button className="btn purple">
          ติดตามสถานะการเบิก
        </button>

        <button className="btn orange">
          รายการขอจัดซื้อเพิ่มเติม
        </button>

      </div>
    </div>
  );
}

export default Stuff;
