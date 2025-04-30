import React, { useState } from "react";
import "./Report-Issue.css";

function ReportIssue() {
  const data = [
    ["25 เม.ย. 67", "005-04/2567", "นายเคนศต", "บุญรัตน์", "1 รายการ", 168.00],
    ["22 เม.ย. 67", "004-04/2567", "นางสาวปวิตา", "พวงเพ็ชร์", "18 รายการ", 3743.93],
    ["18 เม.ย. 67", "003-04/2567", "นางสาวจุลธิดา", "ยงอรุณกุล", "1 รายการ", 22.00],
    ["18 เม.ย. 67", "002-04/2567", "นายเคนศต", "บุญรัตน์", "1 รายการ", 1990.00],
    ["4 เม.ย. 67", "001-04/2567", "นางสาวปวิตา", "พวงเพ็ชร์", "20 รายการ", 3643.35],
    ["29 มี.ค. 67", "019-03/2567", "นายเคนศต", "บุญรัตน์", "1 รายการ", 600.00],
    ["28 มี.ค. 67", "018-03/2567", "นางสาวภัทรกร", "ศรีมนต์", "1 รายการ", 300.00],
    ["28 มี.ค. 67", "017-03/2567", "นางสาวภัทรกร", "ศรีมนต์", "36 รายการ", 4098.00],
    ["28 มี.ค. 67", "016-03/2567", "นางสาวภัทรกร", "ศรีมนต์", "3 รายการ", 935.00],
    ["25 มี.ค. 67", "015-03/2567", "นายเคนศต", "บุญรัตน์", "2 รายการ", 80.00],
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="report-issue-container">
      <table className="report-issue-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>เลขที่</th>
            <th>ชื่อ-สกุล</th>
            <th>รายการ</th>
            <th>มูลค่า</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]} {row[3]}</td>
              <td>{row[4]}</td>
              <td>{row[5].toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-issue-pagination">
        <div className="report-issue-pagination-info">
          แสดง {(currentPage - 1) * itemsPerPage + 1} ถึง{" "}
          {Math.min(currentPage * itemsPerPage, data.length)} จาก {data.length} แถว
        </div>
        <div className="report-issue-pagination-buttons">
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

export default ReportIssue;
