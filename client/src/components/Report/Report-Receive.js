import React, { useState } from "react";
import "./Report-Receive.css";

function ReportReceive() {
  const data = [
    ["กระดาษเช็ดหน้าแบบกล่อง (140 แผ่น/กล่อง)", "กล่อง", 20, 791.80],
    // เพิ่มข้อมูลจำลองตามต้องการ
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="report-receive-container">
      <table className="report-receive-table">
        <thead>
          <tr>
            <th>ชื่อวัสดุ</th>
            <th>หน่วย</th>
            <th>รวมยอดซื้อ</th>
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

      <div className="report-receive-pagination">
        <div className="report-receive-pagination-info">
          แสดง {(currentPage - 1) * itemsPerPage + 1} ถึง{" "}
          {Math.min(currentPage * itemsPerPage, data.length)} จาก {data.length} รายการ
        </div>
        <div className="report-receive-pagination-buttons">
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

export default ReportReceive;
