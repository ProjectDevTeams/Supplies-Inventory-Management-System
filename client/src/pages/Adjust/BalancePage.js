import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Balance from "../../components/Adjust/Balance/Balance";
import "./BalancePage.css";

function BalancePage() {
  return (
    <div className="balance-page">
      <div className="adjust-navbar">
        <Navbar />
        <div className="adjust-sidebar">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="balance-content">
            <Balance />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalancePage;
