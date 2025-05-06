import React from "react";
import "./Organizationsbar.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Organizationsbar({ onAddClick, searchTerm, setSearchTerm }) {
  return (
    <div className="org-bar">
      <div className="org-title">บริษัท/ห้าง/ร้าน</div>

      <div className="org-controls">
        <div className="org-search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="ค้นหา"
            className="org-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="org-btn-green" onClick={onAddClick}>
          + เพิ่มร้านค้า
        </button>
      </div>
    </div>
  );
}

export default Organizationsbar;
