import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Adjustbar from "../../components/Adjust/Adjustbar";
import AdjustTable from '../../components/Adjust/Adjust-table';

function AdjustPage() {
  return (
    <div className="adjust-navbar">
      <Navbar />
      <div className="adjust-sidebar">
        <Sidebar />
        <main className="adjust-content">
          <section className="content-header">
            <Adjustbar />
          </section>
          <section className="adjust-table-container">
           <AdjustTable/>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdjustPage;
