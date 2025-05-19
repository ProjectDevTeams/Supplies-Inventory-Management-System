import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import DetailTrack from '../../components/Stuff/DetailTrack/DetailTrack';
import './StuffDetailTrackPage.css';

export default function StuffDetailTrackPage() {
  const { id } = useParams(); 

  return (
    <div className="detail-track-navbar">
      <Navbar />
      <div className="detail-track-sidebar">
        <Sidebar />
        <main className="detail-track-content">
          <DetailTrack id={id} />
        </main>
      </div>
    </div>
  );
}