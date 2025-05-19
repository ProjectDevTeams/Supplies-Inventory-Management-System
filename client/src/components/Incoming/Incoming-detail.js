import React, { useState } from "react";
import "./Incoming-detail.css";

function IncomingDetail() {
  const [formData, setFormData] = useState({
    warehouse: "",
    company: "",
    taxNumber: "IV6707039",
    orderNumber: "",
    date: "2024-07-05",
    itemName: "สบู่เหลวล้างมือ",
    quantity: 12,
    unitPrice: 123.05,
  });

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const totalPrice = (formData.quantity * formData.unitPrice).toFixed(2);

  const handleSave = () => {
    // ใส่ logic บันทึกข้อมูลที่นี่ (เช่น เรียก API)
    console.log("Save data:", formData);
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
  };

  return (
    <div className="incoming-detail-container">
      <div className="incoming-detail-title">รับเข้าวัสดุ</div>

      <div className="incoming-detail-row">
        <label>คลังวัสดุ</label>
        <select
          className="incoming-detail-select"
          value={formData.warehouse}
          onChange={handleChange("warehouse")}
        >
          <option value="">เลือกคลังวัสดุ</option>
          <option value="in">วัสดุในคลัง</option>
          <option value="out">วัสดุนอกคลัง</option>
        </select>
      </div>

      <div className="incoming-detail-row">
        <label>บริษัท/ห้าง/ร้าน</label>
        <select
          className="incoming-detail-select"
          value={formData.company}
          onChange={handleChange("company")}
        >
          <option value="">เลือกบริษัท/ห้าง/ร้าน</option>
          <option>บริษัท แสงสวัสดิ์ สมจิตร์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)</option>
          <option>ห้างหุ้นส่วนจำกัดกรินบิคเซอร์วิส</option>
          <option>ห้างหุ้นส่วนจำกัด นานาวัสดุอุตสาหกรรม (2021)</option>
          <option>ห้างหุ้นส่วนจำกัด นานาภัณฑ์ สเตชั่นเนอรี่</option>
        </select>
      </div>

      <div className="incoming-detail-row">
        <label>เลขที่กำกับภาษีใบเสร็จ</label>
        <input
          type="text"
          className="incoming-detail-input"
          value={formData.taxNumber}
          readOnly
        />
      </div>

      <div className="incoming-detail-row">
        <label>เลขที่ มอ. จัดซื้อ</label>
        <input
          type="text"
          className="incoming-detail-input"
          value={formData.orderNumber}
          onChange={handleChange("orderNumber")}
          placeholder="กรอกเลขที่ มอ."
        />
      </div>

      <div className="incoming-detail-row">
        <label>วันที่</label>
        <input
          type="date"
          className="incoming-detail-input"
          value={formData.date}
          onChange={handleChange("date")}
        />
      </div>

      <hr className="incoming-detail-divider" />

      <div className="incoming-detail-grid">
        <div>
          <label>วัสดุสิ้นเปลือง</label>
          <input
            type="text"
            className="incoming-detail-input"
            value={formData.itemName}
            onChange={handleChange("itemName")}
          />
        </div>
        <div>
          <label>จำนวนซื้อ</label>
          <input
            type="number"
            className="incoming-detail-input"
            value={formData.quantity}
            onChange={handleChange("quantity")}
          />
        </div>
        <div>
          <label>ราคา/หน่วย</label>
          <input
            type="number"
            className="incoming-detail-input"
            value={formData.unitPrice}
            onChange={handleChange("unitPrice")}
          />
        </div>
        <div className="incoming-detail-price-row">
          <label>ราคารวมรายการ</label>
          <span>{totalPrice}</span>
        </div>
      </div>

      <hr className="incoming-detail-divider" />

      <div className="incoming-detail-summary">
        <strong>ราคารวมทั้งหมดใน 1 บิล</strong>
        <span>{totalPrice}</span>
      </div>

      <div className="incoming-detail-actions">
        <button
          className="incoming-detail-back-button"
          onClick={() => window.history.back()}
        >
          กลับ
        </button>
        <button
          className="incoming-detail-save-button"
          onClick={handleSave}
        >
          บันทึก
        </button>
      </div>
    </div>
);

}
export default IncomingDetail;
