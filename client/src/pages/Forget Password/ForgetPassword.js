import React from 'react';
import './ForgetPassword.css';

function ForgetPassword() {
  return (
    <div className="forget-password-container">
      <div className="forget-left">
  <img src="/image/logo.png" alt="Logo" className="forget-logo" />
  
  <h3 className="forget-title">คุณลืมรหัสผ่านใช่ไหม?</h3>
  <p className="forget-description">
    กรุณากรอกที่อยู่อีเมลที่เชื่อมโยงกับบัญชีนี้<br />
    และเราจะส่งรหัสให้คุณเพื่อเปลี่ยนรหัสผ่านของคุณ
  </p>

  <div className="forget-input-group">
    <label>Email</label>
    <input type="email" placeholder="Enter email address" />
  </div>

  <button type='button' className="forget-submit-button">ส่ง</button>
</div>

      <div className="forget-right">
        <img src="/image/bg-login.jpg" alt="Background" />
      </div>
    </div>
  );
}

export default ForgetPassword;
