import React from 'react';
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import PermissionAdd from "../../../components/Permission/Permission-Add/Permission-Add";
import './PermissionAddPage.css';

function PermissionAddPage() {
  return (
    <div className="permission-add-navbar">
      <Navbar />
      <div className="permission-add-sidebar">
        <Sidebar />
        <main className="permission-add-content">
          <section className="permission-add-header">
            <PermissionAdd />
          </section>
        </main>
      </div>
    </div>
  );
}

export default PermissionAddPage;
