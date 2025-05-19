import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Stuffbar from "../../components/Stuff/Stuffbar";
import StuffTablePurchase from "../../components/Stuff/StuffTablePurchase";
import './StuffPage.css';

export default function StuffPurchasePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          <Stuffbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <section className="stuff-table-container">
            <StuffTablePurchase searchTerm={searchTerm} />
          </section>
        </main>
      </div>
    </div>
  );
}
