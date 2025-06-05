import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/Navbar/Navbar';
import axios from 'axios';
import { API_URL } from '../../../../config';
import './UserConfirmHistory.css';

export default function UserConfirmHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`, { params: { id } })
      .then(res => {
        if (res.data.status === 'success' && Array.isArray(res.data.data)) {
          setData(res.data.data[0]);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!data || !data.items) {
    return <div className="user-confirm-loading">กำลังโหลดข้อมูล...</div>;
  }

  const total = data.items.reduce((sum, i) => sum + parseFloat(i.total_price), 0).toFixed(2);

  return (
    <div className="user-confirm-page">
      <Navbar />
      <main className="user-confirm-content">
        <div className="user-confirm-box">
          <h1 className="user-confirm-title">ใบเบิกวัสดุ</h1>
          <div className="user-confirm-grid">
            <div><strong>เลขที่/ปีงบประมาณ</strong></div>
            <div>{data.running_code}</div>
            <div><strong>วันที่</strong></div>
            <div>{new Date(data.created_at).toLocaleDateString()}</div>
            <div><strong>ชื่อ</strong></div>
            <div>{data.created_by}</div>
            <div><strong>หัวหน้างาน</strong></div>
            <div>{data.supervisor_name || '-'}</div>
            <div><strong>เบิกจำนวน</strong></div>
            <div>{data.items.length} รายการ</div>
            <div><strong>คลัง</strong></div>
            <div>วัสดุในคลัง</div>
            <div><strong>เพื่อใช้ในงาน/กิจกรรม</strong></div>
            <div>{data.reason || '-'}</div>
          </div>
          <h3 className="user-confirm-subtitle">รายการวัสดุ</h3>
          <div className="user-confirm-table-wrapper">
            <table className="user-confirm-table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รายการ</th>
                  <th>จำนวน/หน่วยนับ</th>
                  <th>มูลค่า</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity} {item.unit}</td>
                    <td>{item.total_price}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="3"><strong>รวม</strong></td>
                  <td>{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="user-confirm-status">
            <label>สถานะการอนุมัติ :</label>
            <span className="user-confirm-approval-text">
              {data.Admin_status === "อนุมัติ"
                ? `อนุมัติแล้ว (ฝ่ายบริการโครงสร้างพื้นฐานด้านวิทยาศาสตร์ฯ)`
                : data.Admin_status || "-"}
            </span>
          </div>
          <div className="user-confirm-button-container">
            <button className="user-confirm-btn-back" onClick={() => navigate(-1)}>กลับ</button>
          </div>
        </div>
      </main>
    </div>
  );
}
