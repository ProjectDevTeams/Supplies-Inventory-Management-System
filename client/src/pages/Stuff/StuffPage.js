import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Stuffbar from "../../components/Stuff/Stuffbar";
import StuffTable from "../../components/Stuff/StuffTable";
import StuffTableTrack from "../../components/Stuff/StuffTableTrack";
import StuffTablePurchase from "../../components/Stuff/StuffTablePurchase";
import './StuffPage.css';

function StuffPage() {
  const [activeTab, setActiveTab] = useState("wait");
  const [searchTerm, setSearchTerm] = useState("");

  const renderTable = () => {
    switch (activeTab) {
      case "track":
        return <StuffTableTrack searchTerm={searchTerm} />;
      case "purchase":
        return <StuffTablePurchase searchTerm={searchTerm} />;
      default:
        return <StuffTable searchTerm={searchTerm} />;
    }
  };

  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          <Stuffbar
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <section className="stuff-table-container">
            {renderTable()}
          </section>
        </main>
      </div>
    </div>
  );
}

export default StuffPage;
