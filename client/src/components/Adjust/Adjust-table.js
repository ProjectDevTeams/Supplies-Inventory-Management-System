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

  // กรองข้อมูลโดย searchTerm
  const filteredData = data.filter((item) =>
    item.id.toString().includes(searchTerm.toLowerCase()) ||
    item.stock_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.company_name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.created_at.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // จัดเรียงตาม id
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

  // แปลงวันที่เป็นรูปแบบ dd/mm/yy และเพิ่มข้อความย่อย
  const formatDateWithSubtext = (dateStr, subtext) => {
    if (!dateStr) return "--";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr; // ถ้าแปลงไม่ได้
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return (
      <>
        <div>{d.toLocaleDateString("th-TH", options)}</div>
        <div style={{ fontSize: "0.8em", color: "#555" }}>{subtext}</div>
      </>
    );
  };

  return (
    <div className="adjustment-table-container">
      <div className="adjustment-table-description">
        ตารางประวัติการปรับยอด
      </div>
      <table id="adjustment-table">
        <thead id="adjustment-thead">
          <tr className="adjustment-tr">
            <th className="adjustment-th" onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
              ลำดับ {sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th className="adjustment-th">จากคลัง</th>
            <th className="adjustment-th">บริษัท/ร้านค้า</th>
            <th className="adjustment-th">วันที่ซื้อ</th>
            <th className="adjustment-th">สถานะ</th>
          </tr>
        </thead>
        <tbody id="adjustment-tbody">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr
                key={item.id}
                className="adjustment-tr"
                onClick={() => navigate('/adjust/balance')}
                style={{ cursor: "pointer" }}
              >
                <td className="adjustment-td">{item.id}</td>
                <td className="adjustment-td">{item.stock_type}</td>
                <td className="adjustment-td">{item.company_name || "-"}</td>
                <td className="adjustment-td">
                  {formatDateWithSubtext(item.created_at, item.company_name ? `ฝ่าย${item.company_name}` : "")}
                </td>
                <td className="adjustment-td" style={{ fontWeight: "bold", color: "green" }}>
                  {item.status || "อนุมัติ"}
                </td>
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
