import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Stuffbar from "../../components/Stuff/Stuffbar";
import StuffTable from "../../components/Stuff/StuffTable"; // ของเดิม = รออนุมัติ
import StuffTableTrack from "../../components/Stuff/StuffTableTrack";
import StuffTablePurchase from "../../components/Stuff/StuffTablePurchase";
import './StuffPage.css';

function StuffPage() {
  const [activeTab, setActiveTab] = useState("wait");

  const renderTable = () => {
    switch (activeTab) {
      case "track":
        return <StuffTableTrack />;
      case "purchase":
        return <StuffTablePurchase />;
      default:
        return <StuffTable />; // "wait"
    }
  };

  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          {/* หัว + ปุ่ม + ค้นหา */}
          <Stuffbar setActiveTab={setActiveTab} activeTab={activeTab} />

          {/* ตาราง */}
          <section className="stuff-table-container">
            {renderTable()}
          </section>
        </main>
      </div>
    </div>
  );
}

export default StuffPage;
