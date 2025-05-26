// UserMoreDetailPage.js
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { API_URL } from "../../config";
import "./UserMoreDetailPage.css";
import UserMoreDetail from "../../user_components/UserStuff/UserMorePopup/UserMoreDetail";

function UserMoreDetailPage() {
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
    <div className="usermore-detail-navbar">
      <Navbar />
      <div className="usermore-detail-sidebar">
        <main className="usermore-detail-content">
          <UserMoreDetail data={data} fetchData={fetchData} />
        </main>
      </div>
    </div>
  );
}

export default UserMoreDetailPage;
