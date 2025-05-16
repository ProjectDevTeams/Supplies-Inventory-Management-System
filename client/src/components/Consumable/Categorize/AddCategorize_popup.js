import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import "./AddCategorize_popup.css";

function AddCatagorizePopup({ onClose, onAdd }) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("กรุณากรอกชื่อหมวดหมู่");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/material_categories/add_material_categories.php`, {
        name: categoryName.trim(),
      });

      if (res.data.status === "success") {
        if (onAdd) onAdd();     // แจ้ง parent ให้ refresh
        if (onClose) onClose(); // ปิด popup
      } else {
        alert(res.data.message || "เกิดข้อผิดพลาด");
      }
    } catch (err) {
      console.error("เพิ่มหมวดหมู่ล้มเหลว:", err);
      alert("ไม่สามารถเชื่อมต่อ API");
    }
  };

  return (
    <div className="popup-overlay-categorize">
      <div className="popup-box-categorize">
        <div className="popup-header-categorize">
          <span>เพิ่มหมวดหมู่ใหม่</span>
          <button className="close-btn-categorize" onClick={onClose}>✕</button>
        </div>
        <div className="popup-body-categorize">
          <form className="popup-form-categorize" onSubmit={handleSubmit}>
            <label htmlFor="category">หมวด</label>
            <input
              type="text"
              id="category"
              className="popup-input-categorize"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button type="submit" className="popup-submit-categorize">ยืนยัน</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCatagorizePopup;
