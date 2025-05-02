import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Adjustbar.css";

function Adjustbar( { onAddClick, searchTerm, setSearchTerm } ) {

  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="adjust-header">
      <h2 className="adjust-title">ปรับยอด</h2>

      <div className="adjust-controls">
        {/* ช่องค้นหา */}
        <div className="search-container">
          <input
            type="text"
            placeholder="ค้นหา"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="search-icon">🔍</span>
          {/* <input type="text" placeholder="ค้นหา" /> */}
        </div>

        {/* ปุ่มเพิ่มหัวข้อ */}
        <button className="btn green">+ เพิ่มหัวข้อ</button>
      </div>
    </div>
  );
}

export default Adjustbar;
