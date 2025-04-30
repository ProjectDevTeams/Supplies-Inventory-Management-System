import React, { useState } from "react";
import "./AddUnitsCountPopup.css";

function AddUnitsCountPopup({ onClose, onConfirm }) {
  const [addunitscountValue, setAddunitscountValue] = useState("");

  const handleAddunitscountConfirm = () => {
    if (addunitscountValue.trim() !== "") {
      onConfirm(addunitscountValue);
      setAddunitscountValue("");
    }
  };

  return (
    <div className="addunitscount-overlay">
      <div className="addunitscount-box">
        <div className="addunitscount-header">
          <span className="addunitscount-title">เพิ่มหน่วยนับใหม่</span>
          <button className="addunitscount-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="addunitscount-body">
          <label htmlFor="addunitscount-input">หน่วยนับ</label>
          <input
            id="addunitscount-input"
            type="text"
            value={addunitscountValue}
            onChange={(e) => setAddunitscountValue(e.target.value)}
            placeholder="เช่น ชิ้น, กล่อง"
          />
          <button className="addunitscount-confirm-btn" onClick={handleAddunitscountConfirm}>
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUnitsCountPopup;
