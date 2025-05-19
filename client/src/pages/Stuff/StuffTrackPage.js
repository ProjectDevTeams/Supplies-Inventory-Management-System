import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Stuffbar from "../../components/Stuff/Stuffbar";
import StuffTableTrack from "../../components/Stuff/StuffTableTrack";
import './StuffPage.css';

export default function StuffTrackPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          <Stuffbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <section className="stuff-table-container">
            <StuffTableTrack searchTerm={searchTerm} />
          </section>
        </main>
      </div>
    </div>
  );
}
