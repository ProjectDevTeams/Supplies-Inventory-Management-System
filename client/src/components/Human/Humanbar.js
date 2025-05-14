import React, { useState } from "react";
import "./Humanbar.css"; 
import AddpeoplePopup from '../../components/Human/addpeople-popup';
// import EditpeoplePopup from '../../components/Human/Editpeople-popup';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Humanbar({ searchTerm, setSearchTerm, onAddSuccess }) { // รับ props เพิ่ม
  const [showPopup, setShowPopup] = useState(false); // State สำหรับการแสดง Popup

  // ฟังก์ชันในการเปิด/ปิด AddpeoplePopup
  const handleAddPeopleClick = () => {
    setShowPopup(true); // แสดง Popup เมื่อคลิกปุ่ม
  };

  const handleClosePopup = () => {
    setShowPopup(false); // ปิด Popup เมื่อคลิกปิด
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // เปลี่ยนข้อความค้นหา
  };

  return (
    <div className="top-bar">
      <div className="top-title">บุคลากร</div>

      <div className="toolbar">
        <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon"/>
          <input 
            type="text" 
            placeholder="ค้นหา" 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          
        </div>

        <div className="button-group">
          <button className="btn success" onClick={handleAddPeopleClick}>
            + เพิ่มเจ้าหน้าที่
          </button>
        </div>
      </div>

      {/* แสดง AddpeoplePopup เมื่อคลิกปุ่ม เพิ่มเจ้าหน้าที่ */}
      {showPopup && (
        <AddpeoplePopup onClose={handleClosePopup}
        onAdd={onAddSuccess} /> // ส่งฟังก์ชันปิดไปใน Popup
      )}
    </div>
  );
}

export default Humanbar;