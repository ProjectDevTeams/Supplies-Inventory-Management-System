import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Incomingbar from '../../components/Incoming/Incomingbar';
import IncomingTable from "../../components/Incoming/IncomingTable";
import { exportToExcel } from "../../utils/exportToExcel";
import './IncomingPage.css';

function IncomingPage() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleExportExcel = () => {
    exportToExcel(tableData);
  };

  return (
    <div className="incoming-navbar">
      <Navbar />
      <div className="incoming-sidebar">
        <Sidebar />
        <main className="incoming-content">
          <section>
            <Incomingbar
              onExportExcel={handleExportExcel}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </section>
          <section>
            <IncomingTable
              searchTerm={searchTerm}
              onDataReady={setTableData}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default IncomingPage;
