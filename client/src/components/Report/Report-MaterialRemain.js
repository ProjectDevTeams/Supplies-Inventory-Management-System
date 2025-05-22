import React, { useState, useEffect } from "react";
import "./Report-MaterialRemain.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import { API_URL } from "../../config";

function ReportMaterialRemain({ warehouse, fromMonth, fromYear, toMonth, toYear }) {
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
      .get(`${API_URL}/materials/get_materials.php`)
      .then((res) => {
        if (res.data.status === "success" && Array.isArray(res.data.data)) {
          let filtered = [];

          const fromDate = fromMonth && fromYear
            ? new Date(`${parseInt(fromYear) - 543}-${monthNameToNumber(fromMonth)}-01`)
            : null;

          const toDate = toMonth && toYear
            ? new Date(`${parseInt(toYear) - 543}-${monthNameToNumber(toMonth)}-31`)
            : null;

          res.data.data.forEach((item) => {
            const createdAt = new Date(item.created_at);

            if (
              (!fromDate || createdAt >= fromDate) &&
              (!toDate || createdAt <= toDate)
            ) {
              if (warehouse === "ทั้งหมด" || item.location === warehouse) {
                filtered.push({
                  name: item.name,
                  unit: item.unit,
                  carry: item.carry_over_quantity,
                  brought: item.brought,
                  issued: item.issued_quantity,
                  remain: item.remain,
                  value: Math.round(parseFloat(item.price || 0) * item.remain),
                  date: formatToThaiDate(item.created_at)
                });
              }
            }
          });

          setData(filtered);
        } else {
          console.error("ข้อมูลผิดรูปแบบ:", res.data);
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
    const header = [["ลำดับ", "ชื่อวัสดุ", "หน่วย", "ยอดยกมา", "ยอดซื้อ", "ยอดเบิก", "คงเหลือ", "มูลค่า", "วันที่"]];
    const rows = data.map((item, index) => [
      index + 1,
      item.name,
      item.unit,
      item.carry,
      item.brought,
      item.issued,
      item.remain,
      item.value,
      item.date
    ]);
    const wsData = [...header, ...rows];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "รายงานยอดคงเหลือวัสดุ");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "รายงานยอดคงเหลือวัสดุ.xlsx");
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
            <th>ชื่อวัสดุ</th>
            <th>หน่วย</th>
            <th>ยอดยกมา</th>
            <th>ยอดซื้อ</th>
            <th>ยอดเบิก</th>
            <th>คงเหลือ</th>
            <th>มูลค่า</th>
            <th>วันที่</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.name}</td>
              <td>{item.unit}</td>
              <td>{item.carry}</td>
              <td>{item.brought}</td>
              <td>{item.issued}</td>
              <td>{item.remain}</td>
              <td>{item.value}</td>
              <td>{item.date}</td>
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

export default ReportMaterialRemain;
