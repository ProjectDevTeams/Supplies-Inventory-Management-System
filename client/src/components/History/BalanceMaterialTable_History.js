// BalanceMaterialTable_History.js
import React, { useState } from "react";
import "./BalanceMaterialTable_History.css";

const thaiMonths = {
  "ม.ค.": "01", "มกราคม": "01",
  "ก.พ.": "02", "กุมภาพันธ์": "02",
  "มี.ค.": "03", "มีนาคม": "03",
  "เม.ย.": "04", "เมษายน": "04",
  "พ.ค.": "05", "พฤษภาคม": "05",
  "มิ.ย.": "06", "มิถุนายน": "06",
  "ก.ค.": "07", "กรกฎาคม": "07",
  "ส.ค.": "08", "สิงหาคม": "08",
  "ก.ย.": "09", "กันยายน": "09",
  "ต.ค.": "10", "ตุลาคม": "10",
  "พ.ย.": "11", "พฤศจิกายน": "11",
  "ธ.ค.": "12", "ธันวาคม": "12"
};

function parseThaiDate(str) {
  const parts = str.trim().split(" ");
  const day = parts[0].padStart(2, '0');
  const month = thaiMonths[parts[1]];
  const year = parseInt(parts[2], 10) + 2000;
  const time = parts[3] || "00:00:00";
  return new Date(`${year}-${month}-${day}T${time}`);
}

const mockData = [
  {
    id: 1455,
    date: "19 พ.ย. 66 15:57:11",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    purchaseDate: "11 ก.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1446,
    date: "27 พ.ย. 66 13:30:35",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    purchaseDate: "4 ก.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1442,
    date: "5 มี.ค. 67 09:36:27",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    purchaseDate: "1 ม.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1441,
    date: "6 เม.ย. 67 14:15:10",
    stock: "วัสดุนอกคลัง",
    company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    purchaseDate: "29 มิ.ย. 66",
    status: "อนุมัติ",
  },
];

function BalanceMaterialTable_History() {
  const [sortBy, setSortBy] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const sortedData = [...mockData].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === "date" || sortBy === "purchaseDate") {
      valA = parseThaiDate(valA);
      valB = parseThaiDate(valB);
    }

    if (typeof valA === "number") {
      return sortAsc ? valA - valB : valB - valA;
    } else if (valA instanceof Date) {
      return sortAsc ? valA - valB : valB - valA;
    } else {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });

  return (
    <div className="history-balance-table-container">
      <table className="history-balance-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
              ลำดับ {sortBy === "id" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th
              onClick={() => handleSort("date")}
              style={{ cursor: "pointer" }}
            >
              วันที่ {sortBy === "date" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th>จากคลัง</th>
            <th>บริษัท/ร้านค้า</th>
            <th
              onClick={() => handleSort("purchaseDate")}
              style={{ cursor: "pointer" }}
            >
              วันที่ซื้อ{" "}
              {sortBy === "purchaseDate" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.stock}</td>
              <td>{item.company}</td>
              <td>{item.purchaseDate}</td>
              <td className="history-balance-status approved">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BalanceMaterialTable_History;
