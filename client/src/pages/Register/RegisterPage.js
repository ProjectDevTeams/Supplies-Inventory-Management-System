import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  return (
    <div className="body-register">
      <div className="register-container">
        <div className="register-left">
          <div className="register-box">
            <img src="/image/logo.png" alt="Logo" className="logo" />
            <h4>Welcome!</h4>
            <h2>สมัครสมาชิก</h2>

            <div className="input-group">
              <label>ชื่อผู้ใช้งาน</label>
              <input type="text" placeholder="กรอกชื่อผู้ใช้งาน" />
            </div>

            <div className="input-group">
              <label>อีเมล</label>
              <input type="email" placeholder="กรอกอีเมล" />
            </div>

            <div className="input-group">
              <label>รหัสผ่าน</label>
              <input type="password" placeholder="กรอกรหัสผ่าน" />
            </div>

            <div className="input-group">
              <label>ยืนยันรหัสผ่าน</label>
              <input type="password" placeholder="ยืนยันรหัสผ่าน" />
            </div>

            <button className="register-button">สมัครสมาชิก</button>

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
