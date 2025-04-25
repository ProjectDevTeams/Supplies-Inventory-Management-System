import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import './HistoryPage.css';

function HistoryPage() {
  return (
    <div className="history-navbar">
      <Navbar />
      <div className="history-sidebar">
        <Sidebar />
        <main className="history-content">
          <section className="content-header">
            {/* <HumanPage/> */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default HistoryPage;
