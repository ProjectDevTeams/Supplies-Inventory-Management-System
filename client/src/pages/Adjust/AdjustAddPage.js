// File: src/pages/Adjust/AdjustAddPage.js
import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdjustAdd from "../../components/Adjust/Adjust-add";
import "./AdjustAddPage.css";

export default function AdjustAddPage() {
  const handleSave = (rows) => {
    console.log("Saved rows:", rows);
    window.history.back();
  };

  const handleCancel = () => window.history.back();

  return (
    <div className="adjust-add-page">
      <div className="adjust-add-navbar">
        <Navbar />
      </div>
      <div className="adjust-add-main">
        <div className="adjust-add-sidebar">
          <Sidebar />
        </div>
        <div className="adjust-add-content">
          <AdjustAdd onSave={handleSave} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
}
