import React, { useState, useEffect } from "react";
import "./Report-Adjust.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import { API_URL } from "../../config";

const thaiMonths = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

function ReportAdjust({ warehouse, fromMonth, fromYear, toMonth, toYear }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 10;

  const monthNameToNumber = name => {
    const full = [
      "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
      "พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม",
      "กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"
    ];
    return full.indexOf(name) + 1;
  };

  const formatToThaiDate = dateStr => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const m = d.getMonth();
    const year = d.getFullYear() + 543;
    return `${day} ${thaiMonths[m]} ${year}`;
  };

  useEffect(() => {
    axios.get(`${API_URL}/adjustment_items/get_adjustment_items.php`)
      .then(res => {
        if (res.data.status === "success" && Array.isArray(res.data.data)) {
          const fromDate = fromMonth && fromYear
            ? new Date(`${parseInt(fromYear) - 543}-${monthNameToNumber(fromMonth)}-01`)
            : null;
          const toDate = toMonth && toYear
            ? new Date(`${parseInt(toYear) - 543}-${monthNameToNumber(toMonth)}-31`)
            : null;

          const flattened = [];
          res.data.data.forEach(adj => {
            const adjustDate = new Date(adj.created_date);
            if (
              (!fromDate || adjustDate >= fromDate) &&
              (!toDate   || adjustDate <= toDate)
            ) {
              adj.items.forEach(item => {
                if (warehouse === "ทั้งหมด" || item.stock_type === warehouse) {
                  flattened.push({
                    stock_type: item.stock_type,
                    material_name: item.material_name,
                    old_quantity: item.old_quantity,
                    quantity: item.quantity,
                    difference: item.difference, // ✅ เพิ่มคอลัมน์ส่วนต่าง
                    full_name: adj.full_name,
                    date: formatToThaiDate(adj.created_date)
                  });
                }
              });
            }
          });
          setData(flattened);
        }
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
    const header = [
      ["ลำดับ","จากคลัง","ชื่อวัสดุ","จำนวนเดิม","จำนวนที่ปรับ","ส่วนต่าง","ผู้รับผิดชอบ","วันที่ปรับยอด"]
    ];
    const rows = data.map((item, i) => [
      i + 1,
      item.stock_type,
      item.material_name,
      item.old_quantity,
      item.quantity,
      item.difference, // ✅ ส่งออกส่วนต่างด้วย
      item.full_name,
      item.date
    ]);
    const ws = XLSX.utils.aoa_to_sheet([...header, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "รายงานการปรับยอดวัสดุ");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), "รายงานการปรับยอดวัสดุ.xlsx");
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
            <th>ส่วนต่าง</th> {/* ✅ เพิ่มคอลัมน์ */}
            <th>ผู้รับผิดชอบ</th>
            <th>วันที่ปรับยอด</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.stock_type}</td>
              <td>{item.material_name}</td>
              <td>{item.old_quantity}</td>
              <td>{item.quantity}</td>
              <td>{item.difference}</td> {/* ✅ แสดงค่าความต่าง */}
              <td>{item.full_name}</td>
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
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>ก่อนหน้า</button>
          <input
            type="number"
            className="report-adjust-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            onFocus={() => setInputPage("")}
            onChange={e => setInputPage(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                const val = parseInt(inputPage, 10);
                if (val >= 1 && val <= totalPages) setCurrentPage(val);
                e.target.blur();
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

export default ReportAdjust;
