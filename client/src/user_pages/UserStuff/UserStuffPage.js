import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import UserStuffbar from '../../user_components/UserStuff/UserStuff_bar';
import './UserStuffPage.css';

function UserStuffPage() {

  
  return (
    <div className="userstuff-navbar">
      <Navbar />
      <div className="userstuff-sidebar">
        <main className="userstuff-content">
       
          <UserStuffbar />

        </main>
      </div>
    </div>
  );
}

export default UserStuffPage;
