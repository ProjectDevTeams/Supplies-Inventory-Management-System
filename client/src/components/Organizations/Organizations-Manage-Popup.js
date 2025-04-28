import React, { useState } from "react";
import "./Organizations-Manage-Popup.css";

function OrganizationsManagePopup({ onClose, companyData, onDeleteCompany, onEditCompany }) {
  const [name, setName] = useState(companyData.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("กรุณากรอกชื่อบริษัท");
      return;
    }
    onEditCompany(companyData.id, name.trim());
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`คุณแน่ใจว่าต้องการลบ "${companyData.name}" หรือไม่?`)) {
      onDeleteCompany(companyData.id);
      onClose();
    }
  };

  return (
    <div className="manage-popup-container">
      <div className="manage-popup-box">
        <div className="manage-popup-header">
          <span>จัดการบริษัท/ห้าง/ร้าน</span>
          <button className="manage-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="manage-popup-body">
          <form onSubmit={handleSubmit}>
            <div className="manage-form-row">
              <label>ชื่อบริษัท/ห้าง/ร้าน</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="manage-form-footer">
              <button type="button" className="manage-delete-btn" onClick={handleDelete}>
                ลบ
              </button>
              <button type="submit" className="manage-submit-btn">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrganizationsManagePopup;
