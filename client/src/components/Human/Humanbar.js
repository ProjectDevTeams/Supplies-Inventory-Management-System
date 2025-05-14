import React, { useState } from "react";
import "./Humanbar.css";
import AddpeoplePopup from "../../components/Human/addpeople-popup";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Humanbar({ searchTerm, setSearchTerm, onAddSuccess }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddPeopleClick = () => setShowPopup(true);
  const handleClosePopup     = () => setShowPopup(false);
  const handleSearchChange   = e => setSearchTerm(e.target.value);

  return (
    <div className="human-bar">
      <div className="human-bar-title">บุคลากร</div>

      {/* ยกเลย์เอาต์ .org-controls มาใช้ */}
      <div className="human-bar-controls">
        <div className="human-bar-search-box">
          <FontAwesomeIcon
            icon={faSearch}
            className="human-bar-search-icon"
          />
          <input
            type="text"
            className="human-bar-input"
            placeholder="ค้นหา"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <button
          className="human-bar-btn-success"
          onClick={handleAddPeopleClick}
        >
          + เพิ่มเจ้าหน้าที่
        </button>
      </div>

      {showPopup && (
        <AddpeoplePopup
          onClose={handleClosePopup}
          onAdd={onAddSuccess}
        />
      )}
    </div>
  );
}

export default Humanbar;
