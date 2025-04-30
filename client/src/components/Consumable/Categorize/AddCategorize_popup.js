import React from "react";
import "./AddCategorize_popup.css";

function AddCatagorizePopup({ onClose }) {  // ✅ รับ onClose จาก props
  return (
    <div className="popup-overlay-categorize">
      <div className="popup-box-categorize">
        <div className="popup-header-categorize">
          <span>เพิ่มหมวดหมู่ใหม่</span>
          <button className="close-btn-categorize" onClick={onClose}>✕</button>
        </div>
        <div className="popup-body-categorize">
          <form className="popup-form-categorize">
            <label htmlFor="category">หมวด</label>
            <input type="text" id="category" className="popup-input-categorize" />
            <button type="submit" className="popup-submit-categorize">ยืนยัน</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCatagorizePopup;
