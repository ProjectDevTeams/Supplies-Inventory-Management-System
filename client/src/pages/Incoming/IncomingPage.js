import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Incomingbar from '../../components/Incoming/Incomingbar';
import IncomingTable from "../../components/Incoming/IncomingTable";
import { exportToExcel } from "../../utils/exportToExcel";
import './IncomingPage.css';

function IncomingPage() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // ✅ เพิ่ม searchTerm

  const handleExportExcel = () => {
    exportToExcel(tableData);
  };

  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          <section className="content-header">
            <Incomingbar
              onExportExcel={handleExportExcel}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </section>
          <section className="stuff-table-container">
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
