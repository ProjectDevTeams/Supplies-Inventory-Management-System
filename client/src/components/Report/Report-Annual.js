import React, { useState, useEffect } from "react";
import "./Report-Annual.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ReportAnnual() {
  const data = [
    ["ผ้าหมึก EPSON LQ-310", "กล่อง", 1, 150.0],
    ["หมึกพิมพ์เลเซอร์ Global nano toner", "กล่อง", 1, 1990.0],
    ["กระดาษเช็ดหน้าแบบกล่อง (140 แผ่น/กล่อง)", "กล่อง", 32, 1266.88],
    ["ถุงขยะสีขาว (30×40)", "กิโลกรัม", 71, 3798.5],
    ["ถุงขยะสีดำ (18×20)", "กิโลกรัม", 14, 584.22],
    ["สบู่เหลวล้างมือ", "แกลลอน", 6, 898.88],
    ["กระดาษทิชชู่ Jumboroll 2 ชั้น ยาว 300 เมตร", "ลัง", 22, 16007.2],
    ["ถ่าน Panasonic AA", "แพ็ค", 1, 168.0],
    ["กระดาษ A3 Double A", "รีม", 1, 245.0],
    ["กระดาษ A4 Idea Work สีแดง", "ลัง", 3, 1800.0],
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedData = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  const exportToExcel = () => {
    const header = [["ชื่อวัสดุ", "หน่วย", "รวมยอดเบิก", "มูลค่ารวม"]];
    const rows = data.map((row) => [
      row[0],
      row[1],
      Math.round(row[2]),     // ✅ ไม่มีทศนิยม
      Math.round(row[3])      // ✅ ไม่มีทศนิยม
    ]);
    const wsData = [...header, ...rows];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "รายงานเบิกประจำปี");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "รายงานเบิกประจำปี.xlsx");
  };

  return (
    <div className="report-annual-container">
      <div className="report-annual-export-wrapper">
        <button onClick={exportToExcel} className="report-annual-export-btn" title="Export Excel">
          <img src="/image/excel-icon.png" alt="Export" className="excel-icon" />
          <span>Export Excel</span>
        </button>
      </div>

      <table className="report-annual-table">
        <thead>
          <tr>
            <th>ชื่อวัสดุ</th>
            <th>หน่วย</th>
            <th>รวมยอดเบิก</th>
            <th>มูลค่ารวม</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>
                  {typeof cell === "number"
                    ? cell.toLocaleString(undefined, { maximumFractionDigits: 0 })
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-annual-pagination-wrapper">
        <div className="report-annual-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, data.length)} จาก {data.length} แถว
        </div>
        <div className="report-annual-pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="report-annual-page-input"
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

export default ReportAnnual;
