import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import './HistoryPage.css';
import Historybar from '../../components/History/Historybar';
import AddMaterialTable_History from '../../components/History/AddMaterialTable_History';
import OutMaterialTable_History from '../../components/History/OutMaterialTable_History';
import AllMaterialTable_History from '../../components/History/AllMaterialTable_History';

function HistoryPage() {
  return (
    <div className="history-navbar">
      <Navbar />
      <div className="history-sidebar">
        <Sidebar />
        <main className="history-content">
          <section className="content-header">
            
            <Historybar />
            {/* <AllMaterialTable_History/>  
            <AddMaterialTable_History />
            <OutMaterialTable_History /> */}

            
          </section>
          <section className="stuff-table-container">
            {/* <StuffTable /> */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default HistoryPage;
