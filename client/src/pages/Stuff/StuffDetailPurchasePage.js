import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import DetailPurchase from '../../components/Stuff/DetailPurchase/DetailPurchase';
import './StuffDetailPurchasePage.css';

export default function StuffDetailPurchasePage() {
    const { id } = useParams(); 

  return (
    <div className="stuff-PurchasePage-navbar">
      <Navbar />
      <div className="stuff-PurchasePage-sidebar">
        <Sidebar />
        <main className="stuff-PurchasePage-content">
          <DetailPurchase id={id}/>
        </main>
      </div>
    </div>
  );
}
