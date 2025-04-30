import React, { useState } from "react";
import "./Report-LowStock.css";

function ReportLowStock() {
  const allData = [
    ["3M Scotch เทปกาวสองหน้า แรงยึดสูงชนิดใส 19 มม.*4ม.", "ม้วน", 1, 1, 220.00],
    ["Elfen ลิ้นแฟ้มโลหะสีทอง", "กล่อง", 2, 2, 132.00],
    ["One Whiteboard Marker สีน้ำเงิน", "ด้าม", 1, 1, 17.50],
    ["Pentel ชุดปากกาลบคำผิด", "ชุด", 1, 1, 55.00],
    ["POST-IT กระดาษโน้ต ขนาด 3*3 นิ้ว", "ก้อน", 5, 5, 150.00],
    ["Quantum ยางลบ", "อัน", 2, 2, 44.00],
    ["Scotch กระดาษกาวย่น แกน 3นิ้ว 36มม.x20หลา สีครีม", "ม้วน", 5, 5, 200.00],
    ["Tape Cassette เทปสำหรับเครื่องพิมพ์ฉลาก", "อัน", 2, 2, 900.00],
    ["Whiteboard Monomi สีแดง", "ด้าม", 1, 1, 17.50],
    ["Whiteboard Monomi สีน้ำเงิน", "ด้าม", 1, 1, 17.50],
    // ข้อมูลจำลองเพิ่มได้อีก
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [warehouse, setWarehouse] = useState("ทั้งหมด");

  const filteredData = allData.filter(row =>
    row[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="report-lowstock-container">
      <div className="report-lowstock-controls">
        <div className="report-lowstock-select-group">
          <label>คลังวัสดุ</label>
          <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
            <option>ทั้งหมด</option>
            <option>วัสดุในคลัง</option>
            <option>วัสดุนอกคลัง</option>
          </select>
        </div>
        <div className="report-lowstock-search-group">
          <label>ค้นหา</label>
          <input
            type="text"
            placeholder="🔍 ค้นหา"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="report-lowstock-table">
        <thead>
          <tr>
            <th>ชื่อวัสดุ</th>
            <th>หน่วย</th>
            <th>ยอดต่ำสุด</th>
            <th>ยอดคงเหลือ</th>
            <th>มูลค่ารวม</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>
                  {typeof cell === "number"
                    ? cell.toLocaleString(undefined, { minimumFractionDigits: 2 })
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-lowstock-pagination">
        <div className="report-lowstock-pagination-info">
          แสดง {(currentPage - 1) * itemsPerPage + 1} ถึง{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="report-lowstock-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>ก่อนหน้า</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default ReportLowStock;
