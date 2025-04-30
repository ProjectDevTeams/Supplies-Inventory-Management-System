import React, { useState } from "react";
import "./IncomingTable.css";

const mockIncomingData = [
  { id: 1927, company: "บริษัท A", po: "018.1 67-1015", orderDate: "9 ก.ย. 67", amount: 1720.0 },
  { id: 1913, company: "บริษัท B", po: "018.1 67-1234", orderDate: "14 ก.ค. 67", amount: 10700.0 },
  { id: 1911, company: "บริษัท C", po: "018.1 67-5678", orderDate: "5 ก.ค. 67", amount: 1476.6 },
  { id: 1887, company: "บริษัท D", po: "018.1 67-9101", orderDate: "3 เม.ย. 67", amount: 1979.5 },
  { id: 1886, company: "บริษัท E", po: "018.1 67-1121", orderDate: "1 เม.ย. 67", amount: 31000.0 },
  { id: 1870, company: "บริษัท F", po: "018.1 67-3141", orderDate: "5 มี.ค. 67", amount: 540.0 },
  { id: 1863, company: "บริษัท G", po: "018.1 67-5161", orderDate: "27 ก.พ. 67", amount: 791.8 },
  { id: 1839, company: "บริษัท H", po: "018.1 66-7181", orderDate: "27 พ.ย. 66", amount: 41448.0 },
];

function IncomingTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockIncomingData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockIncomingData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const next = currentPage + 1;
      setCurrentPage(next);
      setInputPage(next);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prev = currentPage - 1;
      setCurrentPage(prev);
      setInputPage(prev);
    }
  };

  const handlePageChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const val = parseInt(inputPage, 10);
      if (!isNaN(val) && val >= 1 && val <= totalPages) {
        setCurrentPage(val);
      }
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="incoming-table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>บริษัท/ร้านค้า</th>
              <th>เลขที่ มอ.</th>
              <th>วันที่ซื้อ</th>
              <th>ยอดซื้อรวม</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className="company-cell">{item.company}</td>
                <td>{item.po}</td>
                <td>{item.orderDate}</td>
                <td className="total-cell">{item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-wrapper">
          <div className="pagination-info">
            แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, mockIncomingData.length)} จาก {mockIncomingData.length} แถว
          </div>
          <div className="pagination-buttons">
            <button className={`btn ${currentPage === 1 ? "disabled" : ""}`} onClick={handlePrevPage}>
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
            <button className={`btn ${currentPage === totalPages ? "disabled" : ""}`} onClick={handleNextPage}>
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomingTable;
