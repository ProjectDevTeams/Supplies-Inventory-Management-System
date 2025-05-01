import React from 'react';
import './Stuffbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Stuffbar({ setActiveTab, activeTab, searchTerm, setSearchTerm }) {
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="stuff-header">
      <div className="stuff-title">เบิกวัสดุ</div>

      <div className="stuff-controls">
        {/* ช่องค้นหา */}
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="ค้นหา"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* ปุ่มสลับตาราง */}
        <button
          className={`btn blue ${activeTab === 'wait' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('wait')}
        >
          รออนุมัติ
        </button>

        <button
          className={`btn purple ${activeTab === 'track' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('track')}
        >
          ติดตามสถานะการเบิก
        </button>

        <button
          className={`btn orange ${activeTab === 'purchase' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('purchase')}
        >
          รายการขอจัดซื้อเพิ่มเติม
        </button>
      </div>
    </div>
  );
}

export default Stuffbar;
