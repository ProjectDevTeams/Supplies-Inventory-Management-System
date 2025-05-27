import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/Navbar/Navbar';
import { API_URL } from "../../../../config";
import axios from "axios";
import './UserConfirmHistory.css';

export default function UserConfirmHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;

  const [data, setData] = useState(null);
  const timeRef = useRef(null); // ✅ ใช้สำหรับเก็บ "เวลา ณ ขณะเปิดหน้า" (จะไม่เปลี่ยน)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`, {
          params: { id }
        });
        if (res.data.status === 'success' && Array.isArray(res.data.data)) {
          setData(res.data.data[0]);

          // ✅ เก็บเวลาครั้งแรกตอนโหลดเสร็จ (แค่ครั้งเดียว)
          if (!timeRef.current) {
            const now = new Date();
            const options = {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            };
            const formatted = now.toLocaleTimeString("th-TH", options);
            timeRef.current = formatted;
          }
        }
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล", err);
      }
    };

    if (id) fetchData();
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
            <p><b>เลขที่/ปีงบประมาณ</b></p>
            <p>{data.running_code}</p>
            <p><b>วันที่</b></p>
            <p>{data.created_at}</p>
            <p><b>ชื่อ</b></p>
            <p>{data.created_by}</p>
            <p><b>สังกัด</b></p>
            <p>{"-"}</p>
            <p><b>เบิกจำนวน</b></p>
            <p>{data.items.length} รายการ</p>
            <p><b>คลัง</b></p>
            <p>วัสดุในคลัง</p>
            <p><b>เพื่อใช้ในงาน/กิจกรรม</b></p>
            <p>{data.reason || "-"}</p>
          </div>

          <h3 className="user-confirm-subtitle">รายการวัสดุ</h3>
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
              <tr>
                <td colSpan="3"><b>รวม</b></td>
                <td>{total}</td>
              </tr>
            </tbody>
          </table>

          <div className="user-confirm-status">
            <label>สถานะการอนุมัติ : </label>
            <span className="user-confirm-approval-text" style={{ color: "#009244", fontWeight: "bold" }}>
              {data.Admin_status === "อนุมัติ"
                ? `อนุมัติแล้ว (ฝ่ายบริการโครงสร้างพื้นฐานด้านวิทยาศาสตร์ฯ ${timeRef.current})`
                : data.Admin_status || "-"}
            </span>
          </div>

          <div className="user-confirm-button-container">
            <button className="user-confirm-btn-back" onClick={() => navigate(-1)}>
              กลับ
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
