import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import './ReportPage.css';
import ReportContent from '../../components/Report/Report-Content';

function ReportPage() {
  return (
    <div className="report-navbar">
      <Navbar />
      <div className="report-sidebar">
        <Sidebar />
        <main className="report-content">
            <ReportContent />
        </main>
      </div>
    </div>
  );
}

export default ReportPage;
