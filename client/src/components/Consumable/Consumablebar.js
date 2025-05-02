import React from "react";
import { useNavigate } from "react-router";
import "./Consumablebar.css";

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
            <input
              type="text"
              placeholder="ค้นหา"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="search-icon">🔍</span>
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
