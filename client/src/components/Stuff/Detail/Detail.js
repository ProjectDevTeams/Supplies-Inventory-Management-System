import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import './Detail.css';

const mockData = {
  code: "003-02/2568",
  date: "2025-02-12 14:20:10",
  name: "นางสาวเพลิงดาว วิริยา",
  department: "STI",
  usage: "ใช้ในฝ่าย",
  stock: "วัสดุในคลัง",
  items: [
    { name: "Pentax ใบมีดตัดเตอร์ใหญ่ L150", qty: 2, unit: "กล่อง", price: 22.00 }
  ],
  status: "approved",
  receiveStatus: ""
};

export default function Detail() {
  const total = mockData.items.reduce((sum, i) => sum + (i.qty * i.price), 0).toFixed(2);

  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          <h1 className="detail-header">ใบเบิกวัสดุ</h1>
          <div className="detail-box">
            <h2 className="detail-title">ใบเบิกวัสดุ</h2>
            <div className="detail-grid">
              <p><b>เลขที่/ปีงบประมาณ</b><br /> {mockData.code}</p>
              <p><b>วันที่</b><br /> {mockData.date}</p>
              <p><b>ชื่อ</b><br /> {mockData.name}</p>
              <p><b>สังกัด</b><br /> {mockData.department}</p>
              <p><b>เบิกจำนวน</b><br /> {mockData.items.length} รายการ</p>
              <p><b>คลัง</b><br /> {mockData.stock}</p>
              <p><b>เพื่อใช้ในงาน/กิจกรรม</b><br /> {mockData.usage}</p>
            </div>

            <h3 className="detail-subtitle">รายการวัสดุ</h3>
            <table className="detail-table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รายการ</th>
                  <th>จำนวน/หน่วยนับ</th>
                  <th>มูลค่า</th>
                </tr>
              </thead>
              <tbody>
                {mockData.items.map((row, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.qty} {row.unit}</td>
                    <td>{(row.qty * row.price).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3"><b>รวม</b></td>
                  <td>{total}</td>
                </tr>
              </tbody>
            </table>

            <div className="detail-status">
              <label>สถานะการอนุมัติ : </label>
              <select defaultValue={mockData.status}>
                <option value="">สถานะ:</option>
                <option value="approved">อนุมัติ</option>
                <option value="rejected">ไม่อนุมัติ</option>
              </select>
            </div>

            <div className="detail-status">
              <label>สถานะการรับของ : </label>
              <span className={`status-label ${mockData.receiveStatus}`}>
                {mockData.receiveStatus || " "}
              </span>
            </div>

            <button className="btn-back" onClick={() => window.history.back()}>กลับ</button>
          </div>
        </main>
      </div>
    </div>
  );
}
