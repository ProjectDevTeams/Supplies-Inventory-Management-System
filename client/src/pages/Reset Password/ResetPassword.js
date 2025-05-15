import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';
import { API_URL } from '../../config'; 

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async () => {
    if (!username || !newPassword) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/update_user.php`, {
        username,
        password: newPassword
      });

      if (response.data.status === "success") {
        alert("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
      } else {
        alert(response.data.message || "ไม่สามารถเปลี่ยนรหัสผ่านได้");
      }
    } catch (error) {
      console.error("Reset error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-box">
            <img src="/image/logo.png" alt="Logo" className="logo" />
            <h3 className="login-title">เปลี่ยนรหัสผ่าน</h3>
            <p className="login-subtitle">กรุณากรอกรหัสผ่านใหม่ของคุณ</p>

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>New Password</label>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                <img
                  className="eye-view"
                  src={showConfirm ? "/image/eyeview.png" : "/image/eyehide.png"}
                />
              </span>
            </div>

            <button className="login-button" onClick={handleReset}>Reset</button>
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
