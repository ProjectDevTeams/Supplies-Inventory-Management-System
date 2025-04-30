import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Editpeople-popup.css";

function EditpeoplePopup({ person, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    fullname: "",
    position: "",
    email: "",
    phone: "",
    role: "user",
    status: "",
    department_id: 1
  });

  useEffect(() => {
    if (person) {
      setFormData({
        ...person,
        role: person.role || "user",
        status: person.status || "อนุมัติ",
        position: person.group || "",
        department_id: person.department_id || 1
      });
    }
  }, [person]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      permission: formData.role
    };

    console.log("📤 กำลังส่งข้อมูลอัปเดต:", payload);

    axios
      .post("http://localhost/backend/users/update_user.php", payload, {
        headers: { "Content-Type": "application/json" }
      })
      .then((res) => {
        if (res.data.success) {
          alert("อัปเดตข้อมูลสำเร็จ");
          onSave && onSave(payload);
          onClose();
        } else {
          alert("อัปเดตไม่สำเร็จ: " + res.data.message);
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
      });
  };

  const handleDelete = () => {
    if (window.confirm("คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่?")) {
      axios
        .post(
          "http://localhost/backend/users/delete_user.php",
          { id: formData.id },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          if (res.data.success) {
            alert("ลบผู้ใช้งานเรียบร้อยแล้ว");
            onSave && onSave();
            onClose();
          } else {
            alert("ลบไม่สำเร็จ: " + res.data.message);
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
        });
    }
  };

  return (
    <div className="his-popup-container">
      <div className="his-popup-box">
        <div className="his-popup-header blue">
          <span>แก้ไขข้อมูลบุคลากร</span>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="his-popup-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-row">
                <label>username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>ชื่อ-สกุล</label>
                <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
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
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="admin">แอดมิน</option>
                  <option value="user">ผู้ใช้งานทั่วไป</option>
                </select>
              </div>
              <div className="form-row">
                <label>สถานะ</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="อนุมัติ">อนุมัติ</option>
                  <option value="รออนุมัติ">รออนุมัติ</option>
                  <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                </select>
              </div>
            </div>
            <div className="form-footer space-between">
              <button type="button" className="cancel-btn red" onClick={handleDelete}>
                ลบ
              </button>
              <button type="submit" className="submit-btn green">
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