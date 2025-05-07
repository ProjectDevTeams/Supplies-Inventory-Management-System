import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Adjust-table.css";

const mockAdjustData = [
  { id: "1", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "21 พ.ย. 66", state: "อนุมัติ" },
  { id: "2", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "21 พ.ย. 66", state: "อนุมัติ" },
  { id: "3", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "21 ก.ย. 66", state: "อนุมัติ" },
  { id: "4", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "21 ก.ค. 66", state: "อนุมัติ" },
  { id: "5", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "21 ก.ค. 66", state: "อนุมัติ" },
  { id: "6", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "21 ก.ค. 66", state: "อนุมัติ" },
  { id: "7", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "21 ก.ค. 66", state: "อนุมัติ" },
  { id: "8", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "19 ก.ค. 66", state: "อนุมัติ" },
  { id: "9", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "19 ก.ค. 66", state: "อนุมัติ" },
  { id: "10", from: "วัสดุในคลัง", company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "19 ก.ค. 66", state: "อนุมัติ" },
];

function AdjustTable({ searchTerm }) {
  const navigate = useNavigate(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 10;

  const filteredData = mockAdjustData.filter((item) =>
    item.id.toString().includes(searchTerm.toLowerCase()) ||
    item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.orderDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.state.toLowerCase().includes(searchTerm.toLowerCase())
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
    setInputPage(""); // เคลียร์เมื่อเปลี่ยนหน้า
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
            <th className="adjustment-th">บริษัท/ร้านค้า</th>
            <th className="adjustment-th">วันที่ซื้อ</th>
            <th className="adjustment-th">สถานะ</th>
          </tr>
        </thead>
        <tbody id="adjustment-tbody">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id} className="adjustment-tr">
                <td className="adjustment-td">{item.id}</td>
                <td className="adjustment-td">{item.from}</td>
                <td
                  className="adjustment-td"
                  style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => navigate('/adjust/balance')}
                >
                  {item.company}
                </td>
                <td className="adjustment-td">{item.orderDate}</td>
                <td className={`adjustment-td ${item.state === "อนุมัติ"
                    ? "status-approved"
                    : item.state === "รออนุมัติ"
                      ? "status-pending"
                      : "status-not-pending"
                  }`}>
                  {item.state}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="adjustment-td" colSpan="5">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
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
