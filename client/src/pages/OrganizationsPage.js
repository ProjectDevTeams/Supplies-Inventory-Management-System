import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import './OrganizationsPage.css';

function OrganizationsPage() {
  return (
    <div className="organizations-navbar">
      <Navbar />
      <div className="organizations-sidebar">
        <Sidebar />
        <main className="organizations-content">
          <section className="content-header">
            <h2>บริษัท/ห้าง/ร้าน</h2>
          </section>
        </main>
      </div>
    </div>
  );
}

export default OrganizationsPage;
