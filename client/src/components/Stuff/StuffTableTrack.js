import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../config";
import './StuffTable.css';

export default function StuffTableTrack({ searchTerm = '' }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [asc, setAsc] = useState(true);
  const [trackData, setTrackData] = useState([]);
  const perPage = 3;

  // ✅ ย้ายออกมาเพื่อใช้ซ้ำได้ใน setInterval
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`);
      if (res.data.status === 'success') {
        const transformed = res.data.data.map((item) => ({
          id: item.id,
          code: item.running_code,
          stock: item.stock_type || 'วัสดุในคลัง',
          amount: item.items?.length || 0,
          date: item.created_at || '',
          status: item.Admin_status === 'อนุมัติ' ? 'approved' : item.Admin_status === 'ไม่อนุมัติ' ? 'rejected' : 'pending',
          user_status: item.User_status || '',
        }));
        setTrackData(transformed);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // โหลดครั้งแรก

    const interval = setInterval(() => {
      fetchData(); // โหลดซ้ำทุก 10 วินาที
    }, 10000);

    return () => clearInterval(interval); // เคลียร์เมื่อ component ถูกถอด
  }, []);

  const sorted = [...trackData].sort((a, b) => asc ? a.id - b.id : b.id - a.id);

  const renderStatus = (st) => ({
    pending: 'รออนุมัติ',
    approved: 'อนุมัติ',
    rejected: 'ไม่อนุมัติ',
  }[st] || '-');

  const filtered = sorted
    .filter(i => i.status !== 'pending')
    .filter(item =>
      item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.stock?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date?.includes(searchTerm) ||
      renderStatus(item.status).includes(searchTerm) ||
      item.user_status?.includes(searchTerm)
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
      <div className="stuff-description">ตารางติดตามสถานะการเบิก</div>
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
            <th>สถานะผู้ใช้</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="7" className="stuff-no-data">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          ) : (
            items.map(i => (
              <tr
                key={i.id}
                onClick={() => navigate("/stuff/DetailTrack", { state: { id: i.id } })}
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
                <td className={`user-status ${i.user_status === 'รอรับของ' ? 'waiting' : i.user_status === 'รับของเรียบร้อยแล้ว' ? 'received' : ''}`}>
                  {i.user_status === 'รับของเรียบร้อยแล้ว' ? 'รับของเรียบร้อย' : i.user_status}
                </td>
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
