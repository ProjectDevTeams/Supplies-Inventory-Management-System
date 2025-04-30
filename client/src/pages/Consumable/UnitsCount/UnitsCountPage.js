import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidebar from '../../../components/Sidebar/Sidebar';
import UnitsCountBar from '../../../components/Consumable/UnitsCount/UnitsCountBar';
import UnitsCountTable from '../../../components/Consumable/UnitsCount/UnitsCountTable';
import './UnitsCountPage.css'



function UnitsCountPage() {
  return (
    <div className="consumable-navbar">
      <Navbar />
      <div className="consumable-sidebar-unitscount">
        <Sidebar />
        <main className="consumable-content-unitscount">
          <section className="consumable-table-container-unitscount">
          <UnitsCountBar />
          </section>
          <UnitsCountTable />
        </main>
      </div>
    </div>

  
  );
}

export default UnitsCountPage;