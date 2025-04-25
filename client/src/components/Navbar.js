import React from "react";
import'./Navbar.css'

function Navbar() {


  return (
    <nav>
        <section id="title">
            <ul>
                <li><a href=""><img src="/image/Logo.png" alt="Logo"></img></a></li>
            </ul>    
        </section>
        <section  id="account">
          <ul>
            <li><a href=""><img src="/image/bell.png" alt="Shopping-Cart"></img></a></li>
            <li><a href=""><img id="" src="/image/user_profile.png" alt="profile-user"></img></a></li>
            <li><a href=""><strong>Admin STI</strong></a></li>
            <li><a href=""><img src="/image/exit.png" alt="exit-logout"></img></a></li>
            <li><a href="">Logout</a></li>
          </ul>    
        </section>
    </nav>
    
  );
}

export default Navbar;
