import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./StuffTable.css";

export default function StuffTable({ searchTerm }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [asc, setAsc] = useState(true);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  // ✅ ย้ายออกนอก useEffect
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`);
      if (res.data.status === "success") {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("โหลดข้อมูลไม่สำเร็จ:", error);
    }
  };

  // ✅ ดึงข้อมูล + auto refresh ทุก 10 วินาที (ไม่ซ้อน)
  useEffect(() => {
    fetchData(); // load ครั้งแรก

    const interval = setInterval(() => {
      fetchData(); // reload ทุก 10 วิ
    }, 10000);

    return () => clearInterval(interval); // เคลียร์ interval ตอน component ถูกถอด
  }, []);

  const renderStatus = (status) => {
    if (status === "รออนุมัติ") return "รออนุมัติ";
    if (status === "อนุมัติ") return "อนุมัติ";
    if (status === "ไม่อนุมัติ") return "ไม่อนุมัติ";
    return "-";
  };

  const sortedData = [...data].sort((a, b) =>
    asc ? a.id - b.id : b.id - a.id
  );

  const filteredData = sortedData.filter((item) =>
    item.Admin_status === "รออนุมัติ" && (
      (item.running_code?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.created_at || "").includes(searchTerm) ||
      (item.created_by || "").includes(searchTerm) ||
      renderStatus(item.Admin_status).includes(searchTerm)
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="stuff-container">
      <div className="stuff-description">ตารางการรออนุมัติ</div>
      <table className="stuff-table">
        <thead>
          <tr>
            <th onClick={() => setAsc((prev) => !prev)} style={{ cursor: "pointer" }}>
              ลำดับ {asc ? "▲" : "▼"}
            </th>
            <th>เลขที่ใบเบิก</th>
            <th>ชื่อผู้เบิก</th>
            <th>จำนวนรายการ</th>
            <th>วันที่สร้าง</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="6" className="stuff-no-data">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr
                key={item.id}
                className="stuff-tr"
                onClick={() => navigate("/stuff/detail", { state: { id: item.id } })}
              >
                <td>{item.id}</td>
                <td>{item.running_code}</td>
                <td>{item.created_by}</td>
                <td>{item.items?.length || 0}</td>
                <td>{item.created_at}</td>
                <td className={`status ${item.Admin_status === "รออนุมัติ" ? "pending" :
                    item.Admin_status === "อนุมัติ" ? "approved" :
                      item.Admin_status === "ไม่อนุมัติ" ? "rejected" : ""
                  }`}>
                  {renderStatus(item.Admin_status)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="stuff-pagination">
        <div className="stuff-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="stuff-pagination-buttons">
          <button className="stuff-btn" disabled={currentPage === 1} onClick={handlePrev}>ก่อนหน้า</button>
          <input
            type="text"
            className="stuff-page-input"
            placeholder={`${currentPage} / ${totalPages}`}
            value={inputPage}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = parseInt(inputPage, 10);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                }
                setInputPage("");
                e.target.blur();
              }
            }}
          />
          <button className="stuff-btn" disabled={currentPage === totalPages} onClick={handleNext}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}
