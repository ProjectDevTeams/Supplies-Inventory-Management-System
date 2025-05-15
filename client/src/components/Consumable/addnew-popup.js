// File: src/components/AddnewPopup.js

import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./addnew-popup.css";

function AddnewPopup({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    unit: "",
    stock_type: "",
    carry_over_quantity: 0,
    min_quantity: 0,
    max_quantity: 0,
    price: 0,
    created_at: "",
    image: ""  // auto-generated path
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const selected = e.target.files[0] || null;
    setFile(selected);

    if (selected) {
      // sanitize formData.name for filename
      const base = formData.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "_") || "file";
      const time = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0,14);
      const ext  = selected.name.split(".").pop();
      const filename = `${base}_${time}.${ext}`;
      const path = `materials/picture/${filename}`;
      setFormData(prev => ({ ...prev, image: path }));
    } else {
      setFormData(prev => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.entries(formData).forEach(([k, v]) => body.append(k, v));
    if (file) body.append("image", file);

    try {
      const res = await axios.post(
        `${API_URL}/materials/add_material.php`,
        body,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.status === "success") {
        onAdd?.(res.data.data);
        onClose();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-box">
        <div className="popup-header">
          <span>เพิ่มรายการใหม่</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="popup-body">
          <form onSubmit={handleSubmit}>
            {/* ชื่อ */}
            <div className="form-row">
              <label>ชื่อ</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* ประเภท (category_id) */}
            <div className="form-row">
              <label>ประเภท</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">เลือกประเภท</option>
                <option value="1">วัสดุสำนักงาน</option>
                <option value="2">วัสดุความปลอดภัย</option>
              </select>
            </div>

            {/* หน่วยนับ */}
            <div className="form-row">
              <label>หน่วยนับ</label>
              <input
                list="units"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
              />
              <datalist id="units">
                <option value="กระป๋อง" />
                <option value="กิโลกรัม" />
                <option value="ขวด" />
                <option value="เครื่อง" />
              </datalist>
            </div>

            {/* คลังวัสดุ */}
            <div className="form-row">
              <label>คลังวัสดุ</label>
              <select
                name="stock_type"
                value={formData.stock_type}
                onChange={handleChange}
                required
              >
                <option value="">เลือกคลังวัสดุ</option>
                <option value="วัสดุในคลัง">วัสดุในคลัง</option>
                <option value="วัสดุนอกคลัง">วัสดุนอกคลัง</option>
              </select>
            </div>

            {/* ยอดยกมา */}
            <div className="form-row">
              <label>ยอดยกมา</label>
              <input
                type="number"
                name="carry_over_quantity"
                value={formData.carry_over_quantity}
                onChange={handleChange}
              />
            </div>

            {/* ยอดต่ำสุด */}
            <div className="form-row">
              <label>ยอดต่ำสุด</label>
              <input
                type="number"
                name="min_quantity"
                value={formData.min_quantity}
                onChange={handleChange}
              />
            </div>

            {/* ยอดสูงสุด */}
            <div className="form-row">
              <label>ยอดสูงสุด</label>
              <input
                type="number"
                name="max_quantity"
                value={formData.max_quantity}
                onChange={handleChange}
              />
            </div>

            {/* ราคา/หน่วย */}
            <div className="form-row">
              <label>ราคา/หน่วย</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            {/* แนบไฟล์ภาพ */}
            <div className="form-row file-upload">
              <label>แนบไฟล์ภาพ</label>
              <div className="upload-group">
                <small>ขนาดไฟล์สูงสุด 5MB</small>
                <input
                  type="file"
                  id="fileUpload"
                  className="file-hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="custom-file-btn">
                  เลือกไฟล์
                </label>
              </div>
            </div>

            {/* วันที่สร้าง */}
            <div className="form-row">
              <label>วันที่สร้าง</label>
              <input
                type="date"
                name="created_at"
                value={formData.created_at}
                onChange={handleChange}
              />
            </div>

            {/* ปุ่มยืนยัน */}
            <div className="form-footer">
              <button type="submit" className="submit-btn">
                ยืนยัน
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddnewPopup;
