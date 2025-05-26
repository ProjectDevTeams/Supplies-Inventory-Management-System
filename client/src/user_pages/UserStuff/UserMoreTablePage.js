import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserStuffbar from "../../user_components/UserStuff/UserStuff_bar";


import axios from "axios";
import { API_URL } from "../../config";

import "./UserMoreTablePage.css";
import UserMoreTable from "../../user_components/UserStuff/UserMorePopup/UserMoreTable";

function UserMoreTablePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`);
      const finalData = Array.isArray(res.data) ? res.data : res.data.data;
      setData(finalData);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="usermore-navbar">
      <Navbar />
      <div className="usermore-sidebar">
        <main className="usermore-content">
          <UserStuffbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <UserMoreTable     
            searchTerm={searchTerm}
            data={data}
            fetchData={fetchData}
          />
        </main>
      </div>
    </div>
  );
}

export default UserMoreTablePage;
