import React, { useState } from "react";
import "./StuffItem_Popup.css";

function StuffItem_Popup({ item, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(0);

  // เพิ่มการเช็คและ input ที่กรอกเองได้
  const handleAdd = () => {
    setQuantity((prev) => (prev < item.remain ? prev + 1 : prev));
  };

  const handleRemove = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0 && val <= item.remain) {
      setQuantity(val);
    }
  };

  return (
    <div className="stuff-item-popup-container">
      <div className="stuff-item-popup-box">
        <div className="stuff-item-popup-header">
          <span className="stuff-item-popup-title">เลือกรายการ</span>
          <button className="stuff-item-popup-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="stuff-item-popup-body">
          {/* ✅ ฝั่งซ้าย: รูปภาพ */}
          <div className="stuff-item-popup-image-wrapper">
            <label className="stuff-item-popup-label">ภาพ</label>
            <img
              src={item?.image || "https://via.placeholder.com/120"}
              className="stuff-item-popup-image-preview"
              alt="preview"
            />
          </div>

          {/* ✅ ฝั่งขวา: ฟอร์ม */}
          <div className="stuff-item-popup-form-wrapper">
            <form className="stuff-item-popup-form">
              <div className="stuff-item-popup-form-row">
                <label className="stuff-item-popup-label">ชื่อ</label>
                <input
                  type="text"
                  className="stuff-item-popup-input"
                  value={item?.name || ""}
                  readOnly
                />
              </div>

              <div className="stuff-item-popup-form-row">
                <label className="stuff-item-popup-label">ประเภท</label>
                <input
                  type="text"
                  className="stuff-item-popup-input"
                  value={item?.category || "-"}
                  readOnly
                />
              </div>

              <div className="stuff-item-popup-form-row split">
                <div>
                  <label className="stuff-item-popup-label">จำนวนคงเหลือ</label>
                  <input
                    type="text"
                    className="stuff-item-popup-input"
                    value={item?.remain || 0}
                    readOnly
                  />
                </div>
                <div>
                  <label className="stuff-item-popup-label">คลังวัสดุ</label>
                  <input
                    type="text"
                    className="stuff-item-popup-input"
                    value={item?.location || "-"}
                    readOnly
                  />
                </div>
              </div>

              <div className="stuff-item-popup-form-row">
                <label className="stuff-item-popup-label">หน่วยนับ</label>
                <input
                  type="text"
                  className="stuff-item-popup-input"
                  value={item?.unit || "-"}
                  readOnly
                />
              </div>

              <div className="stuff-item-popup-form-row">
                <label className="stuff-item-popup-label">
                  จำนวนที่ต้องการเบิก
                </label>
                <div className="stuff-item-popup-qty-control">
                  <button
                    type="button"
                    className="stuff-item-popup-qty-btn"
                    onClick={handleRemove}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="stuff-item-popup-qty-input"
                    value={quantity}
                    onChange={handleInputChange}
                    min={0}
                    max={item.remain}
                  />
                  <button
                    type="button"
                    className="stuff-item-popup-qty-btn"
                    onClick={handleAdd}
                  >
                    +
                  </button>
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
