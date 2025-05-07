import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Adjustbar from "../../components/Adjust/Adjustbar";
import AdjustTable from '../../components/Adjust/Adjust-table';
import './AdjustPage.css';

function AdjustPage() {
  const [searchTerm, setSearchTerm] = useState(""); // เก็บข้อความค้นหา
  
  return (
    <div className="adjust-navbar">
      <Navbar />
      <div className="adjust-sidebar">
        <Sidebar />
        <main className="adjust-content">
          <section>
          <Adjustbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </section>
          <section>
          <AdjustTable searchTerm={searchTerm} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdjustPage;
