import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import './PermissionPage.css';

function PermissionPage() {
  return (
    <div className="permission-navbar">
      <Navbar />
      <div className="permission-sidebar">
        <Sidebar />
        <main className="permission-content">
          <section className="permission-header">
            <h2>แบ่งสิทธิ์</h2>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PermissionPage;
