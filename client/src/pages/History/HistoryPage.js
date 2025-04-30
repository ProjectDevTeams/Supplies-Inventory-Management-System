import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import './HistoryPage.css';
import Historybar from '../../components/History/Historybar';


function HistoryPage() {
  return (
    <div className="history-navbar">
      <Navbar />
      <div className="history-sidebar">
        <Sidebar />
        <main className="history-content">
          <section className="history-header">
            
            <Historybar />
            

            
          </section>
          {/* <section className="history-table-container">
           
          </section> */}
        </main>
      </div>
    </div>
  );
}

export default HistoryPage;
