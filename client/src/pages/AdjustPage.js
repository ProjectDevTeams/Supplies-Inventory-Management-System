import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Adjustbar from "../components/Adjustbar";
// import AdjustTable from "../components/AdjustTable";
import './AdjustPage.css';

function AdjustPage() {
  return (
    <div className="adjust-navbar">
      <Navbar />
      <div className="adjust-sidebar">
        <Sidebar />
        <main className="adjust-content">
          <section className="content-header">
            <Adjustbar />
          </section>
          <section className="adjust-table-container">
            {/* <AdjustTable /> */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdjustPage;
