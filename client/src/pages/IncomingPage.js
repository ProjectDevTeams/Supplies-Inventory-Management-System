import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Incomingbar from '../components/Incomingbar';
import IncomingTable from "../components/IncomingTable";
import './IncomingPage.css';

function IncomingPage() {
  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          {/* ส่วนหัว (bar) */}
          <section className="content-header">
            <Incomingbar />
          </section>

          {/* ตาราง IncomingTable */}
          <section className="stuff-table-container">
            <IncomingTable />
          </section>

        </main>
      </div>
    </div>
  );
}

export default IncomingPage;
