import React, { useState, useEffect } from "react";
import "./AllMaterialTable_History.css";

function AllMaterialTable_History() {
  const mockData = [
    {
      date: "23 พ.ย. 66 15:57:11",
      item: "ยอดยกมา",
      change: "+3",
      remain: "3",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "27 พ.ย. 66 13:30:35",
      item: "รับเข้าวัสดุ",
      change: "+5",
      remain: "8",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "5 มี.ค. 67 09:36:27",
      item: "เบิกวัสดุ",
      change: "-7",
      remain: "1",
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    // เพิ่มอีกหลายรายการเพื่อให้ pagination ทำงาน
    ...Array.from({ length: 20 }).map((_, i) => ({
      date: `15 ก.พ. 67 0${i + 1}:00:00`,
      item: "ทดสอบ",
      change: `${i % 2 === 0 ? "+" : "-"}${i + 1}`,
      remain: `${10 - i}`,
      by: "ฝ่ายงานจำลอง",
    })),
  ];



  // function ของ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 10;

  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

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
            <th>วันที่</th>
            <th>รายการ</th>
            <th>เปลี่ยนแปลง</th>
            <th>คงเหลือ</th>
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
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, mockData.length)} จาก {mockData.length} แถว
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

