import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Humanbar from '../../components/Human/Humanbar';
import HumanTable from '../../components/Human/HumanTable';
import axios from "axios";
import { API_URL } from "../../config";

import './HumanPage.css';

function HumanPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  // ✅ ประกาศ fetchData
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/get_users.php`);
      const finalData = Array.isArray(res.data) ? res.data : res.data.data;
      setData(finalData);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData(); // ✅ โหลดตอน mount
  }, []);

  return (
    <div className="human-navbar">
      <Navbar />
      <div className="human-sidebar">
        <Sidebar />
        <main className="human-content">
            <Humanbar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAddSuccess={fetchData} 
            />
            <HumanTable
              searchTerm={searchTerm}
              data={data}
              fetchData={fetchData}
            />
        </main>
      </div>
    </div>
  );
}

export default HumanPage;
