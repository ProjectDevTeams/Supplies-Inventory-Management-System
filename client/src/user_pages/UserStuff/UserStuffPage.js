import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
<<<<<<< HEAD
import UserStuff_Table from '../../user_components/UserStuff/UserStuff_table';
=======
import UserStuffbar from '../../user_components/UserStuff/UserStuff_bar';
// import UserStuff_Table from '../../user_components/UserStuff/UserStuff_table';
>>>>>>> 9b87c309d6897ab5cd867a6fddec63c8b939f98a
import './UserStuffPage.css';

function UserStuffPage() {

  
  return (
    <div className="userstuff-navbar">
      <Navbar />
      <main className="userstuff-content">  
<<<<<<< HEAD

          <UserStuff_Table/>
=======
          <UserStuffbar />
          {/* <UserStuff_Table/> */}
>>>>>>> 9b87c309d6897ab5cd867a6fddec63c8b939f98a
      </main>
    </div>
  );
}

export default UserStuffPage;
