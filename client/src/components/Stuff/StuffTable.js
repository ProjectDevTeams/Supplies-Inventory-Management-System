import React, { useState } from "react";
import "./StuffTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const mockData = [
  { id: 24, code: "006-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "7 ก.พ. 68", status: "pending" },
  { id: 23, code: "005-02/2568", stock: "วัสดุในคลัง", amount: 3, date: "3 ก.พ. 68", status: "approved" },
  { id: 22, code: "004-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "27 ม.ค. 68", status: "rejected" },
  { id: 21, code: "003-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "24 ม.ค. 68", status: "pending" },
  { id: 20, code: "002-02/2568", stock: "วัสดุในคลัง", amount: 2, date: "20 ม.ค. 68", status: "approved" },
  { id: 19, code: "001-02/2568", stock: "วัสดุในคลัง", amount: 5, date: "15 ม.ค. 68", status: "rejected" },
];

function StuffTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setInputPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setInputPage(currentPage - 1);
    }
  };

  const handlePageChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = parseInt(inputPage, 10);
      if (!isNaN(value) && value >= 1 && value <= totalPages) {
        setCurrentPage(value);
      }
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="stuff-table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>เลขที่ใบเบิก</th>
              <th>คลังวัสดุ</th>
              <th>ปริ้น</th>
              <th>จำนวนรายการ</th>
              <th>วันที่สร้าง</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.code}</td>
                <td>{item.stock}</td>
                <td>
                 <button className="btn print-black-btn" onClick={() => window.print()}>
                 <FontAwesomeIcon icon={faPrint} /> ปริ้น
                 </button>
                </td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`status ${item.status}`}>
                    {renderStatusText(item.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-wrapper">
        <div className="pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, mockData.length)} จาก {mockData.length} แถว
        </div>

        <div className="pagination-buttons">
          <button
            className={`btn ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePrevPage}
          >
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            onChange={handlePageChange}
            onKeyDown={handleKeyDown}
          />

          <button
            className={`btn ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={handleNextPage}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

function renderStatusText(status) {
  switch (status) {
    case "pending":
      return "รออนุมัติ";
    case "approved":
      return "อนุมัติ";
    case "rejected":
      return "ไม่อนุมัติ";
    default:
      return "-";
  }
}

export default StuffTable;
