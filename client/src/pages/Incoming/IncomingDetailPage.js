import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import IncomingDetail from '../../components/Incoming/Incoming-detail';
import './IncomingDetailPage.css';

export default function IncomingDetailPage() {
  return (
    <div className="incoming-detail-navbar">
      <Navbar />
      <div className="incoming-detail-sidebar">
        <Sidebar />
        <main className="incoming-detail-content">
          <div className="incoming-detail-box">
            <IncomingDetail />
          </div>
        </main>
      </div>
    </div>
  );
}
