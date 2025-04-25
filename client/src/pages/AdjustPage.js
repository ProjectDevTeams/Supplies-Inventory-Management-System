import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import './AdjustPage.css';

function AdjustPage() {
  return (
    <div className="adjust-navbar">
      <Navbar />
      <div className="adjust-sidebar">
        <Sidebar />
        <main className="adjust-content">
          <section className="adjust-header">
            <h2>ปรับยอด</h2>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdjustPage;
