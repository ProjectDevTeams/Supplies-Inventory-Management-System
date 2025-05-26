import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import UserStuffbar from '../../user_components/UserStuff/UserStuff_bar';

import './UserStuffPage.css';

function UserStuffPage() {  
  return (
    <div className="userstuff-navbar">
      <Navbar />
      <main className="userstuff-content">  
          <UserStuffbar />
      </main>
    </div>
  );
}

export default UserStuffPage;