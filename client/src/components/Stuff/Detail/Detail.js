import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config';
import { StuffDetailSweetAlert } from './StuffDetailSweetAlert';
import './Detail.css';


export default function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [originalStatus, setOriginalStatus] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/stuff_material_items/get_stuff_material_items.php?id=${id}`);
        if (res.data.status === "success") {
          setData(res.data.data);
          setStatus(res.data.data.Admin_status);
          setOriginalStatus(res.data.data.Admin_status);
        }
      } catch (error) {
        console.error("โหลดข้อมูลล้มเหลว:", error);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (!data) return <div className="loading">กำลังโหลดข้อมูล...</div>;

  const total = data.items.reduce((sum, i) => sum + parseFloat(i.total_price), 0).toFixed(2);

  const handleSave = async () => {
    try {
      await axios.post(
        `${API_URL}/stuff_materials/update_stuff_materials.php`,
        {
          id,
          Admin_status: status
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      StuffDetailSweetAlert();
      navigate("/stuff");
    } catch (err) {
      console.error("อัปเดตสถานะล้มเหลว:", err);
      alert("ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  return (
    <div className="detail-stuff-box">
      <h2 className="detail-stuff-title">ใบเบิกวัสดุ</h2>
      <div className="detail-stuff-grid">
        <p><b>เลขที่/ปีงบประมาณ</b></p><p>{data.running_code}</p>
        <p><b>วันที่</b></p><p>{data.created_at}</p>
        <p><b>ชื่อ</b></p><p>{data.name}</p>
        <p><b>สังกัด</b></p><p>{data.department}</p>
        <p><b>เบิกจำนวน</b></p><p>{data.items.length} รายการ</p>
        <p><b>เพื่อใช้ในงาน/กิจกรรม</b></p><p>{data.reason}</p>
      </div>

      <h3 className="detail-stuff-subtitle">รายการวัสดุ</h3>
      <table className="detail-stuff-table">
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

      <div className="detail-stuff-status">
        <label>สถานะการอนุมัติ : </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`detail-stuff-select ${status}`}
        >
          <option value="">สถานะ:</option>
          <option value="อนุมัติ">อนุมัติ</option>
          <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
        </select>
      </div>

      <div className="detail-stuff-status">
        <label>สถานะการรับของ : </label>
        <span className={`status-stuff-label ${data.User_status}`}>
          {data.User_status || " "}
        </span>
      </div>

      <div className="detail-stuff-button-container">
        <button className="btn-stuff-back" onClick={() => window.history.back()}>ย้อนกลับ</button>
        <button
          className="detail-stuff-btn-save"
          onClick={handleSave}
          disabled={status === originalStatus}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
}
