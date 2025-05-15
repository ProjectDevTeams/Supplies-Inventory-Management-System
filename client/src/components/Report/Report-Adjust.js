import React, { useState, useEffect } from "react";
import "./Report-Adjust.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import { API_URL } from "../../config";

function ReportAdjust() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 10;

  // ✅ โหลดข้อมูลจาก API
  useEffect(() => {
    axios
      .get(`${API_URL}/adjustments/get_adjustments.php`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("ข้อมูลไม่ใช่อาเรย์:", res.data);
        }
      })
      .catch((err) => {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", err);
      });
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedData = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  const exportToExcel = () => {
    const header = [["ลำดับ", "จากคลัง", "รหัสวัสดุ", "จำนวนที่ปรับ", "วันที่"]];
    const rows = data.map((item) => [
      item.id,
      item.stock_type,
      item.material_id,
      item.adjust_quantity,
      item.created_at.split(" ")[0]
    ]);
    const wsData = [...header, ...rows];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "รายงานการปรับยอดวัสดุ");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "รายงานการปรับยอดวัสดุ.xlsx");
  };

  return (
    <div className="report-adjust-container">
      <div className="report-adjust-export-wrapper">
        <button onClick={exportToExcel} className="report-adjust-export-btn" title="Export Excel">
          <img src="/image/excel-icon.png" alt="Export" className="excel-icon" />
          <span>Export Excel</span>
        </button>
      </div>

      <table className="report-adjust-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>จากคลัง</th>
            <th>รหัสวัสดุ</th>
            <th>จำนวนที่ปรับ</th>
            <th>วันที่</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.stock_type}</td>
              <td>{item.material_id}</td>
              <td>{item.adjust_quantity}</td>
              <td>{item.created_at.split(" ")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-adjust-pagination-wrapper">
        <div className="report-adjust-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, data.length)} จาก {data.length} แถว
        </div>
        <div className="report-adjust-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="report-adjust-page-input"
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

export default ReportAdjust;
