import React, { useState, useEffect } from 'react';
import './StuffTable.css';
import { useNavigate } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from "../../config";

export default function StuffTablePurchase({ searchTerm = '' }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [asc, setAsc] = useState(true);
  const perPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/purchase_extras/get_purchase_extras.php`);
        if (res.data.status === "success") {
          const formatted = res.data.data.map((item) => ({
            id: parseInt(item.id),
            code: `PE-${String(item.id).padStart(3, '0')}`,
            stock: item.items?.[0]?.stock_type || "วัสดุในคลัง",
            amount: item.items?.length || 0,
            date: item.created_date,
            status: item.approval_status === 'อนุมัติ' ? 'approved'
              : item.approval_status === 'ไม่อนุมัติ' ? 'rejected'
              : 'pending'
          }));
          setData(formatted);
        }
      } catch (err) {
        console.error("โหลดข้อมูลล้มเหลว:", err);
      }
    };
    fetchData();
  }, []);

  const renderStatus = (st) => ({
    pending: 'รออนุมัติ',
    approved: 'อนุมัติ',
    rejected: 'ไม่อนุมัติ',
  }[st] || '-');

  const sorted = [...data].sort((a, b) => asc ? a.id - b.id : b.id - a.id);

  const filtered = sorted.filter(item =>
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.stock.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.includes(searchTerm) ||
    renderStatus(item.status).includes(searchTerm)
  );

  const total = Math.ceil(filtered.length / perPage);
  const items = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = () => setAsc(!asc);
  const prev = () => page > 1 && (setPage(p => p - 1), setInput(''));
  const next = () => page < total && (setPage(p => p + 1), setInput(''));
  const onKey = e => {
    if (e.key === 'Enter') {
      const v = Number(input);
      if (v >= 1 && v <= total) setPage(v);
      e.target.blur();
    }
  };

  return (
    <div className="stuff-container">
      <div className="stuff-description">
        ตารางขอจัดซื้อเพิ่มเติม
      </div>
      <table className="stuff-table">
        <thead>
          <tr>
            <th onClick={toggleSort} style={{ cursor: 'pointer' }}>
              ลำดับ {asc ? '▲' : '▼'}
            </th>
            <th>เลขที่ใบเบิก</th>
            <th>คลังวัสดุ</th>
            <th>จำนวน</th>
            <th>วันที่สร้าง</th>
            <th>สถานะ</th>
            <th>ปริ้น</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" className="stuff-no-data">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          ) : (
            items.map(i => (
              <tr
                key={i.id}
                onClick={() => navigate("/stuff/DetailPurchase", { state: { id: i.id } })}
                style={{ cursor: "pointer" }}
              >
                <td>{i.id}</td>
                <td className="stuff-link">{i.code}</td>
                <td>{i.stock}</td>
                <td>{i.amount}</td>
                <td>{i.date}</td>
                <td className={`status ${i.status === 'approved' ? 'approved' : i.status === 'pending' ? 'pending' : 'rejected'}`}>
                  {renderStatus(i.status)}
                </td>
                <td className="print-icon"><FaPrint /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="stuff-pagination">
        <div className="stuff-pagination-info">
          แสดง {(page - 1) * perPage + 1} ถึง {Math.min(page * perPage, filtered.length)} จาก {filtered.length} แถว
        </div>
        <div className="stuff-pagination-buttons">
          <button className="stuff-btn" disabled={page === 1} onClick={prev}>ก่อนหน้า</button>
          <input
            type="text"
            className="stuff-page-input"
            placeholder={`${page} / ${total}`}
            value={input}
            onFocus={() => setInput('')}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
          />
          <button className="stuff-btn" disabled={page === total} onClick={next}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}
