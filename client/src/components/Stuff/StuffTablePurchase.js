import React, { useState } from 'react';
import './StuffTable.css';

const mockPurchaseData = [
  { id: 1, stock: "วัสดุในคลัง", item: "ถ่าน 9 โวลต์", createDate: "28 มี.ค. 67", updateDate: "-", status: "อนุมัติ" },
  { id: 2, stock: "วัสดุในคลัง", item: "กาวแท่ง UHU", createDate: "4 มี.ค. 67", updateDate: "5 มี.ค. 67", status: "ไม่อนุมัติ" },
  { id: 3, stock: "วัสดุในคลัง", item: "ปากกา", createDate: "6 ม.ค. 67", updateDate: "7 ม.ค. 67", status: "อนุมัติ" },
  { id: 4, stock: "วัสดุในคลัง", item: "สมุด", createDate: "5 ม.ค. 67", updateDate: "5 ม.ค. 67", status: "ไม่อนุมัติ" },
];

function StuffTablePurchase() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(mockPurchaseData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockPurchaseData.slice(indexOfFirstItem, indexOfLastItem);

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
              <th>คลังวัสดุ</th>
              <th>วัสดุสิ้นเปลือง</th>
              <th>วันที่สร้าง</th>
              <th>วันที่แก้ไข</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.stock}</td>
                <td>{item.item}</td>
                <td>{item.createDate}</td>
                <td>{item.updateDate}</td>
                <td className={`status ${item.status === "ไม่อนุมัติ" ? "rejected" : "approved"}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-wrapper">
        <div className="pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, mockPurchaseData.length)} จาก {mockPurchaseData.length} แถว
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

export default StuffTablePurchase;
