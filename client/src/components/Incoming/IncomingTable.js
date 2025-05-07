import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
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

export default function IncomingTable({ searchTerm = '', onDataReady }) {
  const [incomingCurrentPage, setIncomingCurrentPage] = useState(1);
  const [incomingInputPage, setIncomingInputPage] = useState('');
  const [incomingAsc, setIncomingAsc] = useState(true);
  const incomingItemsPerPage = 5;

  const sortedData = [...mockIncomingData].sort((a, b) =>
    incomingAsc ? a.id - b.id : b.id - a.id
  );

  const filteredData = sortedData.filter(item =>
    item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.po.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.orderDate.includes(searchTerm) ||
    item.amount.toString().includes(searchTerm)
  );

  useEffect(() => {
    if (onDataReady) {
      onDataReady(filteredData);
    }
  }, [filteredData, onDataReady]);

  const totalPages = Math.ceil(filteredData.length / incomingItemsPerPage);
  const indexOfLastItem = incomingCurrentPage * incomingItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - incomingItemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const toggleSort = () => setIncomingAsc(prev => !prev);
  const handleNextPage = () => incomingCurrentPage < totalPages && setIncomingCurrentPage(p => p + 1);
  const handlePrevPage = () => incomingCurrentPage > 1 && setIncomingCurrentPage(p => p - 1);

  return (
    <div className="incoming-container">
      <table className="incoming-table">
        <thead>
          <tr>
            <th className="incoming-sortable-header" onClick={toggleSort}>
              ลำดับ {incomingAsc ? "▲" : "▼"}
            </th>
            <th>บริษัท/ร้านค้า</th>
            <th>เลขที่ มอ.</th>
            <th>วันที่ซื้อ</th>
            <th>ยอดซื้อรวม</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="5" className="incoming-no-data">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Link to="/incoming/materials" className="incoming-link">
                    {item.company}
                  </Link>
                </td>
                <td>{item.po}</td>
                <td>{item.orderDate}</td>
                <td>{item.amount.toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>

      </table>

      <div className="incoming-pagination-wrapper">
        <div className="incoming-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="incoming-pagination-buttons">
          <button className="incoming-btn" disabled={incomingCurrentPage === 1} onClick={handlePrevPage}>ก่อนหน้า</button>
          <input
            type="text"
            className="incoming-page-input"
            placeholder={incomingInputPage === '' ? `${incomingCurrentPage} / ${totalPages}` : ''}
            value={incomingInputPage}
            onFocus={() => setIncomingInputPage('')}
            onChange={(e) => setIncomingInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const page = parseInt(incomingInputPage, 10);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                  setIncomingCurrentPage(page);
                }
                setIncomingInputPage('');
                e.target.blur();
              }
            }}
          />
          <button className="incoming-btn" disabled={incomingCurrentPage === totalPages} onClick={handleNextPage}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}
