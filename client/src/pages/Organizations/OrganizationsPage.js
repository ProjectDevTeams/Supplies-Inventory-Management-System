import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import OrganizationsTable from '../../components/Organizations/Organizations-table';
import './OrganizationsPage.css';

function OrganizationsPage() {
  return (
    <div className="organizations-navbar">
      <Navbar />
      <div className="organizations-sidebar">
        <Sidebar />
        <main className="organizations-content">
          <section className="content-header">
            <OrganizationsTable/>
          </section>
        </main>
      </div>
    </div>
  );
}

export default OrganizationsPage;
