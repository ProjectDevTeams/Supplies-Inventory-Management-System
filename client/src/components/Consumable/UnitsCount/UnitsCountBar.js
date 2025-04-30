import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./UnitsCountBar.css";
import AddUnitsCountPopup from "./AddUnitsCountPopup"; //  path ไปยัง popup

function UnitsCountBar() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // ควบคุม popup

  const handleConfirm = (unitName) => {
    console.log("เพิ่มหน่วยนับ:", unitName);
    setShowPopup(false);
  };

  return (
    <div>
      <div className="top-bar-unitscount">
        <div className="top-title-unitscount">วัสดุสิ้นเปลือง</div>

        <div className="toolbar-unitscount">
          <div className="button-group-unitscount">
            <button className="btn primary-unitscount">จัดการหน่วยนับ</button>
            <button
              className="btn green-unitscount"
              onClick={() => setShowPopup(true)}
            >
              + เพิ่มหน่วยนับ
            </button>
            <button
              className="btn dark-unitscount"
              onClick={() => navigate("/consumable")}
            >
              กลับหน้าหลัก
            </button>
          </div>
        </div>
      </div>

      {/*  แสดง popup เมื่อคลิก */}
      {showPopup && (
        <AddUnitsCountPopup
          onClose={() => setShowPopup(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default UnitsCountBar;
