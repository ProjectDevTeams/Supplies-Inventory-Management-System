import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PermissionContent from "../../components/Permission/Permission-Content";

import './PermissionPage.css';

function PermissionPage() {
  return (
    <div className="permission-navbar">
      <Navbar />
      <div className="permission-sidebar">
        <Sidebar />
        <main className="permission-content">
          <section className="permission-header">
            <PermissionContent />
          </section>
        </main>
      </div>
    </div>
  );
}

export default PermissionPage;
