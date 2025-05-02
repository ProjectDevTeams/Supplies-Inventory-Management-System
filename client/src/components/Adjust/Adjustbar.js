import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Adjustbar.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
        <FontAwesomeIcon icon={faSearch} className="search-icon"/>
          <input
            type="text"
            placeholder="ค้นหา"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        
        </div>

        {/* ปุ่มเพิ่มหัวข้อ */}
        <button className="btn green">+ เพิ่มหัวข้อ</button>
      </div>
    </div>
  );
}

export default Adjustbar;
