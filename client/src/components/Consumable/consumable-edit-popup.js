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

  // โหลดข้อมูล item มาแสดงในฟอร์ม
  useEffect(() => {
    if (item) {
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

  // อัพเดตค่าฟอร์มเมื่อแก้ไข input
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // เมื่อเลือกไฟล์รูปภาพ
  const handleFileChange = (e) => {
    const selected = e.target.files[0] || null;
    setFile(selected);
    if (selected) {
      // สร้างชื่อไฟล์แบบปลอดภัยจากชื่อวัสดุ หรือ fallback เป็น "material"
      const base =
        (formData.name &&
          formData.name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_")) ||
        "material";
      const time = new Date()
        .toISOString()
        .replace(/[-:.TZ]/g, "")
        .slice(0, 14);
      const ext = selected.name.split(".").pop();
      const filename = `${base}_${time}.${ext}`;
      const path = `materials/picture/${filename}`;
      setFormData((prev) => ({ ...prev, image: path }));
    }
  };

  // เมื่อกดบันทึก ส่งข้อมูลไป API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item?.id) {
      alert("ไม่พบข้อมูลไอดีวัสดุ");
      return;
    }

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
        refreshData?.(); // โหลดข้อมูลใหม่หลังบันทึก
        onClose();
        setFile(null); // เคลียร์ไฟล์หลังบันทึกสำเร็จ
      } else {
        alert("เกิดข้อผิดพลาด: " + result.message);
      }
    } catch (err) {
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
      console.error(err);
    }
  };

  // โหลดหมวดหมู่วัสดุจาก backend
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
            {/* ชื่อวัสดุ */}
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

            {/* หมวดหมู่ */}
            <div className="consumable-edit-form-row">
              <label>ประเภท</label>
              <select
                name="category_id"
                value={formData.category_id ?? ""}
                onChange={handleChange}
                required
              >
                <option value="">เลือกประเภท</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* หน่วยนับ */}
            <div className="consumable-edit-form-row">
              <label>หน่วยนับ</label>
              <input
                list="units"
                name="unit"
                value={formData.unit || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* คลังวัสดุ */}
            <div className="consumable-edit-form-row">
              <label>คลังวัสดุ</label>
              <select
                name="stock_type"
                value={formData.stock_type ?? ""}
                onChange={handleChange}
                required
              >
                <option value="">เลือกคลังวัสดุ</option>
                <option value="วัสดุในคลัง">วัสดุในคลัง</option>
                <option value="วัสดุนอกคลัง">วัสดุนอกคลัง</option>
              </select>
            </div>

            {/* ยอดต่ำสุด */}
            <div className="consumable-edit-form-row">
              <label>ยอดต่ำสุด</label>
              <input
                type="number"
                name="min_quantity"
                value={formData.min_quantity ?? 0}
                onChange={handleChange}
              />
            </div>

            {/* ยอดสูงสุด */}
            <div className="consumable-edit-form-row">
              <label>ยอดสูงสุด</label>
              <input
                type="number"
                name="max_quantity"
                value={formData.max_quantity ?? 0}
                onChange={handleChange}
              />
            </div>

            {/* ราคา/หน่วย */}
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

            {/* แนบไฟล์ภาพ */}
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

            {/* วันที่สร้าง */}
            <div className="consumable-edit-form-row">
              <label>วันที่สร้าง</label>
              <input
                type="date"
                name="created_at"
                value={formData.created_at || ""}
                onChange={handleChange}
              />
            </div>

            {/* ปุ่มบันทึก */}
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
