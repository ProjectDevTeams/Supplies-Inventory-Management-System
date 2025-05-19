import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import IncomingAdd from '../../components/Incoming/Incoming-add';
import './IncomingAddPage.css';

export default function IncomingAddPage() {
  return (
    <div className="incoming-add-navbar">
      <Navbar />
      <div className="incoming-add-sidebar">
        <Sidebar />
        <main className="incoming-add-content">
          <div className="incoming-add-box">
            <IncomingAdd />
          </div>
        </main>
      </div>
    </div>
  );
}
