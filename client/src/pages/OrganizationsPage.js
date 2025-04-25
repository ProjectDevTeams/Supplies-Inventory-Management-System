import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Consumablebar from '../components/Consumablebar';
import './OrganizationsPage.css';

function OrganizationsPage() {
  return (
    <div className="organizations-navbar">
      <Navbar />
      <div className="organizations-sidebar">
        <Sidebar />
        <main className="organizations-content">
          <section className="content-header">
            <Consumablebar />
          </section>
        </main>
      </div>
    </div>
  );
}

export default OrganizationsPage;
