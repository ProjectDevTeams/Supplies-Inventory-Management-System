import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import '../../components/Incoming/Materials/Materials.css';
import Materials from '../../components/Incoming/Materials/Materials'; // ← เพิ่มตรงนี้

export default function MaterialsPage() {
  return (
    <div className="material-navbar">
      <Navbar />
      <div className="material-sidebar">
        <Sidebar />
        <main className="material-content">
          <div className="material-box">

            {/* ⬇ แสดงคอมโพเนนต์ Materials ที่คุณสร้างไว้ */}
            <Materials />

          </div>
        </main>
      </div>
    </div>
  );
}
