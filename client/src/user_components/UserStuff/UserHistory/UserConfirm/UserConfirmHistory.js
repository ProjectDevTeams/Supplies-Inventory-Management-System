import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/Navbar/Navbar';
import { API_URL } from "../../../../config";
import axios from "axios";
import './UserConfirmHistory.css';

export default function UserConfirmHistory() {
  const location = useLocation();              // ✅ ใช้เพื่อรับค่าที่ส่งมาจาก route ก่อนหน้า
  const navigate = useNavigate();              // ✅ ใช้เพื่อกลับหน้าก่อน
  const id = location.state?.id;               // ✅ รับ id ของใบเบิกวัสดุจากหน้าที่กดมา

  const [data, setData] = useState(null);      // ✅ เก็บข้อมูลใบเบิกวัสดุที่โหลดมาจาก backend

  // ✅ โหลดข้อมูลจาก API เมื่อ id เปลี่ยน
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`, {
          params: { id } // ✅ ส่ง id ไปยัง PHP เพื่อค้นหาใบเบิกที่ต้องการ
        });
        if (res.data.status === 'success' && Array.isArray(res.data.data)) {
          setData(res.data.data[0]); // ✅ ใช้ข้อมูลใบเบิกตัวแรกใน array ที่ส่งกลับมา
        }
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล", err); // ✅ แสดง error กรณี API ล้มเหลว
      }
    };

    if (id) fetchData(); // ✅ เรียกฟังก์ชันดึงข้อมูลเมื่อ id มีค่า
  }, [id]);

  // ✅ ถ้ายังโหลดไม่เสร็จ หรือไม่มีข้อมูล items ให้แสดงข้อความโหลด
  if (!data || !data.items) {
    return <div className="user-confirm-loading">กำลังโหลดข้อมูล...</div>;
  }

  // ✅ คำนวณราคารวมทั้งหมด
  const total = data.items.reduce((sum, i) => sum + parseFloat(i.total_price), 0).toFixed(2);

  return (
    <div className="user-confirm-page">
      <Navbar /> {/* ✅ แสดง Navbar ด้านบน */}
      <main className="user-confirm-content">
        <div className="user-confirm-box">
          <h1 className="user-confirm-title">ใบเบิกวัสดุ</h1>

          {/* ✅ แสดงข้อมูลรายละเอียดส่วนหัว */}
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

          {/* ✅ ตารางแสดงรายการวัสดุ */}
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

          {/* ✅ แสดงสถานะการอนุมัติ */}
          <div className="user-confirm-status">
            <label>สถานะการอนุมัติ : </label>
            <span className="user-confirm-approval-text" style={{ color: "#009244", fontWeight: "bold" }}>
              {data.Admin_status === "อนุมัติ"
                ? `อนุมัติแล้ว (ฝ่ายบริการโครงสร้างพื้นฐานด้านวิทยาศาสตร์ฯ)`
                : data.Admin_status || "-"}
            </span>
          </div>

          {/* ✅ ปุ่มกลับไปหน้าก่อนหน้า */}
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
