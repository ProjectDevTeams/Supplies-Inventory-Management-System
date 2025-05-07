import React, { useState, useEffect } from "react";
import "./Report-LowStock.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ReportLowStock() {
  const allData = [
    ["3M Scotch เทปกาวสองหน้า แรงยึดสูงชนิดใส 19 มม.*4ม.", "ม้วน", 1, 1, 220.0],
    ["Elfen ลิ้นแฟ้มโลหะสีทอง", "กล่อง", 2, 2, 132.0],
    ["One Whiteboard Marker สีน้ำเงิน", "ด้าม", 1, 1, 17.5],
    ["Pentel ชุดปากกาลบคำผิด", "ชุด", 1, 1, 55.0],
    ["POST-IT กระดาษโน้ต ขนาด 3*3 นิ้ว", "ก้อน", 5, 5, 150.0],
    ["Quantum ยางลบ", "อัน", 2, 2, 44.0],
    ["Scotch กระดาษกาวย่น แกน 3นิ้ว 36มม.x20หลา สีครีม", "ม้วน", 5, 5, 200.0],
    ["Tape Cassette เทปสำหรับเครื่องพิมพ์ฉลาก", "อัน", 2, 2, 900.0],
    ["Whiteboard Monomi สีแดง", "ด้าม", 1, 1, 17.5],
    ["Whiteboard Monomi สีน้ำเงิน", "ด้าม", 1, 1, 17.5],
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = allData.filter((row) =>
    row[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  const exportToExcel = () => {
    const header = [["ชื่อวัสดุ", "หน่วย", "ยอดต่ำสุด", "ยอดคงเหลือ", "มูลค่ารวม"]];
    const rows = filteredData.map((row) => [
      row[0],
      row[1],
      row[2],
      row[3],
      Math.round(row[4]) // ✅ ไม่มีทศนิยม
    ]);
    const wsData = [...header, ...rows];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "รายงานวัสดุคงเหลือต่ำ");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "รายงานวัสดุคงเหลือต่ำ.xlsx");
  };

  return (
    <div className="report-lowstock-container">
      <div className="report-lowstock-controls">
        <div className="report-lowstock-search-group">
          <label>ค้นหา</label>
          <input
            type="text"
            placeholder="🔍 ค้นหา"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="report-lowstock-export-wrapper">
          <button onClick={exportToExcel} className="report-lowstock-export-btn" title="Export Excel">
            <img src="/image/excel-icon.png" alt="Export" className="excel-icon" />
            <span>Export Excel</span>
          </button>
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
                    ? Math.round(cell).toLocaleString() // ✅ ไม่มีทศนิยมบนหน้าจอ
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-lowstock-pagination-wrapper">
        <div className="report-lowstock-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="report-lowstock-pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="report-lowstock-page-input"
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

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportLowStock;
