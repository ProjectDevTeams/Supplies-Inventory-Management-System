import React, { useState, useEffect } from "react";
import "./Report-Adjust.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import { API_URL } from "../../config";

function ReportAdjust({ warehouse, fromMonth, fromYear, toMonth, toYear }) {
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
      .get(`${API_URL}/adjustment_items/get_adjustment_items.php`)
      .then((res) => {
        if (res.data.status === "success" && Array.isArray(res.data.data)) {
          let flattened = [];

          const fromDate = fromMonth && fromYear
            ? new Date(`${parseInt(fromYear) - 543}-${monthNameToNumber(fromMonth)}-01`)
            : null;

          const toDate = toMonth && toYear
            ? new Date(`${parseInt(toYear) - 543}-${monthNameToNumber(toMonth)}-31`)
            : null;

          res.data.data.forEach((adjustment) => {
            const adjustDate = new Date(adjustment.created_date);

            if (
              (!fromDate || adjustDate >= fromDate) &&
              (!toDate || adjustDate <= toDate)
            ) {
              adjustment.items.forEach((item) => {
                if (warehouse === "ทั้งหมด" || item.stock_type === warehouse) {
                  flattened.push({
                    stock_type: item.stock_type,
                    material_name: item.material_name,
                    quantity: item.quantity,
                    old_quantity: item.old_quantity,
                    date: formatToThaiDate(adjustment.created_date),
                    full_name: adjustment.full_name,
                  });
                }
              });
            }
          });

          setData(flattened);
        } else {
          console.error("ข้อมูลผิดรูปแบบ:", res.data);
        }
      })
      .catch((err) => {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", err);
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
    const header = [["ลำดับ", "จากคลัง", "ชื่อวัสดุ", "จำนวนเดิม", "จำนวนที่ปรับ", "วันที่", "ผู้รับผิดชอบ"]];
    const rows = data.map((item, index) => [
      index + 1, // ลำดับอัตโนมัติ
      item.stock_type,
      item.material_name,
      item.old_quantity,
      item.quantity,
      item.date,
      item.full_name,
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
            <th>ชื่อวัสดุ</th>
            <th>จำนวนเดิม</th>
            <th>จำนวนที่ปรับ</th>
            <th>วันที่</th>
            <th>ผู้รับผิดชอบ</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td> {/* ลำดับเรียงเอง */}
              <td>{item.stock_type}</td>
              <td>{item.material_name}</td>
              <td>{item.old_quantity}</td>
              <td>{item.quantity}</td>
              <td>{item.date}</td>
              <td>{item.full_name}</td>
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
