import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-navbar">
      <Navbar />
      <div className="home-sidebar">
        <Sidebar />
        <main className="home-content">
          <section className="home-header">
            <h2>หน้าหลัก</h2>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
