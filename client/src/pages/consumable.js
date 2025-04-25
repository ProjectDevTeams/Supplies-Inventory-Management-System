import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Consumablebar from '../components/Consumablebar';
import './comsumable.css';

function ConsumablePage() {
  return (
    <>
      <Navbar />
      <div className="page-body">
        <Sidebar />
        <div className="main-area">
          <Consumablebar />
        </div>
      </div>
    </>
  );
}


export default ConsumablePage;
