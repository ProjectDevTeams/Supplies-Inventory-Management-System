import React, { useState } from "react";
import "./OutMaterialTable_History.css";

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
  "ธ.ค.": "12", "ธันวาคม": "12",
};

function parseThaiDate(str) {
  const parts = str.trim().split(" ");
  const day = parts[0].padStart(2, "0");
  const month = thaiMonths[parts[1]];
  const year = parseInt(parts[2], 10) + 2000;
  const time = parts[3] || "00:00:00";
  return new Date(`${year}-${month}-${day}T${time}`);
}

const mockData = [
  {
    date: "5 มี.ค. 67 09:36:27",
    quantity: 7,
    totalPrice: 122.5,
    remaining: 1,
    remainingValue: 17.5,
    by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    status: "อนุมัติ",
  },

  {
    date: "7 มี.ค. 68 09:36:27",
    quantity: 9,
    totalPrice: 1122.5,
    remaining: 10,
    remainingValue: 117.5,
    by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    status: "อนุมัติ",
  },
  // เพิ่มข้อมูลเพิ่มเติมได้ที่นี่
];

function OutMaterialTable_History() {
  const [sortBy, setSortBy] = useState("date");
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

    if (sortBy === "date") {
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
    <div className="history-out-table-container">
      <table className="history-out-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
              วันที่ {sortBy === "date" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("quantity")} style={{ cursor: "pointer" }}>
              จำนวนเบิก {sortBy === "quantity" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("totalPrice")} style={{ cursor: "pointer" }}>
              ราคารวม {sortBy === "totalPrice" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("remaining")} style={{ cursor: "pointer" }}>
              จำนวนคงเหลือ {sortBy === "remaining" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("remainingValue")} style={{ cursor: "pointer" }}>
              มูลค่าคงเหลือ {sortBy === "remainingValue" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th>โดย</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.quantity}</td>
              <td>{item.totalPrice.toFixed(2)}</td>
              <td>{item.remaining}</td>
              <td>{item.remainingValue.toFixed(2)}</td>
              <td className="history-out-left-align">{item.by}</td>
              <td className={`history-out-status approved`}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OutMaterialTable_History;
