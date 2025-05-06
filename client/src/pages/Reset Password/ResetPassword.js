import React, { useState } from 'react';
import './ResetPassword.css'; // ใช้ CSS ที่อยู่ด้านบน

function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="body-login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-box">
            <img src="/image/logo.png" alt="Logo" className="logo" />

            <h3 className="login-title">เปลี่ยนรหัสผ่าน</h3>
            <p className="login-subtitle">กรุณากรอกรหัสผ่านใหม่ของคุณ</p>

            <div className="input-group">
              <label>รหัสผ่านใหม่</label>
              <input type={showPassword ? 'text' : 'password'} />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >

                {/* function ลูกตาเปิด / ปิด ดูรหัส */}
                <img className="eye-view" src={showPassword ? "/image/eyeview.png" : "/image/eyehide.png" } />
              </span>
            </div>

            <div className="input-group">
              <label>ยืนยันรหัสผ่านใหม่</label>
              <input type={showConfirm ? 'text' : 'password'} />
              <span
                className="eye-icon"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                 {/* function ลูกตาเปิด / ปิด ดูรหัส */}
                <img className="eye-view" src= {showConfirm ? "/image/eyeview.png" : "/image/eyehide.png"} />
              </span>
            </div>

            <button className="login-button" >Reset</button>
          </div>
        </div>

        <div className="login-right">
          <img src="/image/bg-login.jpg" alt="Background" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
