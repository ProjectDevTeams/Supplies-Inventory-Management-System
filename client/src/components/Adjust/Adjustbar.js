import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adjustbar.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdjustAddPopup from "./Adjust-add-popup";

function Adjustbar({ onAddClick, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="adjust-header">
      <div className="adjust-title">ปรับยอด</div>

      <div className="adjust-controls">
        {/* ช่องค้นหา */}
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="ค้นหา"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <button className="btn green" onClick={() => setShowPopup(true)}>
            + เพิ่มหัวข้อ
          </button>

          {showPopup && (
            <AdjustAddPopup onClose={() => setShowPopup(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Adjustbar;
