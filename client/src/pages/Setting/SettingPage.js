import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import './SettingPage.css';

function SettingPage() {
  return (
    <div className="setting-navbar">
      <Navbar />
      <div className="setting-sidebar">
        <Sidebar />
        <main className="setting-content">
          <section className="setting-header">
            <h2>ตั้งค่าระบบ</h2>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SettingPage;
