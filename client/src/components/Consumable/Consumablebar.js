import React from "react";
import { useNavigate } from "react-router";
import "./Consumablebar.css";

function Consumable({ onAddClick }) {
  const navigate = useNavigate(); // สร้างตัวแปร navigate



  return (
    <div>
      <div className="top-bar">
        <div className="top-title">วัสดุสิ้นเปลือง</div>

        <div className="toolbar">
          <div className="search-container">
            <input type="text" placeholder="ค้นหา" />
            <span className="search-icon">🔍</span>
          </div>

          <div className="button-group">
            <button className="btn danger">
              สินค้าใกล้หมดสต็อก <span className="count">60</span> รายการ
            </button>

            {/* ✅ ปุ่มเพิ่มรายการ กดแล้วเรียก onAddClick */}
            <button className="btn success" onClick={onAddClick}>
              + เพิ่มรายการ
            </button>

<<<<<<< Updated upstream
            <button className="btn primary" onClick={() => navigate("categorize")}>จัดการหมวดหมู่</button>
            <button className="btn dark">จัดการหน่วยนับ</button>
=======
            <button className="btn primary" onClick={() => navigate("/categorize")}>จัดการหมวดหมู่</button>
            {/* <button className="btn dark">จัดการหน่วยนับ</button> */}
            <button className="btn dark" onClick={() => navigate("/unitscount")}>จัดการหน่วยนับ</button>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consumable;
