import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Humanbar from '../../components/Human/Humanbar';
import HumanTable from '../../components/Human/HumanTable';

import './HumanPage.css';

function HumanPage() {
  const [searchTerm, setSearchTerm] = useState(""); // เก็บข้อความค้นหา

  return (
    <div className="human-navbar">
      <Navbar />
      <div className="human-sidebar">
        <Sidebar />
        <main className="human-content">
          <section className="content-header">
            {/* ส่ง props searchTerm และ setSearchTerm ไปยัง Humanbar */}
            <Humanbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* ส่ง props searchTerm ไปยัง HumanTable */}
            <HumanTable searchTerm={searchTerm} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default HumanPage;
