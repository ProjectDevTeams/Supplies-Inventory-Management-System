import React, { useState } from 'react';
import './StuffTable.css';

const purchaseData = [
  { id: 1, code: "001-01/2568", stock: "วัสดุในคลัง", amount: 2, date: "5 ม.ค. 68", status: "approved" },
  { id: 2, code: "002-01/2568", stock: "วัสดุในคลัง", amount: 1, date: "10 ม.ค. 68", status: "pending" },
  { id: 3, code: "003-01/2568", stock: "วัสดุในคลัง", amount: 3, date: "15 ม.ค. 68", status: "rejected" },
  { id: 4, code: "004-01/2568", stock: "วัสดุในคลัง", amount: 2, date: "18 ม.ค. 68", status: "approved" },
  { id: 5, code: "005-01/2568", stock: "วัสดุในคลัง", amount: 5, date: "20 ม.ค. 68", status: "approved" },
  { id: 6, code: "006-01/2568", stock: "วัสดุในคลัง", amount: 1, date: "25 ม.ค. 68", status: "pending" },
];

function StuffTablePurchase() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(purchaseData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setInputPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setInputPage(currentPage + 1);
    }
  };

  const handleChange = (e) => setInputPage(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = parseInt(inputPage);
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
                <td className={`status ${item.status}`}>
                  {renderStatusText(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-wrapper">
          <div className="pagination-info">
            แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, purchaseData.length)} จาก {purchaseData.length} แถว
          </div>
          <div className="pagination-buttons">
            <button className={`btn ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrev}>ก่อนหน้า</button>
            <input
              type="number"
              className="page-input"
              value={inputPage}
              onChange={handleChange}
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

const renderStatusText = (status) => {
  switch (status) {
    case "pending": return "รออนุมัติ";
    case "approved": return "อนุมัติ";
    case "rejected": return "ไม่อนุมัติ";
    default: return "-";
  }
};

export default StuffTablePurchase;
