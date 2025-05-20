// File: src/components/Navbar/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import { confirmLogout, showLogoutSuccess } from '../SweetAlert/LogOutSweetAlert';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    // ขอให้ผู้ใช้ยืนยันก่อน
    const ok = await confirmLogout();
    if (!ok) return; // ถ้าเลือกยกเลิก ก็ไม่ทำอะไรต่อ

    // ลบข้อมูลผู้ใช้
    localStorage.removeItem("user");

    // แจ้งเตือนออกจากระบบสำเร็จ
    await showLogoutSuccess();

    // นำทางไปหน้า login
    navigate("/login");
  };

  return (
    <nav>
      <section id="title">
        <ul>
          <li>
            <a href="/">
              <img src="/image/Logo.png" alt="Logo" />
            </a>
          </li>
        </ul>
      </section>

      <section id="account">
        <ul>
          <li>
            <a href="/">
              <img src="/image/user_profile.png" alt="Profile" />
            </a>
          </li>
          <li>
            <strong>{user ? user.full_name : "Guest"}</strong>
          </li>
          <li>
            <button
              onClick={handleLogout}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <img src="/image/exit.png" alt="Logout icon" />
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;
