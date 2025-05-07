import React, { useState } from "react";
import "./Materials.css";

function Materials() {
  const [formData] = useState({
    warehouse: "",
    company: "",
    taxNumber: "IV6707039",
    orderNumber: "",
    date: "2024-07-05",
    itemName: "สบู่เหลวล้างมือ",
    quantity: 12,
    unitPrice: 123.05,
  });

  const totalPrice = (formData.quantity * formData.unitPrice).toFixed(2);

  return (
    <div className="materials-container">
      <h2 className="materials-header">รับเข้าวัสดุ</h2>

      <div className="materials-box">
        <div className="materials-row">
          <label>คลังวัสดุ</label>
          <select className="materials-select">
            <option>เลือกคลังวัสดุ</option>
            <option>วัสดุในคลัง</option>
            <option>วัสดุนอกคลัง</option>
          </select>
        </div>

        <div className="materials-row">
          <label>บริษัท/ห้าง/ร้าน</label>
          <select className="materials-select">
            <option>เลือกบริษัท/ห้าง/ร้าน</option>
            <option>บริษัท แสงสวัสดิ์ สมจิตร์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)</option>
            <option>ห้างหุ้นส่วนจำกัดกรินบิคเซอร์วิส</option>
            <option>ห้างหุ้นส่วนจำกัด นานาวัสดุอุตสาหกรรม (2021)</option>
            <option>ห้างหุ้นส่วนจำกัด นานาภัณฑ์ สเตชั่นเนอรี่</option>
          </select>
        </div>

        <div className="materials-row">
          <label>เลขที่กำกับภาษีใบเสร็จ</label>
          <input type="text" value={formData.taxNumber} readOnly />
        </div>

        <div className="materials-row">
          <label>เลขที่ มอ. จัดซื้อ</label>
          <input type="text" placeholder="กรอกเลขที่ มอ." />
        </div>

        <div className="materials-row">
          <label>วันที่</label>
          <input type="date" value={formData.date} readOnly />
        </div>

        <hr className="materials-inner-divider" />

        <div className="materials-grid">
          <div>
            <label>วัสดุสิ้นเปลือง</label>
            <input type="text" value={formData.itemName} readOnly />
          </div>
          <div>
            <label>จำนวนซื้อ</label>
            <input type="number" value={formData.quantity} readOnly />
          </div>
          <div>
            <label>ราคา/หน่วย</label>
            <input type="number" value={formData.unitPrice} readOnly />
          </div>
          <div className="price-row">
            <label>ราคารวมรายการ</label>
            <span>{totalPrice}</span>
          </div>
        </div>

        <hr className="materials-inner-divider" />

        <div className="materials-summary-inside">
          <strong>ราคารวมทั้งหมดใน 1 บิล</strong>
          <span>{totalPrice}</span>
        </div>
      </div>

      <div className="materials-actions">
        <button className="materials-back-button" onClick={() => window.history.back()}>
          กลับ
        </button>
      </div>
    </div>
  );
}

export default Materials;
