import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Categorizebar from '../../../components/Consumable/Categorize/Categorize_bar';
import Categorize_table from '../../../components/Consumable/Categorize/Categorize_table';
import './Categorize.css';

function CategorizePage() {
  return (
    <div className="consumable-navbar">
      <Navbar />
      <div className="consumable-sidebar-categorize">
        <Sidebar />
        <main className="consumable-content-categorize">
          <Categorize_table />
        </main>
      </div>
    </div>

  
  );
}

export default CategorizePage;