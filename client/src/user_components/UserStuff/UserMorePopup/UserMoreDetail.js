// UserMoreDetail.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../../config';
import './UserMoreDetail.css';

export default function UserMoreDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [originalStatus, setOriginalStatus] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/purchase_extras_items/get_purchase_extras_items.php?id=${id}`);
        if (res.data.status === "success") {
          setData(res.data.data);
          const currentStatus = mapStatusToValue(res.data.data.approval_status);
          setStatus(currentStatus);
          setOriginalStatus(currentStatus);
        }
      } catch (error) {
        console.error("โหลดข้อมูลล้มเหลว:", error);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  const mapStatusToValue = (status) => {
    if (status === 'อนุมัติ') return 'approved';
    if (status === 'ไม่อนุมัติ') return 'rejected';
    return '';
  };

  const mapValueToStatus = (value) => {
    if (value === 'approved') return 'อนุมัติ';
    if (value === 'rejected') return 'ไม่อนุมัติ';
    return 'รออนุมัติ';
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลสำเร็จ',
      text: 'อัพเดตสถานะเสร็จสิ้น',
      position: 'center',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/purchase_extras/update_purchase_extras.php`, {
        id,
        approval_status: mapValueToStatus(status),
      });
      showSuccessAlert();
      navigate(-1);
    } catch (error) {
      console.error("อัปเดตสถานะล้มเหลว:", error);
    }
  };

  if (!data) return <div className="more-detail-container">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="more-detail-container">
      <div className="more-detail-box">
        <h2 className="more-detail-title">รายละเอียดการขอจัดซื้อเพิ่มเติม</h2>
        <div className="more-detail-grid">
          <p><b>เลขที่ใบขอจัดซื้อเพิ่มเติม</b></p><p>{data.running_code || `PE-${String(data.id).padStart(3, '0')}`}</p>
          <p><b>คลังวัสดุ</b></p><p>{data.items[0]?.stock_type || 'วัสดุในคลัง'}</p>
          <p><b>หน่วยงาน</b></p><p>{data.department}</p>
          <p><b>ชื่อ</b></p><p>{data.name}</p>
          <p><b>หมายเหตุ</b></p><p>{data.reason}</p>
          <p><b>สถานะ</b></p>
          <div className="more-detail-select-wrapper">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`more-detail-select ${status}`}
            >
              <option value="">สถานะ:</option>
              <option value="approved">อนุมัติ</option>
              <option value="rejected">ไม่อนุมัติ</option>
            </select>
          </div>
        </div>

        <h3 className="more-detail-subtitle">รายการวัสดุ</h3>
        <table className="more-detail-table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รูปภาพ</th>
              <th>รายการ</th>
              <th>จำนวน/หน่วยนับ</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((row, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  {row.image ? (
                    <img
                      src={`${API_URL}/${row.image}`}
                      alt={row.name || row.new_material_name}
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      className="more-detail-item-image"
                    />
                  ) : (
                    <span>ไม่มีรูป</span>
                  )}
                </td>
                <td>{row.name || row.new_material_name}</td>
                <td>{row.quantity} {row.unit || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="more-detail-actions">
          <button className="more-detail-btn-back" onClick={() => navigate(-1)}>กลับ</button>
          <button
            className="more-detail-btn-save"
            onClick={handleSave}
            disabled={status === originalStatus}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
