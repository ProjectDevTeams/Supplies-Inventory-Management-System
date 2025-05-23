// File: DetailTrack.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config';
import './DetailTrack.css';

export default function DetailTrack() {
  const location = useLocation();
  const id = location.state?.id;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/stuff_material_items/get_stuff_material_items.php?id=${id}`);
        if (res.data.status === "success") {
          setData(res.data.data);
        }
      } catch (error) {
        console.error("โหลดข้อมูลล้มเหลว:", error);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (!data) return <div className="detail-track-container">กำลังโหลดข้อมูล...</div>;

  const total = data.items.reduce((sum, i) => sum + parseFloat(i.total_price), 0).toFixed(2);

  return (
    <div className="detail-track-container">
      <div className="detail-track-box">
        <h2 className="detail-track-title">ใบเบิกวัสดุ</h2>
        <div className="detail-track-grid">
          <p><b>เลขที่/ปีงบประมาณ</b></p><p>{data.running_code}</p>
          <p><b>วันที่</b></p><p>{data.created_at}</p>
          <p><b>ชื่อ</b></p><p>{data.name}</p>
          <p><b>สังกัด</b></p><p>{data.department}</p>
          <p><b>เบิกจำนวน</b></p><p>{data.items.length} รายการ</p>
          <p><b>เพื่อใช้ในงาน/กิจกรรม</b></p><p>{data.reason}</p>
        </div>

        <h3 className="detail-track-subtitle">รายการวัสดุ</h3>
        <table className="detail-track-table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รายการ</th>
              <th>จำนวน/หน่วยนับ</th>
              <th>มูลค่า</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((row, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{row.name}</td>
                <td>{row.quantity} {row.unit}</td>
                <td>{parseFloat(row.total_price).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3"><b>รวม</b></td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>

        <div className="detail-track-actions">
          <button className="detail-track-btn-back " onClick={() => window.history.back()}>
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
}
