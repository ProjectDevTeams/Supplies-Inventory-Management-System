import { NavLink } from "react-router-dom";
import "./Adjustbar.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Adjustbar({ searchTerm, setSearchTerm }) {
  return (
    <div className="adjustbar-header">
      <div className="adjustbar-title">ปรับยอด</div>
      <div className="adjustbar-controls">
        <div className="adjustbar-search-container">
          <FontAwesomeIcon icon={faSearch} className="adjustbar-search-icon" />
          <input
            className="adjustbar-search-input"
            type="text"
            placeholder="ค้นหา"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <NavLink
          to="/adjust/add"
          className={({ isActive }) =>
            isActive ? "adjustbar-btn add active" : "adjustbar-btn add"
          }
        >
          + เพิ่มหัวข้อ
        </NavLink>
      </div>
    </div>
  );
}

export default Adjustbar;
