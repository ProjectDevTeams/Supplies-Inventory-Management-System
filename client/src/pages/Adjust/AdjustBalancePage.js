// src/pages/Adjust/AdjustBalancePage.js
import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Balance from "../../components/Adjust/Adjust-Balance";
import "./AdjustBalancePage.css";

export default function AdjustBalancePage() {
  return (
    <div className="adjust-balance-page">
      <div className="adjust-balance-navbar">
        <Navbar />
        <div className="adjust-balance-sidebar">
          <div className="adjust-balance-sidebar-container">
            <Sidebar />
          </div>
          <div className="adjust-balance-content">
            <Balance />
          </div>
        </div>
      </div>
    </div>
  );
}
