import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./consumable-addnew-popup.css";

function ConsumableAddnewPopup({ onClose, onAdd }) {
  // ⬇️ สถานะของข้อมูลฟอร์ม
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
    image: "",
  });

  const [file, setFile] = useState(null); // ⬅️ เก็บไฟล์รูปภาพ

  // ⬇️ อัปเดตค่าฟอร์มเมื่อมีการเปลี่ยน input
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const selected = e.target.files[0] || null;
    setFile(selected);

    if (selected) {
      const base = "material";
      const time = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
      const ext = selected.name.split(".").pop();
      const filename = `${base}_${time}.${ext}`;
      const path = `materials/picture/${filename}`;

      setFormData((prev) => ({ ...prev, image: path }));
    } else {
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  // ⬇️ เมื่อกด "ยืนยัน" เพื่อส่งข้อมูลไป backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.entries(formData).forEach(([k, v]) => body.append(k, v));
    if (file) body.append("image", file);

    try {
      const res = await axios.post(`${API_URL}/materials/add_material.php`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === "success") {
        onAdd?.(res.data.data); // 🔁 แจ้งให้รีโหลดข้อมูล
        onClose();              // ❌ ปิด popup
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    }
  };

  // ⬇️ โหลดหมวดหมู่วัสดุจาก backend
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
    <div className="consumable-addnew-popup-container">
      <div className="consumable-addnew-popup-box">
        <div className="consumable-addnew-popup-header">
          <span>เพิ่มรายการใหม่</span>
          <button className="consumable-addnew-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="consumable-addnew-popup-body">
          <form onSubmit={handleSubmit}>
            {/* ฟิลด์ชื่อวัสดุ */}
            <div className="consumable-addnew-form-row">
              <label>ชื่อ</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            {/* ฟิลด์เลือกหมวดหมู่ */}
            <div className="consumable-addnew-form-row">
              <label>ประเภท</label>
              <select name="category_id" value={formData.category_id} onChange={handleChange} required>
                <option value="">เลือกประเภท</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* หน่วยนับ */}
            <div className="consumable-addnew-form-row">
              <label>หน่วยนับ</label>
              <input list="units" name="unit" value={formData.unit} onChange={handleChange} required />
            </div>

            {/* เลือกประเภทคลัง */}
            <div className="consumable-addnew-form-row">
              <label>คลังวัสดุ</label>
              <select name="stock_type" value={formData.stock_type} onChange={handleChange} required>
                <option value="">เลือกคลังวัสดุ</option>
                <option value="วัสดุในคลัง">วัสดุในคลัง</option>
                <option value="วัสดุนอกคลัง">วัสดุนอกคลัง</option>
              </select>
            </div>

            {/* จำนวนต่าง ๆ */}
            <div className="consumable-addnew-form-row"><label>ยอดยกมา</label><input type="number" name="carry_over_quantity" value={formData.carry_over_quantity} onChange={handleChange} /></div>
            <div className="consumable-addnew-form-row"><label>ยอดต่ำสุด</label><input type="number" name="min_quantity" value={formData.min_quantity} onChange={handleChange} /></div>
            <div className="consumable-addnew-form-row"><label>ยอดสูงสุด</label><input type="number" name="max_quantity" value={formData.max_quantity} onChange={handleChange} /></div>
            <div className="consumable-addnew-form-row"><label>ราคา/หน่วย</label><input type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} /></div>

            {/* แนบไฟล์ภาพ */}
            <div className="consumable-addnew-form-row consumable-addnew-file-upload">
              <label>แนบไฟล์ภาพ</label>
              <div className="upload-group">
                <small>ขนาดไฟล์สูงสุด 5MB</small>
                <input type="file" id="fileUpload" className="consumable-addnew-file-hidden" accept="image/*" onChange={handleFileChange} />
                <label htmlFor="fileUpload" className="consumable-addnew-custom-file-btn">เลือกไฟล์</label>
              </div>
            </div>

            {/* วันที่สร้าง */}
            <div className="consumable-addnew-form-row">
              <label>วันที่สร้าง</label>
              <input type="date" name="created_at" value={formData.created_at} onChange={handleChange} />
            </div>

            {/* ปุ่มส่ง */}
            <div className="consumable-addnew-form-footer">
              <button type="submit" className="consumable-addnew-submit-btn">ยืนยัน</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConsumableAddnewPopup;
