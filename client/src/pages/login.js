import React from 'react';
import './login.css';

function Login() {
  return (
    <body className="body-login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-box">
            <img src="/image/logo.png" alt="Logo" className="logo" />
            <h4>Welcome back!</h4>
            <h2>กรุณาเข้าสู่ระบบ</h2>

            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="Enter name"  />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password"  />
            </div>

            <div className="forgot-password">ลืมรหัสผ่าน</div>

            <button className="login-button">เข้าสู่ระบบ</button>
          </div>
        </div>

        <div className="login-right">
          <img src="/image/bg-login.jpg" alt="Background" />
        </div>
      </div>
    </body>
  );
}

export default Login;
