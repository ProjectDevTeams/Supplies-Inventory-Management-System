import React, { useState, useEffect } from "react";
import "./AddMaterialTable_History.css";

const thaiMonths = {
  "ม.ค.": "01", "ก.พ.": "02", "มี.ค.": "03", "เม.ย.": "04",
  "พ.ค.": "05", "มิ.ย.": "06", "ก.ค.": "07", "ส.ค.": "08",
  "ก.ย.": "09", "ต.ค.": "10", "พ.ย.": "11", "ธ.ค.": "12"
};

function parseThaiDate(str) {
  const [day, monthText, year, time] = str.trim().split(" ");
  const month = thaiMonths[monthText];
  const fullYear = parseInt(year, 10) + 2000;
  return new Date(`${fullYear}-${month}-${day.padStart(2, "0")}T${time}`);
}

function AddMaterialTable_History() {
  const mockData = [
    {
      date: "25 พ.ย. 66 10:00:00",
      qty: 3,
      price: 15.0,
      total: 45.0,
      remainQty: 9,
      remainValue: 135.0,
      by: "ฝ่ายวิจัยและพัฒนา",
    },
    {
      date: "24 พ.ย. 66 11:20:00",
      qty: 7,
      price: 12.5,
      total: 87.5,
      remainQty: 12,
      remainValue: 150.0,
      by: "ฝ่ายคลังกลาง",
    },
    {
      date: "23 พ.ย. 66 08:30:00",
      qty: 1,
      price: 30.0,
      total: 30.0,
      remainQty: 5,
      remainValue: 75.0,
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "22 พ.ย. 66 14:45:00",
      qty: 4,
      price: 10.0,
      total: 40.0,
      remainQty: 6,
      remainValue: 60.0,
      by: "ฝ่ายวิจัยและพัฒนา",
    },
    {
      date: "21 พ.ย. 66 09:10:00",
      qty: 6,
      price: 17.0,
      total: 102.0,
      remainQty: 11,
      remainValue: 187.0,
      by: "ฝ่ายคลังกลาง",
    },
    {
      date: "20 พ.ย. 66 15:00:00",
      qty: 8,
      price: 9.5,
      total: 76.0,
      remainQty: 14,
      remainValue: 133.0,
      by: "ฝ่ายวิจัยและพัฒนา",
    },
    {
      date: "19 พ.ย. 66 13:15:00",
      qty: 2,
      price: 25.0,
      total: 50.0,
      remainQty: 7,
      remainValue: 125.0,
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "18 พ.ย. 66 11:50:00",
      qty: 9,
      price: 11.0,
      total: 99.0,
      remainQty: 15,
      remainValue: 165.0,
      by: "ฝ่ายคลังกลาง",
    },
    {
      date: "17 พ.ย. 66 10:25:00",
      qty: 5,
      price: 19.0,
      total: 95.0,
      remainQty: 10,
      remainValue: 190.0,
      by: "ฝ่ายวิจัยและพัฒนา",
    },
    {
      date: "16 พ.ย. 66 16:00:00",
      qty: 4,
      price: 13.0,
      total: 52.0,
      remainQty: 8,
      remainValue: 104.0,
      by: "ฝ่ายคลังกลาง",
    },
    {
      date: "15 พ.ย. 66 08:40:00",
      qty: 6,
      price: 14.5,
      total: 87.0,
      remainQty: 12,
      remainValue: 174.0,
      by: "ฝ่ายวิจัยและพัฒนา",
    },
    {
      date: "14 พ.ย. 66 09:55:00",
      qty: 3,
      price: 16.0,
      total: 48.0,
      remainQty: 9,
      remainValue: 144.0,
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "13 พ.ย. 66 13:35:00",
      qty: 7,
      price: 18.0,
      total: 126.0,
      remainQty: 13,
      remainValue: 234.0,
      by: "ฝ่ายคลังกลาง",
    },
    {
      date: "12 พ.ย. 66 12:15:00",
      qty: 5,
      price: 22.0,
      total: 110.0,
      remainQty: 10,
      remainValue: 220.0,
      by: "ฝ่ายวิจัยและพัฒนา",
    },
    {
      date: "11 พ.ย. 66 14:20:00",
      qty: 8,
      price: 20.0,
      total: 160.0,
      remainQty: 14,
      remainValue: 280.0,
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "10 พ.ย. 66 15:45:00",
      qty: 2,
      price: 24.0,
      total: 48.0,
      remainQty: 6,
      remainValue: 96.0,
      by: "ฝ่ายวิจัยและพัฒนา",
    },
    {
      date: "9 พ.ย. 66 10:10:00",
      qty: 9,
      price: 10.0,
      total: 90.0,
      remainQty: 16,
      remainValue: 160.0,
      by: "ฝ่ายคลังกลาง",
    },
    {
      date: "8 พ.ย. 66 09:00:00",
      qty: 1,
      price: 35.0,
      total: 35.0,
      remainQty: 4,
      remainValue: 140.0,
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "7 พ.ย. 66 11:25:00",
      qty: 6,
      price: 21.0,
      total: 126.0,
      remainQty: 11,
      remainValue: 231.0,
      by: "ฝ่ายคลังกลาง",
    },
    {
      date: "6 พ.ย. 66 13:10:00",
      qty: 3,
      price: 19.5,
      total: 58.5,
      remainQty: 7,
      remainValue: 136.5,
      by: "ฝ่ายวิจัยและพัฒนา",
    },
  ];

  const [sortBy, setSortBy] = useState("date");
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
  };

  const sortedData = [...mockData].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === "date") {
      valA = parseThaiDate(valA);
      valB = parseThaiDate(valB);
    }

    if (valA instanceof Date) {
      return sortAsc ? valA - valB : valB - valA;
    } else if (typeof valA === "number") {
      return sortAsc ? valA - valB : valB - valA;
    } else {
      return sortAsc
        ? valA.toString().localeCompare(valB)
        : valB.toString().localeCompare(valA);
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
    <div className="history-add-table-container">
      <table className="history-add-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")}>
              วันที่ {sortBy === "date" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("qty")}>
              ซื้อมาจำนวน {sortBy === "qty" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("price")}>
              ราคา {sortBy === "price" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("total")}>
              รวมเงิน {sortBy === "total" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("remainQty")}>
              จำนวนคงเหลือ{" "}
              {sortBy === "remainQty" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th onClick={() => handleSort("remainValue")}>
              มูลค่าคงเหลือ{" "}
              {sortBy === "remainValue" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th>โดย</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.qty}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.total.toFixed(2)}</td>
              <td>{item.remainQty}</td>
              <td>{item.remainValue.toFixed(2)}</td>
              <td className="history-add-left-align">{item.by}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="history-add-pagination-wrapper">
        <div className="history-add-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง{" "}
          {Math.min(indexOfLastItem, sortedData.length)} จาก {sortedData.length}{" "}
          แถว
        </div>
        <div className="history-add-pagination-buttons">
          <button disabled={currentPage === 1} onClick={handlePrevPage}>
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="history-add-page-input"
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
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMaterialTable_History;
