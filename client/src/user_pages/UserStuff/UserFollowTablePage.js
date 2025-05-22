// สำหรับ route path
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserStuffbar from "../../user_components/UserStuff/UserStuff_bar";
import UserFollowTable from "../../user_components/UserStuff/UserFollow/UserFollowTable"; // ✅ path ตรงตามจริง
import axios from "axios";
import { API_URL } from "../../config";

import "./UserFollowTablePage.css";

function UserFollowTablePage() {
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
    <div className="userfollow-navbar">
      <Navbar />
      <div className="userfollow-sidebar">
        <main className="userfollow-content">
          <UserStuffbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <UserFollowTable
            searchTerm={searchTerm}
            data={data}
            fetchData={fetchData}
          />
        </main>
      </div>
    </div>
  );
}

export default UserFollowTablePage;
