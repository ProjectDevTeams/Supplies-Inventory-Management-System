import React, { useState, useEffect } from "react";
import "./AllMaterialTable_History.css";

const thaiMonths = {
  "ม.ค.": "01", "กุมภาพันธ์": "02", "มี.ค.": "03", "เม.ย.": "04",
  "พ.ค.": "05", "มิ.ย.": "06", "ก.ค.": "07", "ส.ค.": "08",
  "ก.ย.": "09", "ต.ค.": "10", "พ.ย.": "11", "ธ.ค.": "12"
};

function parseThaiDate(str) {
  const [day, monthText, year, time] = str.trim().split(" ");
  const month = thaiMonths[monthText];
  const fullYear = parseInt(year, 10) + 2000;
  return new Date(`${fullYear}-${month}-${day.padStart(2, "0")}T${time}`);
}

function AllMaterialTable_History() {
  const [sortBy, setSortBy] = useState("date");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 10;

  const mockData = [
    {
      date: "10 พ.ย. 66 08:00:00",
      item: "ยอดยกมา",
      change: "+2",
      remain: "5",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "11 พ.ย. 66 09:00:00",
      item: "รับเข้าวัสดุ",
      change: "+3",
      remain: "8",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "12 พ.ย. 66 10:00:00",
      item: "เบิกวัสดุ",
      change: "-1",
      remain: "7",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "13 พ.ย. 66 11:00:00",
      item: "ยอดยกมา",
      change: "+4",
      remain: "11",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "14 พ.ย. 66 12:00:00",
      item: "รับเข้าวัสดุ",
      change: "+2",
      remain: "13",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "15 พ.ย. 66 13:00:00",
      item: "เบิกวัสดุ",
      change: "-3",
      remain: "10",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "16 พ.ย. 66 14:00:00",
      item: "ยอดยกมา",
      change: "+5",
      remain: "15",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "17 พ.ย. 66 15:00:00",
      item: "รับเข้าวัสดุ",
      change: "+1",
      remain: "16",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "18 พ.ย. 66 16:00:00",
      item: "เบิกวัสดุ",
      change: "-2",
      remain: "14",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "19 พ.ย. 66 17:00:00",
      item: "ยอดยกมา",
      change: "+3",
      remain: "17",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "20 พ.ย. 66 18:00:00",
      item: "รับเข้าวัสดุ",
      change: "+2",
      remain: "19",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "21 พ.ย. 66 19:00:00",
      item: "เบิกวัสดุ",
      change: "-4",
      remain: "15",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "22 พ.ย. 66 20:00:00",
      item: "ยอดยกมา",
      change: "+6",
      remain: "21",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "23 พ.ย. 66 21:00:00",
      item: "รับเข้าวัสดุ",
      change: "+1",
      remain: "22",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "24 พ.ย. 66 22:00:00",
      item: "เบิกวัสดุ",
      change: "-5",
      remain: "17",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "25 พ.ย. 66 23:00:00",
      item: "ยอดยกมา",
      change: "+4",
      remain: "21",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "26 พ.ย. 66 00:00:00",
      item: "รับเข้าวัสดุ",
      change: "+3",
      remain: "24",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "27 พ.ย. 66 01:00:00",
      item: "เบิกวัสดุ",
      change: "-2",
      remain: "22",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "28 พ.ย. 66 02:00:00",
      item: "ยอดยกมา",
      change: "+5",
      remain: "27",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "29 พ.ย. 66 03:00:00",
      item: "รับเข้าวัสดุ",
      change: "+2",
      remain: "29",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "30 พ.ย. 66 04:00:00",
      item: "เบิกวัสดุ",
      change: "-3",
      remain: "26",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
  ];

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
    } else if (sortBy === "change" || sortBy === "remain") {
      valA = parseFloat(valA);
      valB = parseFloat(valB);
    }

    if (valA instanceof Date) {
      return sortAsc ? valA - valB : valB - valA;
    } else if (typeof valA === "number") {
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

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  return (
    <div className="history-all-table-container">
      <table className="history-all-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
              วันที่ {sortBy === "date" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("item")} style={{ cursor: "pointer" }}>
              รายการ {sortBy === "item" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("change")} style={{ cursor: "pointer" }}>
              เปลี่ยนแปลง {sortBy === "change" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("remain")} style={{ cursor: "pointer" }}>
              คงเหลือ {sortBy === "remain" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th>โดย</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.item}</td>
              <td>{item.change}</td>
              <td>{item.remain}</td>
              <td className="history-all-left-align">{item.by}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="history-all-pagination-wrapper">
        <div className="history-all-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedData.length)} จาก {sortedData.length} แถว
        </div>
        <div className="history-all-pagination-buttons">
          <button disabled={currentPage === 1} onClick={handlePrevPage}>
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="history-all-page-input"
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
          <button disabled={currentPage === totalPages} onClick={handleNextPage}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllMaterialTable_History;
