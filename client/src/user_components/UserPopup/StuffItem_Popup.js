import React, { useState } from "react";
import "./StuffItem_Popup.css";

function StuffItem_Popup({ item, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => setQuantity((prev) => prev + 1);
  const handleRemove = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="stuff-item-popup-container">
      <div className="stuff-item-popup-box">
        <div className="stuff-item-popup-header">
          <span className="stuff-item-popup-title">เลือกรายการ</span>
          <button className="stuff-item-popup-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="stuff-item-popup-body">
          {/* ✅ ฝั่งซ้าย: รูปภาพ */}
          <div className="stuff-item-popup-image-wrapper">
            <label className="stuff-item-popup-label">ภาพ</label>
            <img src={item?.image || "https://via.placeholder.com/120"} className="stuff-item-popup-image-preview" alt="preview" />
          </div>

          {/* ✅ ฝั่งขวา: ฟอร์ม */}
          <div className="stuff-item-popup-form-wrapper">
            <form className="stuff-item-popup-form">
              <div className="stuff-item-popup-form-row">
                <label className="stuff-item-popup-label">ชื่อ</label>
                <input type="text" className="stuff-item-popup-input" value={item?.name || ""} readOnly />
              </div>

              <div className="stuff-item-popup-form-row">
                <label className="stuff-item-popup-label">ประเภท</label>
                <select className="stuff-item-popup-select" defaultValue={item?.category || ""}>
                  <option value="วัสดุสำนักงาน">วัสดุสำนักงาน</option>
                  <option value="วัสดุความปลอดภัย">วัสดุความปลอดภัย</option>
                </select>
              </div>

              <div className="stuff-item-popup-form-row split">
                <div>
                  <label className="stuff-item-popup-label">จำนวนคงเหลือ</label>
                  <input type="text" className="stuff-item-popup-input" value={item?.remain || 0} readOnly />
                </div>
                <div>
                  <label className="stuff-item-popup-label">คลังวัสดุ</label>
                  <select className="stuff-item-popup-select">
                    <option>วัสดุในคลัง</option>
                    <option>วัสดุนอกคลัง</option>
                  </select>
                </div>
              </div>

              <div className="stuff-item-popup-form-row">
                <label className="stuff-item-popup-label">หน่วยนับ</label>
                <select className="stuff-item-popup-select">
                  <option>กล่อง</option>
                  <option>ม้วน</option>
                </select>
              </div>

              <div className="stuff-item-popup-form-row">
                <label className="stuff-item-popup-label">จำนวนที่ต้องการเบิก</label>
                <div className="stuff-item-popup-qty-control">
                  <button type="button" className="stuff-item-popup-qty-btn" onClick={handleRemove}>-</button>
                  <input type="text" className="stuff-item-popup-qty-input" value={quantity} readOnly />
                  <button type="button" className="stuff-item-popup-qty-btn" onClick={handleAdd}>+</button>
                </div>
              </div>

              <div className="stuff-item-popup-form-footer">
                <button
                  type="button"
                  className="stuff-item-popup-submit-btn"
                  onClick={() => onConfirm(item, quantity)}
                >
                  ยืนยัน
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StuffItem_Popup;
