import React, { useState } from 'react';
import './StuffTable.css';

const mockTrackData = [
  { id: 40, code: "002-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "7 ก.พ. 68", status: "รับของเรียบร้อย" },
  { id: 39, code: "001-02/2568", stock: "วัสดุในคลัง", amount: 3, date: "3 ก.พ. 68", status: "รับของเรียบร้อย" },
  { id: 38, code: "008-01/2568", stock: "วัสดุในคลัง", amount: 1, date: "27 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 37, code: "007-01/2568", stock: "วัสดุในคลัง", amount: 1, date: "24 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 36, code: "006-01/2568", stock: "วัสดุในคลัง", amount: 2, date: "20 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 35, code: "005-01/2568", stock: "วัสดุในคลัง", amount: 1, date: "17 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 34, code: "004-01/2568", stock: "วัสดุในคลัง", amount: 4, date: "13 ม.ค. 68", status: "ไม่อนุมัติ" },
  { id: 33, code: "003-01/2568", stock: "วัสดุในคลัง", amount: 1, date: "10 ม.ค. 68", status: "ไม่อนุมัติ" },
];

function StuffTableTrack() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(mockTrackData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockTrackData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setInputPage(nextPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      setInputPage(prevPage);
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
        setInputPage(value);
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
              <th>จำนวน</th>
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
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td className={`status ${item.status.includes("ไม่") ? "rejected" : "approved"}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-wrapper">
        <div className="pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, mockTrackData.length)} จาก {mockTrackData.length} แถว
        </div>
        <div className="pagination-buttons">
          <button className={`btn ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrev}>ก่อนหน้า</button>
          <input
            type="number"
            className="page-input"
            value={inputPage}
            onChange={handlePageChange}
            onKeyDown={handleKeyDown}
            min={1}
            max={totalPages}
          />
          <button className={`btn ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleNext}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default StuffTableTrack;
