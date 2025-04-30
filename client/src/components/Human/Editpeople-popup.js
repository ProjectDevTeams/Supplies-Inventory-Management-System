import React, { useState, useEffect } from "react";
import "./Editpeople-popup.css";

function EditpeoplePopup({ person, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    fullname: '',
    group: '',
    email: '',
    phone: '',
    role: '',
    status: '',
  });

  // ใช้ useEffect เพื่อปรับค่า formData เมื่อมีการส่งข้อมูล person เข้ามา
  useEffect(() => {
    if (person) {
      // คัดลอกทุกฟิลด์จาก person มาที่ formData
      setFormData({
        ...person,
        phone: person.phone || '',
        role: person.role || '',
      });
    }
  }, [person]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ส่งข้อมูลที่ถูกแก้ไขกลับไปที่ HumanTable.js
    onSave({
      ...formData,
      // เพิ่ม id ให้เหมือนเดิมเพื่อให้การอัปเดตข้อมูลถูกต้อง
      id: person.id
    });
    onClose();  // ปิด Popup หลังจากบันทึกข้อมูล
  };

  return (
    <div className="his-popup-container">
      <div className="his-popup-box">
        <div className="his-popup-header blue">
          <span>แก้ไขข้อมูลบุคลากร</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="his-popup-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-row">
                <label>username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>รหัสผ่าน</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>ชื่อ-สกุล</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>ตำแหน่งงาน</label>
                <input
                  type="text"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>โทรศัพท์</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>สิทธิการใช้งาน</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">เลือกสิทธิการใช้งาน</option>
                  <option value="admin">แอดมิน</option>
                  <option value="user">ผู้ใช้งานทั่วไป</option>
                </select>
              </div>
              <div className="form-row">
                <label>สถานะ</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="อนุมัติ">อนุมัติ</option>
                  <option value="รออนุมัติ">รออนุมัติ</option>
                  <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                </select>
              </div>
            </div>
            <div className="form-footer space-between">
              <button type="button" className="cancel-btn red" onClick={onClose}>ลบ</button>
              <button type="submit" className="submit-btn green">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditpeoplePopup;