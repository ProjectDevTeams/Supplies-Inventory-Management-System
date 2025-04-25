import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Consumablebar from '../components/Consumablebar';
import './consumable.css';

function ConsumablePage() {
  return (
    <div className="consumable-navbar">
      <Navbar />
      <div className="consumable-sidebar">
        <Sidebar />
        <main className="consumable-content">
          <section className="content-header">
            <Consumablebar />
          </section>
        </main>
      </div>
    </div>
  );
}

export default ConsumablePage;
