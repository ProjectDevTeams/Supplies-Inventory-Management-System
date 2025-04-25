import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Consumablebar from '../components/Consumablebar';
import Consumable_Table from '../components/Consumable-table';


function ConsumablePage() {
  return (
    <div>
      <Navbar />
      
      <Sidebar />
      <div id='Consumabslebar'>
        <Consumablebar />
      </div>
      <div className='ConsumableTable-Contrianer'>
      <Consumable_Table />
      </div>
      
        
     
     
    </div>

  );
}

export default ConsumablePage;
