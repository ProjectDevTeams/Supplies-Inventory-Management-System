import React from "react";
import "./Organizationsbar.css";

function Organizationsbar() {
  return (
    <div className="org-bar">
      <div className="org-title">บริษัท/ห้าง/ร้าน</div>

      <div className="org-controls">
        <div className="org-search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหา" />
        </div>

        <button className="btn green">+ เพิ่มร้านค้า</button>
      </div>
    </div>
  );
}

export default Organizationsbar;
