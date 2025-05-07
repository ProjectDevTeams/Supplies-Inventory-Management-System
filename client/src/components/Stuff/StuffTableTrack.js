import React, { useState } from 'react';
import './StuffTable.css';

const trackData = [
  { id: 1, code: "001-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "9 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 2, code: "002-02/2568", stock: "วัสดุในคลัง", amount: 3, date: "12 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 3, code: "003-02/2568", stock: "วัสดุในคลัง", amount: 1, date: "15 ม.ค. 68", status: "ไม่อนุมัติ" },
  { id: 4, code: "004-02/2568", stock: "วัสดุในคลัง", amount: 4, date: "20 ม.ค. 68", status: "รับของเรียบร้อย" },
  { id: 5, code: "005-02/2568", stock: "วัสดุในคลัง", amount: 2, date: "25 ม.ค. 68", status: "ไม่อนุมัติ" },
];

export default function StuffTableTrack({ searchTerm = '' }) {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [asc, setAsc] = useState(true);
  const perPage = 3;

  const sorted = [...trackData].sort((a, b) => asc ? a.id - b.id : b.id - a.id);

  const renderStatus = (st) => st.includes('ไม่') ? 'ไม่อนุมัติ' : 'อนุมัติ';

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
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" className="stuff-no-data">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          ) : (
            items.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.code}</td>
                <td>{i.stock}</td>
                <td>{i.amount}</td>
                <td>{i.date}</td>
                <td className={`stuff-status stuff-${i.status.includes('ไม่') ? 'rejected' : 'approved'}`}>{renderStatus(i.status)}</td>
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
