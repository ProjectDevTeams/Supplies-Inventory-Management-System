import { useState, useEffect } from "react";
import "./consumable-edit-popup.css";
import { API_URL } from "../../config";
import axios from "axios";
import { ComponentUpdateSuccessAlert } from "../SweetAlert/ComponentSweetAlert";

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
    if (item?.id) {
      axios
        .get(`${API_URL}/materials/update_material.php?id=${item.id}`)
        .then(res => {
          const d = res.data.data;
          const datePart = d.created_at.split(" ")[0];
          setFormData({
            id: d.id,
            name: d.name,
            category_id: d.category_id,
            unit: d.unit,
            stock_type: d.stock_type,
            min_quantity: d.min_quantity,
            max_quantity: d.max_quantity,
            price: d.price,
            created_at: datePart === "0000-00-00" ? "" : datePart,
            image: d.image
          });
        })
        .catch(err => console.error(err));
    }
  }, [item]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const uploadImage = async () => {
    if (!file) return formData.image;
    const fd = new FormData();
    fd.append("image", file);
    const res = await axios.post(
      `${API_URL}/materials/upload_image.php`,
      fd,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (res.data.status !== "success") throw new Error();
    return res.data.path;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.id) return;
    try {
      const imagePath = await uploadImage();
      const payload = { ...formData, image: imagePath };
      const res = await axios.put(
        `${API_URL}/materials/update_material.php`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.status === "success") {
        refreshData?.();
        onClose();
        setFile(null);
        ComponentUpdateSuccessAlert();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/material_categories/get_material_categories.php`)
      .then(r => {
        if (r.data.status === "success") setCategories(r.data.data);
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
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="consumable-edit-form-row">
              <label>ประเภท</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">เลือกประเภท</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="consumable-edit-form-row">
              <label>หน่วยนับ</label>
              <input
                list="units"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
              />
            </div>
            <div className="consumable-edit-form-row">
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
            <div className="consumable-edit-form-row">
              <label>ยอดต่ำสุด</label>
              <input
                type="number"
                name="min_quantity"
                value={formData.min_quantity}
                onChange={handleChange}
              />
            </div>
            <div className="consumable-edit-form-row">
              <label>ยอดสูงสุด</label>
              <input
                type="number"
                name="max_quantity"
                value={formData.max_quantity}
                onChange={handleChange}
              />
            </div>
            <div className="consumable-edit-form-row">
              <label>ราคา/หน่วย</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
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
                  onChange={e => setFile(e.target.files[0] || null)}
                />
                <label htmlFor="fileUpload" className="consumable-edit-custom-file-btn">
                  {file ? "เปลี่ยนไฟล์" : "เลือกไฟล์"}
                </label>
              </div>
            </div>
            <div className="consumable-edit-form-row">
              <label>วันที่สร้าง</label>
              <input
                type="date"
                name="created_at"
                value={formData.created_at}
                onChange={handleChange}
              />
            </div>
            <div className="consumable-edit-form-footer">
              <button type="submit" className="consumable-edit-submit-btn">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConsumableEditPopup;
