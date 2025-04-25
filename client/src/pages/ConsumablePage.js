import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Consumablebar from '../components/Consumablebar';
import Consumable_Table from '../components/Consumable-table';
import './ConsumablePage.css';

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
          <section className='Consumable_Table-container'>
            <Consumable_Table/>
          </section>
        </main>
      </div>
    </div>
  
  );
}

export default ConsumablePage;