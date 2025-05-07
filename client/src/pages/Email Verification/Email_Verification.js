import React, { useState, useRef } from 'react';
import './Email_Verification.css';

function EmailVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // focus next
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  return (
    <div className="verification-password-container">
      <div className="verification-left">
        <img src="/image/logo.png" alt="Logo" className="verification-logo" />

        <h3 className="verification-title">
          <span style={{ fontWeight: 'normal' }}>กู้คืนรหัสผ่าน</span><br />
          <strong>Email verification</strong>
        </h3>
        <p className="verification-description">
          กรุณากรอกโค้ด 6 หลักที่ส่งไปยังที่อยู่อีเมลของคุณ
        </p>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              className="otp-box"
            />
          ))}
        </div>

        <button type="button" className="verification-submit-button">ส่ง</button>
      </div>

      <div className="verification-right">
        <img src="/image/bg-login.jpg" alt="Background" />
      </div>
    </div>
  );
}

export default EmailVerification;
