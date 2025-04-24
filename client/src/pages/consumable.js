import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Consumablebar from '../components/Consumablebar';
function ConsumablePage() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div id='Consumabslebar'>
        <Consumablebar />
      </div>
     
     
    </div>

  );
}

export default ConsumablePage;
