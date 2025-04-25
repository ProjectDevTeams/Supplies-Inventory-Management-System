import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Incomingbar from '../components/Incomingbar';
import './IncomingPage.css';

function IncomingPage() {
  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          <section className="content-header">
            <Incomingbar />
          </section>
        </main>
      </div>
    </div>
  );
}

export default IncomingPage;
