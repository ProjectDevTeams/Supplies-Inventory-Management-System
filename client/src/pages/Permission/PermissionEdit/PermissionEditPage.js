import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import PermissionEdit from "../../../components/Permission/Permission-Edit/Permission-Edit";
import './PermissionEditPage.css';

function PermissionEditPage() {
  const { state } = useLocation();
  const data = state?.data || {};

  return (
    <div className="permission-edit-navbar">
      <Navbar />
      <div className="permission-edit-sidebar">
        <Sidebar />
        <main className="permission-edit-content">
          <section className="permission-edit-header">
            <PermissionEdit data={data} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default PermissionEditPage;
