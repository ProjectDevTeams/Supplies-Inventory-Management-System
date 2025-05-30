import React, { useState } from "react";
import "./StuffItem_Popup.css";
import { API_URL } from "../../config"; // ✅ เพิ่มเพื่อใช้ประกอบ image URL

function StuffItem_Popup({ item, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState(0);

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

  // ✅ ดึง URL รูปภาพจาก server หรือแสดง placeholder หากไม่มี
  const imageUrl =
    item?.image && item.image.trim() !== ""
      ? `${API_URL}/${item.image}`
      : "https://via.placeholder.com/240x240";

  const flyImageToBasket = () => {
    const img = document.querySelector(".stuff-item-popup-image-preview");
    const bagImg = document.querySelector(".userstuff-bag-icon img"); // ✅ จุดนี้เลือกเฉพาะ <img>

    if (!img || !bagImg) return;

    const startRect = img.getBoundingClientRect();
    const endRect = bagImg.getBoundingClientRect();

    const clone = img.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.left = `${startRect.left}px`;
    clone.style.top = `${startRect.top}px`;
    clone.style.width = `${startRect.width}px`;
    clone.style.height = `${startRect.height}px`;
    clone.style.transition = "all 0.8s ease-in-out";
    clone.style.zIndex = 9999;
    clone.style.borderRadius = "50%";
    clone.style.opacity = 0.9;
    clone.style.pointerEvents = "none";

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = `${endRect.left}px`;
      clone.style.top = `${endRect.top}px`;
      clone.style.width = `0px`;
      clone.style.height = `0px`;
      clone.style.opacity = 0;
    });

    clone.addEventListener("transitionend", () => {
      clone.remove();
      if (bagImg) {
        bagImg.classList.add("animate"); // ✅ ใส่ animate แค่ <img>
        setTimeout(() => {
          bagImg.classList.remove("animate");
        }, 500);
      }
    });
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
              src={imageUrl}
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
                  onClick={() => {
                    flyImageToBasket(); // ✅ เอฟเฟกต์ภาพลอยไปตะกร้า
                    onConfirm(item, quantity); // ✅ เพิ่มลงตะกร้า + ปิด popup
                  }}
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
