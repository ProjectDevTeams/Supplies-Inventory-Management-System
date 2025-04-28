import React from "react";
import "./Organizations-Manage-Popup.css";

function OrganizationsManagePopup({ onClose }) {
  return (
    <div className="manage-popup-container">
      <div className="manage-popup-box">
        <div className="manage-popup-header">
          <span>บริษัท/ห้าง/ร้าน</span>
          <button className="manage-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="manage-popup-body">
          <form>
            <div className="manage-form-row">
              <label>ชื่อบริษัท/ห้าง/ร้าน</label>
              <input
                type="text"
                defaultValue="บริษัท แสงสวัสดี สมบูรณ์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)"
              />
            </div>

            <div className="manage-form-footer">
              <button type="button" className="manage-delete-btn">ลบ</button>
              <button type="submit" className="manage-submit-btn">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrganizationsManagePopup;
