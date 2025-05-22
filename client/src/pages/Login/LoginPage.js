// File: src/components/Login/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { API_URL } from '../../config';
import {
  showLoginSuccess,
  showLoginError
} from '../../components/SweetAlert/LoginSweetAlert'; // ปรับ path ให้ตรงกับโครงสร้างโปรเจกต์

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();  // ป้องกันการรีเฟรชหน้า
    try {
      const res = await axios.post(`${API_URL}/users/login.php`, formData);
      const data = res.data;

      if (data.status === "success") {
        // เก็บข้อมูล user ลง localStorage
        const user = {
          id: data.id,
          username: data.username,
          full_name: data.full_name,
          permission: data.permission
        };
        localStorage.setItem("user", JSON.stringify(user));

        // แจ้งเตือนสำเร็จ และรอผู้ใช้กดปุ่มก่อนนำทาง
        await showLoginSuccess();

        // นำทางตามสิทธิ์
        if (user.permission === "ผู้ใช้งาน") {
          navigate("/userstuff/stuff");
        } else if (user.permission === "แอดมิน" || user.permission === "ผู้ช่วยแอดมิน") {
          navigate("/HomePage");
        } else {
          // ถ้าสิทธิ์ไม่ตรงคาด
          await showLoginError("สิทธิการใช้งานไม่ถูกต้อง");
        }
      } else {
        // กรณี login ล้มเหลว (เช่น username/password ไม่ถูกต้อง)
        await showLoginError(data.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      console.error("Login error:", err);
      // กรณีติดต่อเซิร์ฟเวอร์ไม่ได้
      await showLoginError("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-box">
            <img src="/image/logo.png" alt="Logo" className="logo" />
            <h4>Welcome back!</h4>
            <h2>กรุณาเข้าสู่ระบบ</h2>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="login-eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    className="login-eye-view"
                    src={showPassword ? "/image/eyeview.png" : "/image/eyehide.png"}
                    alt="Toggle password"
                  />
                </span>
              </div>

              <div className="forgot-password">
                <Link to="/reset" className="forgot-password">ลืมรหัสผ่าน</Link>
              </div>

              <button type="submit" className="login-button">
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="switch-page">
              ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
            </div>
          </div>
        </div>

        <div className="login-right">
          <img src="/image/bg-login.jpg" alt="Background" />
        </div>
      </div>
    </div>
  );
}
