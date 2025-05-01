import React, { useState } from 'react';
import './StuffTable.css';

const purchaseData = [
  { id:1, code:"001-01/2568", stock:"วัสดุในคลัง", amount:2, date:"5 ม.ค. 68", status:"approved" },
  { id:2, code:"002-01/2568", stock:"วัสดุในคลัง", amount:1, date:"10 ม.ค. 68", status:"pending" },
  { id:3, code:"003-01/2568", stock:"วัสดุในคลัง", amount:3, date:"15 ม.ค. 68", status:"rejected" },
  { id:4, code:"004-01/2568", stock:"วัสดุในคลัง", amount:2, date:"18 ม.ค. 68", status:"approved" },
  { id:5, code:"005-01/2568", stock:"วัสดุในคลัง", amount:5, date:"20 ม.ค. 68", status:"approved" },
  { id:6, code:"006-01/2568", stock:"วัสดุในคลัง", amount:1, date:"25 ม.ค. 68", status:"pending" },
];

export default function StuffTablePurchase({ searchTerm = '' }) {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [asc, setAsc] = useState(true);
  const perPage = 4;

  const renderStatus = (st) => ({
    pending: 'รออนุมัติ',
    approved: 'อนุมัติ',
    rejected: 'ไม่อนุมัติ',
  }[st] || '-');

  const sorted = [...purchaseData].sort((a, b) => asc ? a.id - b.id : b.id - a.id);

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
    <div className="table-wrapper">
      <div className="table-container">
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
            {items.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.code}</td>
                <td>{i.stock}</td>
                <td>{i.amount}</td>
                <td>{i.date}</td>
                <td className={`status ${i.status}`}>{renderStatus(i.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="stuff-pagination">
          <div className="stuff-pagination-info">
            แสดง {(page - 1) * perPage + 1} ถึง {Math.min(page * perPage, filtered.length)} จาก {filtered.length} แถว
          </div>
          <div className="stuff-pagination-buttons">
            <button className="btn" disabled={page === 1} onClick={prev}>ก่อนหน้า</button>
            <input
              type="text"
              className="org-page-input"
              placeholder={`${page} / ${total}`}
              value={input}
              onFocus={() => setInput('')}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
            />
            <button className="btn" disabled={page === total} onClick={next}>ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
}
