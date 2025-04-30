import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Consumablebar from '../../components/Consumable/Consumablebar';
import Consumable_Table from '../../components/Consumable/Consumable-table';
import './ConsumablePage.css';

function ConsumablePage() {
  return (
    <div className="consumable-navbar">
      <Navbar />
      <div className="consumable-sidebar">
        <Sidebar />
        <main className="consumable-content">
          <section className="consumable-table-container">
            <Consumable_Table/>
          </section>
        </main>
      </div>
    </div>

  
  );
}

export default ConsumablePage;