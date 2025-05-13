import React, { useState } from "react";
import "./addpeople-popup.css";
import axios from "axios";
import { API_URL } from "../../config";

function AddpeoplePopup({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    position: "",
    email: "",
    phone: "",
    permission_id: "", // สมมติว่าเลือกสิทธิเป็น ID
    approval_status: "รออนุมัติ"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/users/add_user.php`, formData);
      onClose(); // ปิด popup หลังเพิ่มเสร็จ
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="his-popup-container">
      <div className="his-popup-box">
        <div className="his-popup-header blue">
          <span>เพิ่มเจ้าหน้าที่ใหม่</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="popup-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-row">
                <label>username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>รหัสผ่าน</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>ชื่อ-สกุล</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
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
                <select name="permission_id" value={formData.permission_id} onChange={handleChange}>
                  <option value="">เลือกสิทธิการใช้งาน</option>
                  <option value="1">STI</option>
                  <option value="2">แอดมิน ฝ่าย STI</option>
                  <option value="3">ประชาสัมพันธ์และสื่อสารองค์กร</option>
                  <option value="4">ฝ่ายยุทธศาสตร์และแผน</option>
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
