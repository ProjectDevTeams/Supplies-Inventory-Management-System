import React, { useState } from "react";
import "./addpeople-popup.css";
import axios from "axios";
import { API_URL } from "../../config";
import {
  ComponentIncompleteAlert,
  ComponentAddSuccessAlert
} from "../SweetAlert/ComponentSweetAlert";

function AddpeoplePopup({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    position: "",
    email: "",
    phone: "",
    permission: "",
    approval_status: "รออนุมัติ"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, full_name, position, email, permission } = formData;
    if (!username || !password || !full_name || !position || !email || !permission) {
      ComponentIncompleteAlert();
      return;
    }
    try {
      await axios.post(`${API_URL}/users/add_user.php`, formData);
      ComponentAddSuccessAlert();
      onAdd?.();
      onClose?.();
    } catch (error) {
      console.error("Error adding user:", error);
      ComponentIncompleteAlert();
    }
  };

  return (
    <div className="addpeople-popup-container">
      <div className="addpeople-popup-box">
        <div className="addpeople-popup-header blue">
          <span>เพิ่มเจ้าหน้าที่ใหม่</span>
          <button className="addpeople-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="addpeople-popup-body">
          <form onSubmit={handleSubmit}>
            <div className="addpeople-form-grid">
              <div className="addpeople-form-row">
                <label>username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="addpeople-form-row">
                <label>รหัสผ่าน</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="addpeople-form-row">
                <label>ชื่อ-สกุล</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
              </div>
              <div className="addpeople-form-row">
                <label>ตำแหน่งงาน</label>
                <input type="text" name="position" value={formData.position} onChange={handleChange} />
              </div>
              <div className="addpeople-form-row">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="addpeople-form-row">
                <label>โทรศัพท์</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="addpeople-form-row">
                <label>สิทธิการใช้งาน</label>
                <select name="permission" value={formData.permission} onChange={handleChange}>
                  <option value="">เลือกสิทธิการใช้งาน</option>
                  <option value="ผู้ใช้งาน">ผู้ใช้งาน</option>
                  <option value="แอดมิน">แอดมิน</option>
                  <option value="ผู้ช่วยแอดมิน">ผู้ช่วยแอดมิน</option>
                </select>
              </div>
            </div>
            <div className="addpeople-form-footer right">
              <button type="submit" className="addpeople-submit-btn green">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddpeoplePopup;
