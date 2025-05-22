import React, { useState, useEffect } from "react";
import "./Report-Issue.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import { API_URL } from "../../config";

function ReportIssue({ warehouse, fromMonth, fromYear, toMonth, toYear }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 10;

  const monthNameToNumber = (name) => {
    const months = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    return months.indexOf(name) + 1;
  };

  const formatToThaiDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear() + 543;
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/stuff_materials/get_stuff_materials.php`)
      .then((res) => {
        if (res.data.status === "success" && Array.isArray(res.data.data)) {
          const fromDate = fromMonth && fromYear
            ? new Date(`${parseInt(fromYear) - 543}-${monthNameToNumber(fromMonth)}-01`)
            : null;

          const toDate = toMonth && toYear
            ? new Date(`${parseInt(toYear) - 543}-${monthNameToNumber(toMonth)}-31`)
            : null;

          const filtered = res.data.data.filter((item) => {
            const createdAt = new Date(item.created_at);
            const matchWarehouse = warehouse === "ทั้งหมด" || item.stock_type === warehouse;
            const matchFrom = !fromDate || createdAt >= fromDate;
            const matchTo = !toDate || createdAt <= toDate;
            return matchWarehouse && matchFrom && matchTo;
          });

          setData(filtered);
        } else {
          console.error("รูปแบบข้อมูลผิด:", res.data);
        }
      })
      .catch((err) => {
        console.error("โหลดข้อมูลล้มเหลว:", err);
      });
  }, [warehouse, fromMonth, fromYear, toMonth, toYear]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedData = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  const exportToExcel = () => {
    const header = [["วันที่", "เลขที่", "ชื่อผู้ขอเบิก", "จำนวนรายการ", "มูลค่า"]];
    const rows = data.map((item) => [
      formatToThaiDate(item.created_at),
      item.running_code,
      item.full_name,
      item.items?.length || 0,
      Math.round(item.total_amount)
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
        <button onClick={exportToExcel} className="report-issue-export-btn">
          <img src="/image/excel-icon.png" alt="Export" className="excel-icon" />
          <span>Export Excel</span>
        </button>
      </div>

      <table className="report-issue-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>เลขที่</th>
            <th>ชื่อผู้ขอเบิก</th>
            <th>จำนวนรายการ</th>
            <th>มูลค่า</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td>{formatToThaiDate(item.created_at)}</td>
              <td>{item.running_code}</td>
              <td>{item.full_name}</td>
              <td>{item.items?.length || 0}</td>
              <td>{Math.round(item.total_amount).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-issue-pagination-wrapper">
        <div className="report-issue-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, data.length)} จาก {data.length} แถว
        </div>
        <div className="report-issue-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>ก่อนหน้า</button>
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
              }
            }}
            placeholder={`${currentPage} / ${totalPages}`}
          />
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default ReportIssue;
