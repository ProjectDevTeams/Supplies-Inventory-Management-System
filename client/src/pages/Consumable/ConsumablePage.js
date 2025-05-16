import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Consumable_Table from '../../components/Consumable/Consumable-table';
import './ConsumablePage.css';

function ConsumablePage() {
  const [searchTerm, setSearchTerm] = useState(""); // เก็บข้อความค้นหา
  
  return (
    <div className="consumable-navbar">
      <Navbar />
      <div className="consumable-sidebar">
        <Sidebar />
        <main className="consumable-content">
          <section className="consumable-content-header">
            <Consumable_Table searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </section>
        </main>
      </div>
    </div>

  
  );
}

export default ConsumablePage;