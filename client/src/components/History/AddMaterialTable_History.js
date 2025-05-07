import React, { useState, useEffect } from "react";
import "./AddMaterialTable_History.css";

function AddMaterialTable_History() {
  const mockData = [
    {
      date: "27 พ.ย. 66 13:30:35",
      qty: 5,
      price: 17.5,
      total: 87.5,
      remainQty: 8,
      remainValue: 140.0,
      by: "ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    },
    {
      date: "26 พ.ย. 66 12:00:00",
      qty: 2,
      price: 20,
      total: 40,
      remainQty: 10,
      remainValue: 200,
      by: "ฝ่ายวิจัยและพัฒนา",
    },
    // เพิ่มข้อมูลจำลองเพิ่มเติมเพื่อให้มีหลายหน้า
    ...Array.from({ length: 20 }).map((_, i) => ({
      date: `20 พ.ย. 66 ${String(i + 1).padStart(2, "0")}:00:00`,
      qty: i + 1,
      price: 10 + i,
      total: (i + 1) * (10 + i),
      remainQty: 5 + i,
      remainValue: (5 + i) * (10 + i),
      by: "ฝ่ายงานจำลอง",
    })),
  ];

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
    <div className="history-add-table-container">
      <table className="history-add-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>ซื้อมาจำนวน</th>
            <th>ราคา</th>
            <th>รวมเงิน</th>
            <th>จำนวนคงเหลือ</th>
            <th>มูลค่าคงเหลือ</th>
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
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, mockData.length)} จาก {mockData.length} แถว
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
          <button disabled={currentPage === totalPages} onClick={handleNextPage}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMaterialTable_History;