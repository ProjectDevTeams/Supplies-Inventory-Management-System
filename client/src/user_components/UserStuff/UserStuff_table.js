// UserStuff_Table.js
import { useState, useEffect } from "react";
import axios from "axios";
import "./UserStuff_table.css";
import StuffItemPopup from "../UserPopup/StuffItem_Popup";
import { API_URL } from "../../config";

const itemsPerPage = 5;

function UserStuff_Table({ searchTerm = "", basketItems, setBasketItems }) {
  const [materials, setMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`${API_URL}/materials/get_materials.php`);
        if (res.data.status === "success") {
          const inStockItems = res.data.data.filter(
            (item) => item.location === "วัสดุในคลัง"
          );
          setMaterials(inStockItems);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดวัสดุ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

//   useEffect(() => {
//     localStorage.setItem("basketItems", JSON.stringify(basketItems));
//   }, [basketItems]);

//   useEffect(() => {
//   const saved = localStorage.getItem("basketItems");
//   if (saved) {
//     setBasketItems(JSON.parse(saved));
//   }
// }, []);


  const filteredData = materials.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.remain.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (loading)
    return (
      <div className="user-stuff-table-loading">กำลังโหลดข้อมูล...</div>
    );

  return (
    <div className="user-stuff-table-container">
      <table className="user-stuff-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>รูปภาพ</th>
            <th>รายการ</th>
            <th>คงเหลือ</th>
            <th>ทำรายการ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="5" className="user-stuff-table-no-data">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            currentItems.map((item, index) => (
              <tr key={index} className="user-stuff-table-row">
                <td>{item.id}</td>
                <td>
                  <div className="user-stuff-table-image-wrapper">
                    <img
                      src={`${API_URL}/${item.image}`}
                      alt={item.name}
                      className="user-stuff-table-image"
                    />
                  </div>
                </td>
                <td>
                  <span className="user-stuff-table-name">{item.name}</span>
                  <div className="user-stuff-table-category">
                    หมวดหมู่: {item.category}
                  </div>
                </td>
                <td>{item.remain}</td>
                <td>
                  <button
                    className="user-stuff-table-button"
                    onClick={() => setSelectedItem(item)}
                  >
                    เลือก
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="user-stuff-table-pagination-wrapper">
        <div className="user-stuff-table-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="user-stuff-table-pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="user-stuff-table-page-input"
            min={1}
            max={totalPages}
            value={inputPage}
            placeholder={`${currentPage} / ${totalPages}`}
            onFocus={() => setInputPage("")}
            onChange={e => setInputPage(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                const v = parseInt(inputPage, 10);
                if (v >= 1 && v <= totalPages) setCurrentPage(v);
                e.target.blur();
              }
            }}
          />
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            ถัดไป
          </button>
        </div>
      </div>

      {selectedItem && (
        <StuffItemPopup
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={(item, quantity) => {
            const existing = basketItems.find((i) => i.id === item.id);
            if (existing) {
              setBasketItems((prev) =>
                prev.map((i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
                )
              );
            } else {
              setBasketItems((prev) => [...prev, { ...item, quantity }]);
            }
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}

export default UserStuff_Table;
