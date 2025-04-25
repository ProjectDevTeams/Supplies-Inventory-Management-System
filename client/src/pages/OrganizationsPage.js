import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Organizationsbar from '../components/Organizationsbar';
import Organizations_Table from '../components/Organizationsbar-table';
import './OrganizationsPage.css';

function OrganizationsPage() {
  return (
    <div className="organizations-navbar">
      <Navbar />
      <div className="organizations-sidebar">
        <Sidebar />
        <main className="organizations-content">
          <section className="content-header">
            <Organizationsbar />
            <Organizations_Table/>
          </section>
        </main>
      </div>
    </div>
  );
}

export default OrganizationsPage;
