import React, { useState, useEffect } from "react";
import "./Report-Receive.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import { API_URL } from "../../config";

export default function ReportLowStock({ warehouse, setLowStockCount }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 10;

useEffect(() => {
  axios.get(`${API_URL}/materials/get_materials.php`)
    .then(res => {
      if (res.data.status === "success") {
        let filtered = res.data.data.filter(item =>
          item.status === "วัสดุใกล้หมดสต็อก" &&
          (warehouse === "ทั้งหมด" || item.location === warehouse)
        );
        const transformed = filtered.map(item => [
          item.name,
          item.unit,
          Number(item.remain),
          Number(item.price),
          Number(item.remain * item.price)
        ]);
        setData(transformed);
        if (setLowStockCount) {
          setLowStockCount(transformed.length); // ✅ แก้ตรงนี้
        }
      }
    });
}, [warehouse]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedData = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  const exportToExcel = () => {
    const header = [["ชื่อวัสดุ", "หน่วย", "คงเหลือ", "ราคาต่อหน่วย", "มูลค่ารวม"]];
    const rows = data.map(row => [
      row[0],
      row[1],
      Math.round(row[2]),
      Math.round(row[3]),
      Math.round(row[4])
    ]);
    const ws = XLSX.utils.aoa_to_sheet([...header, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "วัสดุใกล้หมดสต็อก");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), "รายงานวัสดุใกล้หมดสต็อก.xlsx");
  };

  return (
    <div className="report-receive-container">
      <div className="report-receive-export-wrapper">
        <button onClick={exportToExcel} className="report-receive-export-btn" title="Export Excel">
          <img src="/image/excel-icon.png" alt="Export" className="excel-icon" />
          <span>Export Excel</span>
        </button>
      </div>

      <table className="report-receive-table">
        <thead>
          <tr>
            <th>ชื่อวัสดุ</th>
            <th>หน่วย</th>
            <th>คงเหลือ</th>
            <th>ราคาต่อหน่วย</th>
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
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, data.length)} จาก {data.length} รายการ
        </div>
        <div className="report-pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="report-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            onFocus={() => setInputPage("")}
            onChange={e => setInputPage(e.target.value)}
            onKeyDown={e => {
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
