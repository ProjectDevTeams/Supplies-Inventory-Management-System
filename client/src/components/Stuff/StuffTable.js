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

export default function StuffTable({ searchTerm }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [asc, setAsc] = useState(true);
  const itemsPerPage = 4;

  const sortedData = [...mockData].sort((a, b) =>
    asc ? a.id - b.id : b.id - a.id
  );

  const renderStatus = (status) => {
    if (status === 'pending') return 'รออนุมัติ';
    if (status === 'approved') return 'อนุมัติ';
    if (status === 'rejected') return 'ไม่อนุมัติ';
    return '-';
  };

  const filteredData = sortedData.filter(item =>
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.stock.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.includes(searchTerm) ||
    renderStatus(item.status).includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="stuff-wrapper">
      <div className="stuff-container">
        <table className="stuff-table">
          <thead>
            <tr>
              <th onClick={() => setAsc(prev => !prev)} style={{ cursor: 'pointer' }}>
                ลำดับ {asc ? '▲' : '▼'}
              </th>
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
                <td className={`stuff-status stuff-${item.status}`}>
                  {renderStatus(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="stuff-pagination">
          <div className="stuff-pagination-info">
            แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
          </div>
          <div className="stuff-pagination-buttons">
            <button className="stuff-btn" disabled={currentPage === 1} onClick={handlePrev}>ก่อนหน้า</button>
            <input
              type="text"
              className="stuff-page-input"
              placeholder={`${currentPage} / ${totalPages}`}
              value={inputPage}
              onFocus={() => setInputPage('')}
              onChange={(e) => setInputPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt(inputPage, 10);
                  if (!isNaN(page) && page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  }
                  setInputPage('');
                  e.target.blur();
                }
              }}
            />
            <button className="stuff-btn" disabled={currentPage === totalPages} onClick={handleNext}>ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
}
