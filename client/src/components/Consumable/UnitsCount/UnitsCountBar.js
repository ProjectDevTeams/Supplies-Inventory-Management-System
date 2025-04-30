import React from "react";
import { useNavigate } from "react-router";
import "./UnitsCountBar.css";

function UnitsCountBar() {
  const navigate = useNavigate();



  return (
    <div>
      <div className="top-bar-unitscount">
        <div className="top-title-unitscount">วัสดุสิ้นเปลือง</div>

        <div className="toolbar-unitscount">
          <div className="button-group-unitscount">
            <button className="btn primary-unitscount" >จัดการหน่วยนับ</button>
            <button className="btn green-unitscount">+ เพิ่มหน่วยนับ</button>
            <button className="btn dark-unitscount"onClick={() => navigate("/consumable")}>กลับหน้าหลัก</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitsCountBar;
