import React from "react";
import { useNavigate } from "react-router";
import "./Consumablebar.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Consumable({ onAddClick, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="top-bar">
        <div className="top-title">วัสดุสิ้นเปลือง</div>

        <div className="toolbar">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon"/>
            <input
              type="text"
              placeholder="ค้นหา"
              value={searchTerm}
              onChange={handleSearchChange}
            />
              
            
          </div>

          <div className="button-group">
            <button className="btn danger">
              สินค้าใกล้หมดสต็อก <span className="count">60</span> รายการ
            </button>

            <button className="btn success" onClick={onAddClick}>
              + เพิ่มรายการ
            </button>

            <button
              className="btn primary"
              onClick={() => navigate("/consumable/categorize")}
            >
              จัดการหมวดหมู่
            </button>

            <button
              className="btn dark"
              onClick={() => navigate("/consumable/unitscount")}
            >
              จัดการหน่วยนับ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consumable;
