import React, { useState } from "react";
import axios from "axios";
import "./addpeople-popup.css";

function AddpeoplePopup({ onClose, onAddSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    position: "",
    email: "",
    phone: "",
    permission: "user",
    department_id: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("📦 กำลังส่งข้อมูล:", formData);

    axios.post("http://localhost/backend/users/create_user.php", formData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log("✅ RESPONSE:", res.data);
      if (res.data.success) {
        alert("เพิ่มผู้ใช้งานสำเร็จ");
        onAddSuccess && onAddSuccess();
        onClose();
      } else {
        alert("ไม่สามารถเพิ่มผู้ใช้งานได้: " + res.data.message);
      }
    })
    .catch(err => {
      console.error("❌ ERROR:", err);
      console.log("🔍 ERROR RESPONSE:", err.response?.data);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    });
  };

  return (
    <div className="popup-container">
      <div className="popup-box">
        <div className="popup-header blue">
          <span>เพิ่มเจ้าหน้าที่ใหม่</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="popup-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-row">
                <label>username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label>รหัสผ่าน</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label>ชื่อ-สกุล</label>
                <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label>ตำแหน่งงาน</label>
                <input type="text" name="position" value={formData.position} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>โทรศัพท์</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>สิทธิการใช้งาน</label>
                <select name="permission" value={formData.permission} onChange={handleChange}>
                  <option value="admin">แอดมิน</option>
                  <option value="user">ผู้ใช้งานทั่วไป</option>
                </select>
              </div>
            </div>
            <div className="form-footer right">
              <button type="submit" className="submit-btn green">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddpeoplePopup;