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
    id: 1439,
    date: "9 พ.ย. 66 10:00:00",
    stock: "วัสดุในคลัง",
    company: "บริษัท สมาร์ทซัพพลาย จำกัด",
    purchaseDate: "8 ก.ย. 66",
    status: "อนุมัติ",
  },
  {
    id: 1437,
    date: "12 พ.ย. 66 09:45:00",
    stock: "วัสดุนอกคลัง",
    company: "บริษัท โปรแวร์ อินโนเทค",
    purchaseDate: "2 ส.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1435,
    date: "15 พ.ย. 66 13:30:00",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายวิจัยนวัตกรรม",
    purchaseDate: "10 ก.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1433,
    date: "20 พ.ย. 66 08:50:00",
    stock: "วัสดุนอกคลัง",
    company: "ฝ่ายวิศวกรรมซ่อมบำรุง",
    purchaseDate: "25 เม.ย. 66",
    status: "อนุมัติ",
  },
  {
    id: 1431,
    date: "22 พ.ย. 66 15:20:00",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    purchaseDate: "15 มี.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1429,
    date: "25 พ.ย. 66 11:15:00",
    stock: "วัสดุนอกคลัง",
    company: "ฝ่ายงานจำลอง",
    purchaseDate: "1 ก.พ. 66",
    status: "อนุมัติ",
  },
  {
    id: 1427,
    date: "28 พ.ย. 66 10:00:00",
    stock: "วัสดุในคลัง",
    company: "บริษัท ซัพพลายเอ็กซ์ จำกัด",
    purchaseDate: "9 เม.ย. 66",
    status: "อนุมัติ",
  },
  {
    id: 1425,
    date: "30 พ.ย. 66 16:45:00",
    stock: "วัสดุนอกคลัง",
    company: "ฝ่ายบริหารกลาง",
    purchaseDate: "12 พ.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1423,
    date: "2 ธ.ค. 66 09:00:00",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายเทคโนโลยีดิจิทัล",
    purchaseDate: "7 ม.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1421,
    date: "5 ธ.ค. 66 13:30:00",
    stock: "วัสดุนอกคลัง",
    company: "ฝ่ายวิจัยและพัฒนา",
    purchaseDate: "3 เม.ย. 66",
    status: "อนุมัติ",
  },
  {
    id: 1419,
    date: "7 ธ.ค. 66 11:00:00",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายงานสนับสนุน",
    purchaseDate: "5 พ.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1417,
    date: "9 ธ.ค. 66 14:10:00",
    stock: "วัสดุนอกคลัง",
    company: "บริษัท วิชั่นซิสเต็มส์ จำกัด",
    purchaseDate: "1 ก.ย. 66",
    status: "อนุมัติ",
  },
  {
    id: 1415,
    date: "11 ธ.ค. 66 15:25:00",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายนวัตกรรมสุขภาพ",
    purchaseDate: "22 ส.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1413,
    date: "13 ธ.ค. 66 10:30:00",
    stock: "วัสดุนอกคลัง",
    company: "ฝ่ายจัดซื้อกลาง",
    purchaseDate: "14 มิ.ย. 66",
    status: "อนุมัติ",
  },
  {
    id: 1411,
    date: "15 ธ.ค. 66 12:00:00",
    stock: "วัสดุในคลัง",
    company: "บริษัท โซลูชั่นแล็บ",
    purchaseDate: "18 ส.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1409,
    date: "17 ธ.ค. 66 09:45:00",
    stock: "วัสดุนอกคลัง",
    company: "ฝ่ายแผนและนโยบาย",
    purchaseDate: "2 ก.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1407,
    date: "19 ธ.ค. 66 11:15:00",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายอาคารสถานที่",
    purchaseDate: "30 มิ.ย. 66",
    status: "อนุมัติ",
  },
  {
    id: 1405,
    date: "21 ธ.ค. 66 10:50:00",
    stock: "วัสดุนอกคลัง",
    company: "ฝ่ายวิชาการ",
    purchaseDate: "15 ก.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1403,
    date: "23 ธ.ค. 66 13:15:00",
    stock: "วัสดุในคลัง",
    company: "บริษัท อีโคเทค จำกัด",
    purchaseDate: "9 ก.ย. 66",
    status: "อนุมัติ",
  },
  {
    id: 1401,
    date: "25 ธ.ค. 66 15:40:00",
    stock: "วัสดุนอกคลัง",
    company: "ฝ่ายงานวิจัยพิเศษ",
    purchaseDate: "6 ก.พ. 66",
    status: "อนุมัติ",
  },
  {
    id: 1399,
    date: "27 ธ.ค. 66 10:00:00",
    stock: "วัสดุในคลัง",
    company: "ฝ่ายการเงินและบัญชี",
    purchaseDate: "20 มี.ค. 66",
    status: "อนุมัติ",
  },
  {
    id: 1397,
    date: "29 ธ.ค. 66 12:30:00",
    stock: "วัสดุนอกคลัง",
    company: "บริษัท เอ็นจิเนียริ่ง จำกัด",
    purchaseDate: "15 เม.ย. 66",
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
