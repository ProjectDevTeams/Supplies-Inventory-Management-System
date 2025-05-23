import React, { useState, useEffect } from "react";
import "./Editpeople-popup.css";
import axios from "axios";
import { API_URL } from "../../config";
import {
  ComponentConfirmDeleteAlert,
  ComponentDeleteSuccessAlert,
  ComponentUpdateSuccessAlert
} from "../SweetAlert/ComponentSweetAlert";

function EditpeoplePopup({ person, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    full_name: "",
    position: "",
    email: "",
    phone: "",
    permission: "",
    approval_status: ""
  });

  useEffect(() => {
    if (person) {
      setFormData({
        ...person,
        phone: person.phone || "",
        permission: person.permission || "",
        approval_status: person.approval_status || ""
      });
    }
  }, [person]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/users/update_user.php`, formData);
      if (res.data.status === "success") {
        ComponentUpdateSuccessAlert();
        onSave?.();
        onClose?.();
      }
    } catch {
      // silently ignore
    }
  };

  const handleDelete = async () => {
    const result = await ComponentConfirmDeleteAlert();
    if (!result.isConfirmed) return;
    try {
      const res = await axios.post(`${API_URL}/users/delete_user.php`, { id: formData.id });
      if (res.data.status === "success") {
        ComponentDeleteSuccessAlert();
        onSave?.();
      }
    } catch {
      // silently ignore
    }
    onClose?.();
  };

  return (
    <div className="editpeople-popup-container">
      <div className="editpeople-popup-box">
        <div className="editpeople-popup-header blue">
          <span>แก้ไขข้อมูลบุคลากร</span>
          <button className="editpeople-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="editpeople-popup-body">
          <form onSubmit={handleSubmit}>
            <div className="editpeople-form-grid">
              <div className="editpeople-form-row">
                <label>username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="editpeople-form-row">
                <label>ชื่อ-สกุล</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className="editpeople-form-row">
                <label>ตำแหน่งงาน</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div className="editpeople-form-row">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="editpeople-form-row">
                <label>โทรศัพท์</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="editpeople-form-row">
                <label>สิทธิการใช้งาน</label>
                <select
                  name="permission"
                  value={formData.permission}
                  onChange={handleChange}
                >
                  <option value="">เลือกสิทธิการใช้งาน</option>
                  <option value="ผู้ใช้งาน">ผู้ใช้งาน</option>
                  <option value="แอดมิน">แอดมิน</option>
                  <option value="ผู้ช่วยแอดมิน">ผู้ช่วยแอดมิน</option>
                </select>
              </div>
              <div className="editpeople-form-row">
                <label>สถานะ</label>
                <select
                  name="approval_status"
                  value={formData.approval_status}
                  onChange={handleChange}
                >
                  <option value="อนุมัติ">อนุมัติ</option>
                  <option value="รออนุมัติ">รออนุมัติ</option>
                  <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                </select>
              </div>
            </div>
            <div className="editpeople-form-footer space-between">
              <button
                type="button"
                className="editpeople-cancel-btn red"
                onClick={handleDelete}
              >
                ลบ
              </button>
              <button type="submit" className="editpeople-submit-btn green">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditpeoplePopup;
