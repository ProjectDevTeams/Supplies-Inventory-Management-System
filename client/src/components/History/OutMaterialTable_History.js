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
    date: "10 ม.ค. 67 08:10:00",
    quantity: 5,
    totalPrice: 250.0,
    remaining: 3,
    remainingValue: 150.0,
    by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    status: "อนุมัติ",
  },
  {
    date: "12 ม.ค. 67ห 09:30:00",
    quantity: 12,
    totalPrice: 540.0,
    remaining: 8,
    remainingValue: 200.0,
    by: "ฝ่ายคลังกลาง",
    status: "อนุมัติ",
  },
  {
    date: "14 ม.ค. 67 10:00:00",
    quantity: 2,
    totalPrice: 80.0,
    remaining: 2,
    remainingValue: 80.0,
    by: "ฝ่ายงานจำลอง",
    status: "อนุมัติ",
  },
  {
    date: "18 ม.ค. 67 11:45:00",
    quantity: 7,
    totalPrice: 430.0,
    remaining: 4,
    remainingValue: 160.0,
    by: "ฝ่ายคลังกลาง",
    status: "อนุมัติ",
  },
  {
    date: "22 ม.ค. 67 13:00:00",
    quantity: 4,
    totalPrice: 190.0,
    remaining: 1,
    remainingValue: 50.0,
    by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    status: "อนุมัติ",
  },
  {
    date: "26 ม.ค. 67 14:20:00",
    quantity: 10,
    totalPrice: 700.0,
    remaining: 6,
    remainingValue: 300.0,
    by: "ฝ่ายคลังกลาง",
    status: "อนุมัติ",
  },
  {
    date: "28 ม.ค. 67 15:10:00",
    quantity: 3,
    totalPrice: 120.0,
    remaining: 2,
    remainingValue: 70.0,
    by: "ฝ่ายงานจำลอง",
    status: "อนุมัติ",
  },
  {
    date: "2 ก.พ. 67 08:50:00",
    quantity: 8,
    totalPrice: 560.0,
    remaining: 5,
    remainingValue: 210.0,
    by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    status: "อนุมัติ",
  },
  {
    date: "6 ก.พ. 67 09:25:00",
    quantity: 6,
    totalPrice: 320.0,
    remaining: 4,
    remainingValue: 140.0,
    by: "ฝ่ายงานจำลอง",
    status: "อนุมัติ",
  },
  {
    date: "9 ก.พ. 67 10:40:00",
    quantity: 11,
    totalPrice: 610.0,
    remaining: 7,
    remainingValue: 310.0,
    by: "ฝ่ายคลังกลาง",
    status: "อนุมัติ",
  },
  {
    date: "13 ก.พ. 67 12:00:00",
    quantity: 1,
    totalPrice: 45.0,
    remaining: 1,
    remainingValue: 45.0,
    by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    status: "อนุมัติ",
  },
  {
    date: "17 ก.พ. 67 14:15:00",
    quantity: 15,
    totalPrice: 900.0,
    remaining: 10,
    remainingValue: 400.0,
    by: "ฝ่ายงานจำลอง",
    status: "อนุมัติ",
  },
  {
    date: "21 ก.พ. 67 16:20:00",
    quantity: 4,
    totalPrice: 230.0,
    remaining: 3,
    remainingValue: 110.0,
    by: "ฝ่ายคลังกลาง",
    status: "อนุมัติ",
  },
  {
    date: "25 ก.พ. 67 10:05:00",
    quantity: 9,
    totalPrice: 660.0,
    remaining: 5,
    remainingValue: 280.0,
    by: "ฝ่ายงานจำลอง",
    status: "อนุมัติ",
  },
  {
    date: "1 มี.ค. 67 08:30:00",
    quantity: 13,
    totalPrice: 820.0,
    remaining: 8,
    remainingValue: 390.0,
    by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    status: "อนุมัติ",
  },
  {
    date: "3 มี.ค. 67 09:50:00",
    quantity: 6,
    totalPrice: 340.0,
    remaining: 4,
    remainingValue: 180.0,
    by: "ฝ่ายคลังกลาง",
    status: "อนุมัติ",
  },
  {
    date: "6 มี.ค. 67 11:10:00",
    quantity: 5,
    totalPrice: 275.0,
    remaining: 3,
    remainingValue: 130.0,
    by: "ฝ่ายงานจำลอง",
    status: "อนุมัติ",
  },
  {
    date: "8 มี.ค. 67 12:30:00",
    quantity: 2,
    totalPrice: 95.0,
    remaining: 2,
    remainingValue: 95.0,
    by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    status: "อนุมัติ",
  },
  {
    date: "10 มี.ค. 67 14:00:00",
    quantity: 7,
    totalPrice: 410.0,
    remaining: 4,
    remainingValue: 180.0,
    by: "ฝ่ายคลังกลาง",
    status: "อนุมัติ",
  },
  {
    date: "13 มี.ค. 67 15:20:00",
    quantity: 3,
    totalPrice: 160.0,
    remaining: 2,
    remainingValue: 80.0,
    by: "ฝ่ายงานจำลอง",
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
