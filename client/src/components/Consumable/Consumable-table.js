import { useState, useEffect } from "react";
import axios from "axios";
import "./Consumable-table.css";
import AddnewPopup from "./addnew-popup";
import Consumable from "./Consumablebar";
import { API_URL } from "../../config";  // Import the API_URL

const itemsPerPage = 5;

function Consumable_Table({ searchTerm, setSearchTerm }) {
  const [data, setData] = useState([]); // State to store fetched data
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [inputPage, setInputPage] = useState("");
  const [sortAsc, setSortAsc] = useState(true); // For sorting
  const [sortBy, setSortBy] = useState("id");

  // Fetch data from API on component mount
  useEffect(() => {
    axios
      .get(`${API_URL}/materials/get_materials.php`)  // Fetch from the API
      .then(r => {
        if (r.data.status === "success") {
          setData(
            r.data.data.map(item => ({
              id: String(item.id),
              image: item.image || "https://via.placeholder.com/60", // Default image if empty
              name: item.name,
              category_id: item.category,
              unit: item.unit,
              stock_type: item.location,
              price: parseFloat(item.price),
              status: item.status,
              received_quantity: item.brought,
              issued_quantity: item.issued_quantity,
              remaining_quantity: item.remain,
              min_quantity: item.low,
              max_quantity: item.high,
              carry_over_quantity: item.carry_over_quantity
            }))
          );
        }
      })
      .catch(console.error);
  }, []); // Empty dependency array means this will run once on mount

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter data based on search term
  const filteredData = data.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.stock_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting only by id for ascending/descending order
  const sortedData = [...filteredData].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle number sorting for id
    if (sortBy === "id") {
      valA = parseInt(valA, 10); // Convert to number
      valB = parseInt(valB, 10);
    }

    // Compare based on ascending or descending order
    if (typeof valA === "number") {
      return sortAsc ? valA - valB : valB - valA;  // Sorting by numeric order
    } else {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage(""); // Clear input page when the page changes
  }, [currentPage]);

  return (
    <div className="table-container-consumable">
      <Consumable
        onAddClick={() => setShowPopup(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <table className="consumable-table">
        <thead className="consumable-thead">
          <tr className="consumable-thead-row">
            <th
              className="consumable-th"
              onClick={() => {
                // Handle sorting only for 'id' column
                setSortBy("id");
                setSortAsc(prev => !prev); // Toggle between ascending/descending order
              }}
            >
              ลำดับ {sortBy === "id" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th className="consumable-th">รูปภาพ</th>
            <th className="consumable-th">รายการ</th>

            <th className="consumable-th">
              ยอดยกมา
            </th>

            <th className="consumable-th">
              ยอดต่ำสุด
            </th>

            <th className="consumable-th">
              ยอดสูงสุด
            </th>

            <th className="consumable-th">
              รับ
            </th>
              
            <th className="consumable-th">
              จ่าย
            </th>
           
            <th className="consumable-th">
              คงเหลือ
            </th>          
          </tr>
        </thead>
        <tbody className="consumable-tbody">
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="9" className="consumable-no-data">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            currentItems.map((item, index) => (
              <tr key={index} className="consumable-tr">
                <td className="consumable-td">{item.id}</td>
                <td className="consumable-td">
                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="item-image"
                  />
                </td>
                <td className="item-cell consumable-td">
                  <b>ชื่อ :</b> {item.name}
                  <br />
                  หมวดหมู่ : {item.category_id}
                  <br />
                  หน่วยนับ : {item.unit} | คลังวัสดุ : {item.stock_type}
                  <br />
                  ราคา/หน่วย : {item.price}
                  <br />
                  สถานะ :{" "}
                  <span
                    className={`item-status ${
                      item.status.includes("วัสดุใกล้หมดสต็อก") ? "low-stock" : "in-stock"
                    }`}
                  >
                    {item.status}
                  </span>
                  <div className="item-actions">
                    <button type="button" className="consumable-edit">
                      ✏ แก้ไข
                    </button>
                    <button type="button" className="consumable-adjust">
                      ปรับยอด
                    </button>
                  </div>
                </td>
                <td className="consumable-td">{item.carry_over_quantity}</td>
                <td className="consumable-td">{item.min_quantity}</td>
                <td className="consumable-td">{item.max_quantity}</td>
                <td className="consumable-td">{item.received_quantity}</td>
                <td className="consumable-td">{item.issued_quantity}</td>
                <td className="consumable-td">{item.remaining_quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showPopup && <AddnewPopup onClose={() => setShowPopup(false)} />}

      <div className="consumable-pagination-wrapper">
        <div className="consumable-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง{" "}
          {Math.min(indexOfLastItem, data.length)} จาก {data.length} แถว
        </div>
        <div className="consumable-pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="consumable-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            placeholder={`${currentPage} / ${totalPages}`}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = parseInt(inputPage.trim(), 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
                e.target.blur();
              }
            }}
          />

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default Consumable_Table;
