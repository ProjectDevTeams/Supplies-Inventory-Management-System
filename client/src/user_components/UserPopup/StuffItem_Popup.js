import React, { useState } from "react";
import "./StuffItem_Popup.css";

function StuffItem_Popup({ item, onClose }) {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => setQuantity((prev) => prev + 1);
  const handleRemove = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="stuff-popup-container">
      <div className="stuff-popup-box">
        <div className="stuff-popup-header">
          <span className="stuff-popup-title">เลือกรายการ</span>
          <button className="stuff-popup-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="stuff-popup-body">
          {/* ✅ ฝั่งซ้าย: รูปภาพ */}
          <div className="stuff-image-wrapper">
            <label className="stuff-label">ภาพ</label>
            <img src={item?.image || "https://via.placeholder.com/120"} className="stuff-image-preview" alt="preview" />
          </div>

          {/* ✅ ฝั่งขวา: ฟอร์ม */}
          <div className="stuff-form-wrapper">
            <form className="stuff-popup-form">
              <div className="stuff-form-row">
                <label className="stuff-label">ชื่อ</label>
                <input type="text" className="stuff-input" value={item?.name || ""} readOnly />
              </div>

              <div className="stuff-form-row">
                <label className="stuff-label">ประเภท</label>
                <select className="stuff-select" defaultValue={item?.category || ""}>
                  <option value="วัสดุสำนักงาน">วัสดุสำนักงาน</option>
                  <option value="วัสดุความปลอดภัย">วัสดุความปลอดภัย</option>
                </select>
              </div>

              <div className="stuff-form-row split">
                <div>
                  <label className="stuff-label">จำนวนคงเหลือ</label>
                  <input type="text" className="stuff-input" value={item?.remain || 0} readOnly />
                </div>
                <div>
                  <label className="stuff-label">คลังวัสดุ</label>
                  <select className="stuff-select">
                    <option>วัสดุในคลัง</option>
                    <option>วัสดุนอกคลัง</option>
                  </select>
                </div>
              </div>

              <div className="stuff-form-row">
                <label className="stuff-label">หน่วยนับ</label>
                <select className="stuff-select">
                  <option>กล่อง</option>
                  <option>ม้วน</option>
                </select>
              </div>

              <div className="stuff-form-row">
                <label className="stuff-label">จำนวนที่ต้องการเบิก</label>
                <div className="qty-control">
                  <button type="button" className="qty-btn" onClick={handleRemove}>-</button>
                  <input type="text" className="qty-input" value={quantity} readOnly />
                  <button type="button" className="qty-btn" onClick={handleAdd}>+</button>
                </div>
              </div>

              <div className="stuff-form-footer">
                <button type="submit" className="stuff-submit-btn">ยืนยัน</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StuffItem_Popup;
