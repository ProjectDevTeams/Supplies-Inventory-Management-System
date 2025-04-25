import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Incomingbar from '../components/Incomingbar';
import './IncomingPage.css';

function IncomingPage() {
  return (
    <div className="incoming-navbar">
      <Navbar />
      <div className="incoming-sidebar">
        <Sidebar />
        <main className="incoming-content">
          <section className="content-header">
            <Incomingbar /> 
          </section>
        </main>
      </div>
    </div>
  );
}


export default IncomingPage;
