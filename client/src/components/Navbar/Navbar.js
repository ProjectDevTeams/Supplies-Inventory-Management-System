import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { LogOut } from "lucide-react";
import {
  confirmLogout,
  showLogoutSuccess,
} from "../SweetAlert/LogOutSweetAlert";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    const ok = await confirmLogout();
    if (!ok) return;

    localStorage.removeItem("user");
    await showLogoutSuccess();
    navigate("/login");
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-left">
        <a href="/">
          <img src="/image/Logo.png" alt="Logo" className="navbar-logo" />
        </a>
      </div>

      <div className="navbar-right">
        <img
          src="/image/user_profile.png"
          alt="Profile"
          className="navbar-profile-pic"
        />
        <span className="navbar-username">
          {user ? user.full_name : "Guest"}
        </span>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={20} />
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
