import "./Incoming-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Incomingbar({ searchTerm, setSearchTerm }) {
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="incoming-header">
      <div className="incoming-title">รับเข้าวัสดุ</div>

      <div className="incoming-controls">
        {/* 🔍 Search */}
        <div className="incoming-search-container">
          <FontAwesomeIcon icon={faSearch} className="incoming-search-icon" />
          <input
            type="text"
            placeholder="ค้นหา"
            value={searchTerm}
            onChange={handleSearchChange}
            className="incoming-search-input"
          />
        </div>

        {/* ➕ เพิ่มการรับเข้าวัสดุ */}
        <button
          className="incoming-btn-green"
          onClick={() => window.location.assign("/incoming/add")}
        >
          + เพิ่มการรับเข้าวัสดุ
        </button>
      </div>
    </div>
  );
}
