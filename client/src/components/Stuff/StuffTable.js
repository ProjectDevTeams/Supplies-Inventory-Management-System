import React, { useState, useEffect } from 'react';
import './StuffTable.css';

const mockData = [
  { id: 24, code: "006-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "7 ก.พ. 68", status: "pending" },
  { id: 23, code: "005-02/2568", stock: "วัสดุในคลัง", amount: 3, date: "3 ก.พ. 68", status: "approved" },
  { id: 22, code: "004-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "27 ม.ค. 68", status: "rejected" },
  { id: 21, code: "003-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "24 ม.ค. 68", status: "pending" },
  { id: 20, code: "002-02/2568", stock: "วัสดุในคลัง", amount: 2, date: "20 ม.ค. 68", status: "approved" },
  { id: 19, code: "001-02/2568", stock: "วัสดุในคลัง", amount: 5, date: "15 ม.ค. 68", status: "rejected" },
];

export default function StuffTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage]     = useState('');
  const itemsPerPage = 4;
  const totalPages   = Math.ceil(mockData.length / itemsPerPage);

  // บังคับให้ inputPage กลับมาเป็น '' ทุกครั้งที่ currentPage เปลี่ยน
  useEffect(() => {
    setInputPage('');
  }, [currentPage]);

  const indexOfLastItem  = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems     = mockData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleChange = e => {
    setInputPage(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      const v = parseInt(inputPage, 10);
      if (!isNaN(v) && v >= 1 && v <= totalPages) {
        setCurrentPage(v);
      }
      e.target.blur();
    }
  };

  const renderStatus = status => {
    if (status === 'pending')  return 'รออนุมัติ';
    if (status === 'approved') return 'อนุมัติ';
    if (status === 'rejected') return 'ไม่อนุมัติ';
    return '-';
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
                  {renderStatus(item.status)}
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
            <button className="btn" disabled={currentPage === 1} onClick={handlePrev}>
              ก่อนหน้า
            </button>

            <input
              type="number"
              className="org-page-input"
              placeholder={`${currentPage} / ${totalPages}`}
              value={inputPage}
              min={1}
              max={totalPages}
              onFocus={() => setInputPage('')}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            <button className="btn" disabled={currentPage === totalPages} onClick={handleNext}>
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
