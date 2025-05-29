import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import Swal from "sweetalert2";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    position: "",
    full_name: "",
    permission: "ผู้ใช้งาน",
    approval_status: "รออนุมัติ",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { username, full_name, email, password, phone, position } = formData;

    if (!username || !full_name || !email || !password || !phone || !position) {
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: "โปรดกรอกข้อมูลให้ครบทุกช่องก่อนสมัครสมาชิก",
        confirmButtonColor: "#2176bd",
      });
      return;
    }

    try {
      await axios.post(`${API_URL}/users/add_user.php`, formData);
      Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ",
        text: "โปรดรอการอนุมัติจากผู้ดูแลระบบ",
        confirmButtonColor: "#2176bd",
      });
    } catch (err) {
      console.error("Register error:", err);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="body-register">
      <div className="register-container">
        <div className="register-left">
          <div className="register-box">
            <img src="/image/logo.png" alt="Logo" className="logo" />
            <h2>สมัครสมาชิก</h2>

            {/* ✅ กล่อง input 2 คอลัมน์ */}
            <div className="input-columns">
              <div className="input-column">
                <div className="input-group">
                  <label>ชื่อผู้ใช้งาน</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="กรอกชื่อผู้ใช้งาน"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>ชื่อ-สกุล</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="กรอกชื่อ-สกุล"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>อีเมล</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="กรอกอีเมล"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-column">
                <div className="input-group">
                  <label>รหัสผ่าน</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="กรอกรหัสผ่าน"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>เบอร์โทรศัพท์</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="กรอกเบอร์โทรศัพท์"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>ตำแหน่งงาน</label>
                  <input
                    type="text"
                    name="position"
                    placeholder="กรอกตำแหน่งงาน"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button className="register-button" onClick={handleRegister}>
              สมัครสมาชิก
            </button>

            <div className="switch-page">
              มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
            </div>
          </div>
        </div>

        <div className="register-right">
          <img src="/image/bg-login.jpg" alt="Background" />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
