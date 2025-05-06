import React, { useState, useEffect } from "react";
import "./Report-Issue.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ReportIssue() {
  const data = [
    ["25 เม.ย. 67", "005-04/2567", "นายเคนศต", "บุญรัตน์", "1 รายการ", 168.0],
    ["22 เม.ย. 67", "004-04/2567", "นางสาวปวิตา", "พวงเพ็ชร์", "18 รายการ", 3743.93],
    ["18 เม.ย. 67", "003-04/2567", "นางสาวจุลธิดา", "ยงอรุณกุล", "1 รายการ", 22.0],
    ["18 เม.ย. 67", "002-04/2567", "นายเคนศต", "บุญรัตน์", "1 รายการ", 1990.0],
    ["4 เม.ย. 67", "001-04/2567", "นางสาวปวิตา", "พวงเพ็ชร์", "20 รายการ", 3643.35],
    ["29 มี.ค. 67", "019-03/2567", "นายเคนศต", "บุญรัตน์", "1 รายการ", 600.0],
    ["28 มี.ค. 67", "018-03/2567", "นางสาวภัทรกร", "ศรีมนต์", "1 รายการ", 300.0],
    ["28 มี.ค. 67", "017-03/2567", "นางสาวภัทรกร", "ศรีมนต์", "36 รายการ", 4098.0],
    ["28 มี.ค. 67", "016-03/2567", "นางสาวภัทรกร", "ศรีมนต์", "3 รายการ", 935.0],
    ["25 มี.ค. 67", "015-03/2567", "นายเคนศต", "บุญรัตน์", "2 รายการ", 80.0],
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
    const header = [["วันที่", "เลขที่", "ชื่อ", "สกุล", "จำนวนรายการ", "มูลค่า"]];
    const rows = data.map((row) => [
      row[0],
      row[1],
      row[2],
      row[3],
      row[4],
      Math.round(row[5]) // ✅ ไม่มีทศนิยม
    ]);
    const wsData = [...header, ...rows];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "รายงานการเบิกวัสดุ");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "รายงานการเบิกวัสดุ.xlsx");
  };

  return (
    <div className="report-issue-container">
      <div className="report-issue-export-wrapper">
        <button onClick={exportToExcel} className="report-issue-export-btn" title="Export Excel">
          <img src="/image/excel-icon.png" alt="Export" className="excel-icon" />
          <span>Export Excel</span>
        </button>
      </div>

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
              <td>{Math.round(row[5]).toLocaleString()}</td> {/* ✅ ไม่มีทศนิยม */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-issue-pagination-wrapper">
        <div className="report-issue-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, data.length)} จาก {data.length} แถว
        </div>
        <div className="report-issue-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="report-issue-page-input"
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

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportIssue;
