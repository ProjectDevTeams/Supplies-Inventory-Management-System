import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Humanbar from '../../components/Human/Humanbar';
import AddpeoplePopup from '../../components/Human/addpeople-popup';
import EditpeoplePopup from '../../components/Human/Editpeople-popup';
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
            {/* <EditpeoplePopup/>   */}
            {/* <AddpeoplePopup/> */}
            <Humanbar/>
            
            
          </section>
        </main>
      </div>
    </div>
  );
}

export default HumanPage;
