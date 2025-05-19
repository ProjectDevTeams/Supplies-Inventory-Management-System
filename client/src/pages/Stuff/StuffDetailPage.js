// File: src/pages/Stuff/StuffDetailPage.js
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import StuffDetail from '../../components/Stuff/Detail/Detail';
import './StuffDetailPage.css';

export default function StuffDetailPage() {
  return (
    <div className="stuff-detail-navbar">
      <Navbar />
      <div className="stuff-detail-sidebar">
        <Sidebar />
        <main className="stuff-detail-content">
          <StuffDetail />
        </main>
      </div>
    </div>
  );
}
