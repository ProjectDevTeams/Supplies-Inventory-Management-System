// สำหรับ route path

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import UserStuffbar from '../../user_components/UserStuff/UserStuff_bar';
import axios from "axios";
import { API_URL } from "../../config";
import './UserStuffTablePage.css';
import UserStuff_Table from '../../user_components/UserStuff/UserStuff_table';

function UserStuffTablePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  // ✅ เพิ่มตะกร้า
  const [basketItems, setBasketItems] = useState([]);

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
    <div className="userstuff-navbar">
      <Navbar />
      <div className="userstuff-sidebar">
        <main className="userstuff-content">
          <UserStuffbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            basketItems={basketItems}
            setBasketItems={setBasketItems}
          />
          <UserStuff_Table
            searchTerm={searchTerm}
            data={data}
            fetchData={fetchData}
            basketItems={basketItems}
            setBasketItems={setBasketItems}
          />
        </main>
      </div>
    </div>
  );
}

export default UserStuffTablePage;
