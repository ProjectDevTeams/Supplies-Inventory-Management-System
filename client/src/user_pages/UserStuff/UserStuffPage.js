import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
<<<<<<< HEAD

import UserStuffbar from '../../user_components/UserStuff/UserStuff_bar';


=======
import UserStuffbar from '../../user_components/UserStuff/UserStuff_bar';
// import UserStuff_Table from '../../user_components/UserStuff/UserStuff_table';
>>>>>>> fc8f7c7568a0d35cef1b24980eda1f58b3e336f9
import './UserStuffPage.css';

function UserStuffPage() {

  
  return (
    <div className="userstuff-navbar">
      <Navbar />
      <main className="userstuff-content">  
<<<<<<< HEAD



          <UserStuffbar />

=======
          <UserStuffbar />
          {/* <UserStuff_Table/> */}
>>>>>>> fc8f7c7568a0d35cef1b24980eda1f58b3e336f9
      </main>
    </div>
  );
}

export default UserStuffPage;