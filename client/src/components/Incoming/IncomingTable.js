import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_URL } from "../../config";
import "./IncomingTable.css";

export default function IncomingTable({ searchTerm = '', onDataReady }) {
  const [data, setData] = useState([]);
  const [incomingCurrentPage, setIncomingCurrentPage] = useState(1);
  const [incomingInputPage, setIncomingInputPage] = useState('');
  const [incomingAsc, setIncomingAsc] = useState(true);
  const incomingItemsPerPage = 5;
  const navigate = useNavigate();

  // fetch data
  useEffect(() => {
    axios.get(`${API_URL}/receive/get_receives.php`)
      .then(res => {
        if (res.data.status === "success") {
          const formatted = res.data.data.map(item => ({
            id: item.id,
            company: item.company_name || '-',
            po: '-',
            orderDate: '-',
            amount: parseFloat(item.total_price) || 0
          }));
          setData(formatted);
        }
      })
      .catch(err => console.error("API fetch error:", err));
  }, []);

  const sortedData = [...data].sort((a, b) =>
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
      <div className="incoming-description">ตารางการรับเข้าวัสดุ</div>
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
            currentItems.map((item, index) => (
              <tr
                key={item.id}
                className="incoming-tr"
                onClick={() => navigate("/incoming/materials")}
              >
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.company}</td>
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
