import React, { useState } from "react";
import "./Organizations-Add-Popup.css";

function OrganizationsAddPopup({ onClose }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("เพิ่มร้านค้าใหม่: " + name);
    onClose();
  };

  return (
    <div className="add-popup-container">
      <div className="add-popup-box">
        <div className="add-popup-header">
          <span>เพิ่มร้านค้าใหม่</span>
          <button className="add-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="add-popup-body">
          <form onSubmit={handleSubmit}>
            <div className="add-form-row">
              <label>ชื่อบริษัท/ห้าง/ร้าน</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="กรอกชื่อร้านค้าใหม่"
              />
            </div>

            <div className="add-form-footer">
              <button type="submit" className="add-submit-btn">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrganizationsAddPopup;
