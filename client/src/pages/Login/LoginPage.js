// File: src/components/Login/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { API_URL } from '../../config';
import {
  showLoginSuccess,
  showLoginError
} from '../../components/SweetAlert/LoginSweetAlert';

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
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/users/login.php`, formData);
      const data = res.data;

      if (data.status === "success") {
        const user = {
          id: data.id,
          username: data.username,
          full_name: data.full_name,
          permission: data.permission
        };
        localStorage.setItem("user", JSON.stringify(user));

        await showLoginSuccess();

        if (user.permission === "ผู้ใช้งาน") {
          navigate("/userstuff/stuff");
        } else if (user.permission === "แอดมิน" || user.permission === "ผู้ช่วยแอดมิน") {
          navigate("/Home");
        } else {
          await showLoginError("สิทธิการใช้งานไม่ถูกต้อง");
        }
      } else {
        await showLoginError(data.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      console.error("Login error:", err);
      await showLoginError("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="loginpage-body">
      <div className="loginpage-container">
        <div className="loginpage-left">
          <div className="loginpage-box">
            <img src="/image/logo.png" alt="Logo" className="loginpage-logo" />
            <h4 className="loginpage-subtitle">Welcome back!</h4>
            <h2 className="loginpage-title">กรุณาเข้าสู่ระบบ</h2>
            <form onSubmit={handleLogin}>
              <div className="loginpage-input-group">
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

              <div className="loginpage-input-group">
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
                  className="loginpage-eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    className="loginpage-eye-view"
                    src={showPassword ? "/image/eyeview.png" : "/image/eyehide.png"}
                    alt="Toggle password"
                  />
                </span>
              </div>

              <div className="loginpage-forgot-password">
                <Link to="/reset" className="loginpage-forgot-password">ลืมรหัสผ่าน</Link>
              </div>

              <button type="submit" className="loginpage-button">
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="loginpage-switch-page">
              ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
            </div>
          </div>
        </div>

        <div className="loginpage-right">
          <img src="/image/bg-login.jpg" alt="Background" />
        </div>
      </div>
    </div>
  );
}
