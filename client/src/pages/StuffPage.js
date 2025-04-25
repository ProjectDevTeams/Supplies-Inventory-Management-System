import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Stuffbar from '../components/Stuffbar';
// import StuffTable from '../components/StuffTable';
import './StuffPage.css';

function StuffPage() {
  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          <section className="content-header">
            <Stuffbar />
          </section>
          <section className="stuff-table-container">
            {/* <StuffTable /> */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default StuffPage;
