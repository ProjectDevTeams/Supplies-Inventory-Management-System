import React, { useState, useEffect } from "react";
import "./consumable-edit-popup.css";
import { API_URL } from "../../config";
import axios from "axios";


function ConsumableEditPopup({ onClose, item, refreshData }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category_id: "",
    unit: "",
    stock_type: "",
    min_quantity: 0,
    max_quantity: 0,
    price: 0,
    created_at: "",
    image: ""
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (item) {
      // ✅ fallback ป้องกัน uncontrolled input
      setFormData({
        ...item,
        name: item.name || "",
        category_id: item.category_id || "",
        unit: item.unit || "",
        stock_type: item.stock_type || "",
        min_quantity: item.min_quantity || 0,
        max_quantity: item.max_quantity || 0,
        price: item.price || 0,
        created_at: item.created_at || "",
        image: item.image || ""
      });
    }
  }, [item]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const selected = e.target.files[0] || null;
    setFile(selected);
    if (selected) {
      const base = formData.name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_") || "file";
      const time = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
      const ext = selected.name.split(".").pop();
      const filename = `${base}_${time}.${ext}`;
      const path = `materials/picture/${filename}`;
      setFormData((prev) => ({ ...prev, image: path }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
    payload.append("id", item.id);
    if (file) payload.append("image", file);

    try {
      const res = await fetch(`${API_URL}/materials/update_material.php`, {
        method: "POST",
        body: payload,
      });
      const result = await res.json();
      if (result.status === "success") {
        alert("อัปเดตสำเร็จ");
        refreshData?.(); // โหลดข้อมูลใหม่
        onClose();
      } else {
        alert("เกิดข้อผิดพลาด: " + result.message);
      }
    } catch (err) {
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
      console.error(err);
    }
  };


   const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/material_categories/get_material_categories.php`)
      .then((res) => {
        if (res.data.status === "success") {
          setCategories(res.data.data);
        }
      })
      .catch((err) => {
        console.error("โหลดหมวดหมู่ล้มเหลว:", err);
      });
  }, []);

  return (
    <div className="consumable-edit-popup-container">
      <div className="consumable-edit-popup-box">
        <div className="consumable-edit-popup-header">
          <span>แก้ไขรายการ</span>
          <button className="consumable-edit-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="consumable-edit-popup-body">
          <form onSubmit={handleSubmit}>
            <div className="consumable-edit-form-row">
              <label>ชื่อ</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="consumable-edit-form-row">
              <label>ประเภท</label>
              <select
                name="category_id"
                value={formData.category_id || ""}
                onChange={handleChange}
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="consumable-edit-form-row">
              <label>หน่วยนับ</label>
              <input
                list="units"
                name="unit"
                value={formData.unit || ""}
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

            <div className="consumable-edit-form-row">
              <label>คลังวัสดุ</label>
              <select
                name="stock_type"
                value={formData.stock_type || ""}
                onChange={handleChange}
                required
              >
                <option value="">เลือกคลังวัสดุ</option>
                <option value="วัสดุในคลัง">วัสดุในคลัง</option>
                <option value="วัสดุนอกคลัง">วัสดุนอกคลัง</option>
              </select>
            </div>

            <div className="consumable-edit-form-row">
              <label>ยอดต่ำสุด</label>
              <input
                type="number"
                name="min_quantity"
                value={formData.min_quantity ?? 0}
                onChange={handleChange}
              />
            </div>

            <div className="consumable-edit-form-row">
              <label>ยอดสูงสุด</label>
              <input
                type="number"
                name="max_quantity"
                value={formData.max_quantity ?? 0}
                onChange={handleChange}
              />
            </div>

            <div className="consumable-edit-form-row">
              <label>ราคา/หน่วย</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price ?? 0}
                onChange={handleChange}
              />
            </div>

            <div className="consumable-edit-form-row consumable-edit-file-upload">
              <label>แนบไฟล์ภาพ</label>
              <div className="upload-group">
                <small>ขนาดไฟล์สูงสุด 5MB</small>
                <input
                  type="file"
                  id="fileUpload"
                  className="consumable-edit-file-hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="consumable-edit-custom-file-btn">
                  เลือกไฟล์
                </label>
              </div>
            </div>

            <div className="consumable-edit-form-row">
              <label>วันที่สร้าง</label>
              <input
                type="date"
                name="created_at"
                value={formData.created_at || ""}
                onChange={handleChange}
              />
            </div>

            <div className="consumable-edit-form-footer">
              <button type="submit" className="consumable-edit-submit-btn">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConsumableEditPopup;
