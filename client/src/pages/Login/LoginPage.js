import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { API_URL } from '../../config'; 

function LoginPage() {
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

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/users/login.php`, formData);
      const data = res.data;

      if (data.status === "success") {
        const permission = data.permission;

        if (permission === "ผู้ใช้งาน") {
          navigate("/userstuff");
        } else if (permission === "แอดมิน" || permission === "ผู้ช่วยแอดมิน") {
          navigate("/HomePage");
        } else {
          alert("สิทธิการใช้งานไม่ถูกต้อง");
        }
      } else {
        alert(data.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
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

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter name"
                value={formData.username}
                onChange={handleChange}
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
              />
              <span className='login-eye-icon' onClick={() => setShowPassword(!showPassword)}>
                <img
                  className="login-eye-view"
                  src={showPassword ? "/image/eyeview.png" : "/image/eyehide.png"}
                />
              </span>
            </div>

            <div className="forgot-password">
              <Link to="/reset" className="forgot-password">ลืมรหัสผ่าน</Link>
            </div>

            <button type="button" className="login-button" onClick={handleLogin}>
              เข้าสู่ระบบ
            </button>

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

export default LoginPage;
