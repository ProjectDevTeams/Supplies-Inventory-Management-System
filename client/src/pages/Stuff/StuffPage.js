import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Stuffbar from '../../components/Stuff/Stuffbar';
import StuffTable from '../../components/Stuff/StuffTable'; 
import './StuffPage.css';

function StuffPage() {
  return (
    <div className="stuff-navbar">
      <Navbar />
      
      <div className="stuff-sidebar">
        <Sidebar />
        
        <main className="stuff-content">
          
          {/* ส่วนหัว (bar) */}
          <section className="content-header">
            <Stuffbar />
          </section>
          
          {/* ตารางแสดงข้อมูล */}
          <section className="stuff-table-container">
            <StuffTable />
          </section>

        </main>
      </div>
    </div>
  );
}

export default StuffPage;
