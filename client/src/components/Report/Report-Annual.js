import React, { useState } from "react";
import "./Report-Annual.css";

function ReportAnnual() {
  const data = [
    ["ผ้าหมึก EPSON LQ-310", "กล่อง", 1, 150.00],
    ["หมึกพิมพ์เลเซอร์ Global nano toner", "กล่อง", 1, 1990.00],
    ["กระดาษเช็ดหน้าแบบกล่อง (140 แผ่น/กล่อง)", "กล่อง", 32, 1266.88],
    ["ถุงขยะสีขาว (30×40)", "กิโลกรัม", 71, 3798.50],
    ["ถุงขยะสีดำ (18×20)", "กิโลกรัม", 14, 584.22],
    ["สบู่เหลวล้างมือ", "แกลลอน", 6, 898.88],
    ["กระดาษทิชชู่ Jumboroll 2 ชั้น ยาว 300 เมตร", "ลัง", 22, 16007.20],
    ["ถ่าน Panasonic AA", "แพ็ค", 1, 168.00],
    ["กระดาษ A3 Double A", "รีม", 1, 245.00],
    ["กระดาษ A4 Idea Work สีแดง", "ลัง", 3, 1800.00],
    // เพิ่มข้อมูลจำลองเพิ่มเติมได้
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="report-annual-container">
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
                    ? cell.toLocaleString(undefined, { minimumFractionDigits: 2 })
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-annual-pagination">
        <div className="report-annual-pagination-info">
          แสดง {(currentPage - 1) * itemsPerPage + 1} ถึง{" "}
          {Math.min(currentPage * itemsPerPage, data.length)} จาก {data.length} แถว
        </div>
        <div className="report-annual-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            ก่อนหน้า
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportAnnual;
