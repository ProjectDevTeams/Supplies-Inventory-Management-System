import React, { useState, useEffect } from "react";
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
  const day = parts[0].padStart(2, "0");
  const month = thaiMonths[parts[1]];
  const year = parseInt(parts[2], 10) + 2000;
  const time = parts[3] || "00:00:00";
  return new Date(`${year}-${month}-${day}T${time}`);
}

const mockData = [
  { id: 1, date: "10 ม.ค. 67 09:00:00", stock: "คลังกลาง", company: "บริษัท เอ บี ซี จำกัด", purchaseDate: "9 ม.ค. 67", status: "อนุมัติ" },
  { id: 2, date: "12 ม.ค. 67 10:30:00", stock: "คลังกลาง", company: "หจก. เค แอนด์ พี ซัพพลาย", purchaseDate: "11 ม.ค. 67", status: "อนุมัติ" },
  { id: 3, date: "14 ม.ค. 67 11:15:00", stock: "คลังวัสดุภัณฑ์", company: "บริษัท พีเอส อินดัสเทรียล", purchaseDate: "13 ม.ค. 67", status: "อนุมัติ" },
  { id: 4, date: "16 ม.ค. 67 08:45:00", stock: "คลังกลาง", company: "หจก. นนท์วัสดุ", purchaseDate: "15 ม.ค. 67", status: "อนุมัติ" },
  { id: 5, date: "18 ม.ค. 67 09:20:00", stock: "คลังวัสดุภัณฑ์", company: "บริษัท เจริญพาณิชย์", purchaseDate: "17 ม.ค. 67", status: "อนุมัติ" },
  { id: 6, date: "20 ม.ค. 67 10:10:00", stock: "คลังกลาง", company: "บริษัท บีเอ็น เทคโนโลยี", purchaseDate: "19 ม.ค. 67", status: "อนุมัติ" },
  { id: 7, date: "22 ม.ค. 67 13:00:00", stock: "คลังวัสดุภัณฑ์", company: "หจก. ศรีเจริญวัสดุ", purchaseDate: "21 ม.ค. 67", status: "อนุมัติ" },
  { id: 8, date: "24 ม.ค. 67 14:30:00", stock: "คลังกลาง", company: "บริษัท สยามวัสดุ", purchaseDate: "23 ม.ค. 67", status: "อนุมัติ" },
  { id: 9, date: "26 ม.ค. 67 09:45:00", stock: "คลังกลาง", company: "บริษัท ไอที เซ็นเตอร์", purchaseDate: "25 ม.ค. 67", status: "อนุมัติ" },
  { id: 10, date: "28 ม.ค. 67 11:00:00", stock: "คลังวัสดุภัณฑ์", company: "บริษัท คิว อาร์ ซัพพลาย", purchaseDate: "27 ม.ค. 67", status: "อนุมัติ" },
  { id: 11, date: "30 ม.ค. 67 10:15:00", stock: "คลังกลาง", company: "บริษัท ดี แอนด์ ดี เซอร์วิส", purchaseDate: "29 ม.ค. 67", status: "อนุมัติ" },
  { id: 12, date: "1 ก.พ. 67 09:05:00", stock: "คลังวัสดุภัณฑ์", company: "หจก. สมาร์ทเทรด", purchaseDate: "31 ม.ค. 67", status: "อนุมัติ" }
];

function BalanceMaterialTable_History() {
  const [sortBy, setSortBy] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 10;

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

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

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="history-balance-table-container">
      <table className="history-balance-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ลำดับ {sortBy === "id" ? (sortAsc ? "▲" : "▼") : "▲"}</th>
            <th onClick={() => handleSort("date")}>วันที่ {sortBy === "date" ? (sortAsc ? "▲" : "▼") : "▲"}</th>
            <th>จากคลัง</th>
            <th>บริษัท/ร้านค้า</th>
            <th onClick={() => handleSort("purchaseDate")}>วันที่ซื้อ {sortBy === "purchaseDate" ? (sortAsc ? "▲" : "▼") : "▲"}</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
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

      <div className="history-balance-pagination-wrapper">
        <div className="history-balance-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedData.length)} จาก {sortedData.length} แถว
        </div>
        <div className="history-balance-pagination-buttons">
          <button disabled={currentPage === 1} onClick={handlePrevPage}>ก่อนหน้า</button>
          <input
            type="number"
            className="history-balance-page-input"
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
          <button disabled={currentPage === totalPages} onClick={handleNextPage}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default BalanceMaterialTable_History;
