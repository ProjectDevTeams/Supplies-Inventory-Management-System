import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import './HumanPage.css';

function HumanPage() {
  return (
    <div className="human-navbar">
      <Navbar />
      <div className="human-sidebar">
        <Sidebar />
        <main className="human-content">
          <section className="content-header">
            {/* <HumanPage/> */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default HumanPage;
