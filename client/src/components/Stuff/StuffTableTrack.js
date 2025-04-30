import React, { useState } from 'react';
import './StuffTable.css';

const trackData = [
  { id: 30, code: "001-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "9 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 29, code: "002-02/2568", stock: "วัสดุในคลัง", amount: 3, date: "12 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 28, code: "003-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "15 ม.ค. 68", status: "ไม่อนุมัติ" },
  { id: 27, code: "004-02/2568", stock: "วัสดุในคลัง", amount: 4, date: "20 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 26, code: "005-02/2568", stock: "วัสดุในคลัง", amount: 2, date: "25 ม.ค. 68", status: "ไม่อนุมัติ" },
];

function StuffTableTrack() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(trackData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trackData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setInputPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setInputPage(currentPage - 1);
    }
  };

  const handlePageChange = (e) => setInputPage(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const page = parseInt(inputPage, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        setCurrentPage(page);
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
            {currentItems.map(item => (
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

        <div className="pagination-wrapper">
          <div className="pagination-info">
            แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, trackData.length)} จาก {trackData.length} แถว
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
    </div>
  );
}

export default StuffTableTrack;
