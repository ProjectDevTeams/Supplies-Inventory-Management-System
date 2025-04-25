import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Humanbar from '../components/Humanbar';
import AddpeoplePopup from '../components/addpeople-popup';
import EditpeoplePopup from '../components/Editpeople-popup';
import './HumanPage.css';

function HumanPage() {
  return (
    <div className="human-navbar">
      <Navbar />
      <div className="human-sidebar">
        <Sidebar />
        
        <main className="human-content">
          <section className="content-header">
            {/* test popup */}
            {/* <EditpeoplePopup/> */}  
            {/* <AddpeoplePopup/> */}
            <Humanbar/>
            
            
          </section>
        </main>
      </div>
    </div>
  );
}

export default HumanPage;
