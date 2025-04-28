import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import './ReportPage.css';

function ReportPage() {
  return (
    <div className="report-navbar">
      <Navbar />
      <div className="report-sidebar">
        <Sidebar />
        <main className="report-content">
          <section className="report-header">
            <h2>รายงาน</h2>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ReportPage;
