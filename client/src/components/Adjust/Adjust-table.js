import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import "./Adjust-table.css";

function AdjustTable({ searchTerm }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${API_URL}/adjustments/get_adjustments.php`)
      .then((res) => {
        console.log("✅ ข้อมูลจาก API:", res.data); // ✅ ตรวจข้อมูล
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("รูปแบบข้อมูลไม่ถูกต้อง:", res.data);
        }
      })
      .catch((err) => {
        console.error("ดึงข้อมูลล้มเหลว:", err);
      });
  }, []);

  const filteredData = data.filter((item) =>
    item.id.toString().includes(searchTerm.toLowerCase()) ||
    item.stock_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.material_id.toString().includes(searchTerm.toLowerCase()) ||
    item.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.adjust_quantity.toString().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  return (
    <div className="adjustment-table-container">
      <table id="adjustment-table">
        <thead id="adjustment-thead">
          <tr className="adjustment-tr">
            <th className="adjustment-th" onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
              ลำดับ {sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th className="adjustment-th">จากคลัง</th>
            <th className="adjustment-th">รหัสวัสดุ</th>
            <th className="adjustment-th">จำนวนที่ปรับ</th>
            <th className="adjustment-th">วันที่</th>
          </tr>
        </thead>
        <tbody id="adjustment-tbody">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id} className="adjustment-tr">
                <td className="adjustment-td">{item.id}</td>
                <td className="adjustment-td">{item.stock_type}</td>
                <td
                  className="adjustment-td company-link"
                  onClick={() => navigate('/adjust/balance')}
                >
                  {item.material_id}
                </td>
                <td className="adjustment-td">{item.adjust_quantity}</td>
                <td className="adjustment-td">{item.created_at.split(" ")[0]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="adjustment-td" colSpan="5">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="adjust-pagination-wrapper">
        <div className="adjust-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedData.length)} จาก {sortedData.length} แถว
        </div>
        <div className="adjust-pagination-buttons">
          <button disabled={currentPage === 1} onClick={handlePrevPage}>ก่อนหน้า</button>
          <input
            type="number"
            className="adjust-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
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
            placeholder={`${currentPage} / ${totalPages}`}
          />
          <button disabled={currentPage === totalPages} onClick={handleNextPage}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default AdjustTable;
