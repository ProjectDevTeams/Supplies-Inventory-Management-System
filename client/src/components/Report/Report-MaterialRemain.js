import React, { useState, useEffect } from "react";
import "./Report-MaterialRemain.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ReportMaterialRemain() {
  const materials = [
    ["ผ้าหมึก EPSON LQ-310", "กล่อง", 3, 0, 0, 2, 300.0],
    ["หมึกพิมพ์เลเซอร์ Global nano toner", "กล่อง", 1, 0, 0, 1, 1990.0],
    ["กระดาษเช็ดหน้าแบบกล่อง (140 แผ่น/กล่อง)", "กล่อง", 4, 20, 0, 0, 0.0],
    ["ถุงมือพลาสติก (1 แพ็ค บรรจุ 24 ชิ้น)", "แพ็ค", 14, 0, 0, 14, 179.76],
    ["ถุงขยะสีแดง (30×40)", "กิโลกรัม", 13, 0, 0, 13, 723.32],
    ["ถุงขยะสีขาว (30×40)", "กิโลกรัม", 124, 0, 43, 81, 4333.5],
    ["ถุงขยะสีดำ (18×20)", "กิโลกรัม", 30, 0, 8, 22, 918.06],
    ["สบู่เหลวล้างมือ", "แกลลอน", 7, 0, 4, 3, 449.4],
    ["แอลกอฮอล์ล้างมือ แบบน้ำ", "แกลลอน", 2, 0, 2, 0, 900.0],
    ["หลอดขนาด 21 ซม. (40แพ็ค/ลัง)", "แพ็ค", 40, 0, 0, 40, 428.0]
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const totalPages = Math.ceil(materials.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedData = materials.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  const exportToExcel = () => {
    const header = [
      ["", "รายงานยอดคงเหลือวัสดุ"],
      ["", "วันที่ 1 ก.พ. 67 ถึง 31 มี.ค. 67"],
      ["รหัส", "สินค้า", "หน่วย", "ยอดยกมา", "ยอดซื้อ", "ยอดเบิก", "คงเหลือ", "มูลค่า"]
    ];

    const dataWithCode = materials.map((row, index) => [
      `001-${String(index + 1).padStart(3, "0")}`,
      row[0],
      row[1],
      row[2],
      row[3],
      row[4],
      row[5],
      Math.round(row[6]) // ✅ ไม่มีจุดทศนิยม
    ]);

    const wsData = [...header, ...dataWithCode];
    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "รายงานยอดคงเหลือวัสดุ");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "รายงานยอดคงเหลือวัสดุ.xlsx");
  };

  return (
    <div className="report-remain-container">
      <div className="report-export-wrapper">
        <button onClick={exportToExcel} className="report-export-btn" title="Export Excel">
          <img src="/image/excel-icon.png" alt="Export" className="excel-icon" />
          <span>Export Excel</span>
        </button>
      </div>

      <table className="report-remain-table">
        <thead>
          <tr>
            <th>ชื่อวัสดุ</th>
            <th>หน่วย</th>
            <th>รวมยอดยกมา</th>
            <th>รวมยอดซื้อ</th>
            <th>รวมยอดเบิก</th>
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
                    ? cell.toLocaleString(undefined, { maximumFractionDigits: 0 })
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-pagination-wrapper">
        <div className="report-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, materials.length)} จาก {materials.length} รายการ
        </div>
        <div className="report-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="report-page-input"
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

export default ReportMaterialRemain;
