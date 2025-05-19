import React from 'react';
import './Stuffbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Stuffbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

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

        {/* ปุ่มเปลี่ยนหน้า */}
        <button
          className="btn blue"
          onClick={() => navigate('/stuff')}
        >
          รออนุมัติ
        </button>

        <button
          className="btn purple"
          onClick={() => navigate('/stuff/track')}
        >
          ติดตามสถานะการเบิก
        </button>

        <button
          className="btn orange"
          onClick={() => navigate('/stuff/purchase')}
        >
          รายการขอจัดซื้อเพิ่มเติม
        </button>
      </div>
    </div>
  );
}

export default Stuffbar;
