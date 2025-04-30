import React, { useState } from 'react';
import './StuffTable.css';

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
  const [sortAsc, setSortAsc] = useState(true);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const sortedData = [...mockData].sort((a, b) =>
    sortAsc ? a.id - b.id : b.id - a.id
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const renderStatusText = (status) => {
    switch (status) {
      case 'pending': return 'รออนุมัติ';
      case 'approved': return 'อนุมัติ';
      case 'rejected': return 'ไม่อนุมัติ';
      default: return '-';
    }
  };

  const handleSort = () => setSortAsc(!sortAsc);
  const handlePrev = () => { if (currentPage > 1) setCurrentPage(prev => { setInputPage(prev - 1); return prev - 1; }); };
  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(next => { setInputPage(next + 1); return next + 1; }); };
  const handleChange = (e) => setInputPage(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const val = parseInt(inputPage);
      if (!isNaN(val) && val >= 1 && val <= totalPages) setCurrentPage(val);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="stuff-table">
          <thead>
            <tr>
              <th onClick={handleSort} style={{ cursor: 'pointer' }}>ลำดับ {sortAsc ? '▲' : '▼'}</th>
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

        <div className="stuff-pagination">
          <div className="stuff-pagination-info">
            แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, mockData.length)} จาก {mockData.length} แถว
          </div>
          <div className="stuff-pagination-buttons">
            <button className="btn" disabled={currentPage === 1} onClick={handlePrev}>ก่อนหน้า</button>
            <div className="page-box">
              <input
                type="number"
                className="page-box-input"
                value={inputPage}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <span className="page-box-total">/ {totalPages}</span>
            </div>
            <button className="btn" disabled={currentPage === totalPages} onClick={handleNext}>ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StuffTable;
