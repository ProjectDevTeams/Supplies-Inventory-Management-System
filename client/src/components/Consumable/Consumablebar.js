import { useNavigate } from "react-router";
import "./Consumablebar.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

function Consumable({ onAddClick, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const [lowStockCount, setLowStockCount] = useState(0);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // ✅ โหลดข้อมูลวัสดุใกล้หมด
  useEffect(() => {
    const fetchLowStockCount = async () => {
      try {
        const res = await axios.get(`${API_URL}/materials/get_materials.php`);
        if (res.data.status === "success") {
          const filtered = res.data.data.filter(
            item => item.status === "วัสดุใกล้หมดสต็อก"
          );
          setLowStockCount(filtered.length);
        }
      } catch (error) {
        console.error("โหลดจำนวนสินค้าที่ใกล้หมดสต็อกล้มเหลว:", error);
      }
    };
    fetchLowStockCount();
  }, []);

  return (
    <div>
      <div className="top-bar">
        <div className="top-title">วัสดุสิ้นเปลือง</div>

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
            <button className="btn danger" onClick={() => navigate("/report")}>
              สินค้าใกล้หมดสต็อก ({lowStockCount})
            </button>

            <button className="btn success" onClick={onAddClick}>
              + เพิ่มรายการ
            </button>

            <button
              className="btn primary"
              onClick={() => navigate("/consumable/categorize")}
            >
              จัดการหมวดหมู่
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consumable;
