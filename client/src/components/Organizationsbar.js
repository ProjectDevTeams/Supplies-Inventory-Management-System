import React, { useState } from "react";
import "./Organizationsbar.css";
import OrganizationsAddPopup from "./Organizations-Add-Popup";

function Organizationsbar() {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="org-bar">
      <div className="org-title">บริษัท/ห้าง/ร้าน</div>

      <div className="org-controls">
        <div className="org-search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="ค้นหา" />
        </div>

        <button className="btn green" onClick={handleOpenPopup}>
          + เพิ่มร้านค้า
        </button>
      </div>

      {/* แสดง Popup ถ้า showPopup เป็น true */}
      {showPopup && <OrganizationsAddPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default Organizationsbar;