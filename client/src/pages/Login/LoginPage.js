import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);


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
              <input type="text" placeholder="Enter name" />
            </div>

            <div className="input-group">
              <label>Password</label>
              {/* function ลูกตาเปิด / ปิด ดูรหัส */}
              <input type= {showPassword ? "text" : "password"} placeholder="Enter password" />
              <span className='login-eye-icon' onClick={() => setShowPassword(!showPassword)}>
                <img className="login-eye-view" src={showPassword ? "/image/eyeview.png" : "/image/eyehide.png"}/>
              </span>
            </div>

            <div className="forgot-password">
              <Link to="/forget" className="forgot-password">ลืมรหัสผ่าน</Link>
            </div>

            <button className="login-button">เข้าสู่ระบบ</button>

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
