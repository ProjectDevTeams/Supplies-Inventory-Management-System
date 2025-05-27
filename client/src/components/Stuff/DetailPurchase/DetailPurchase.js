import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config';
import { StuffDetailSweetAlert } from '../Detail/StuffDetailSweetAlert';
import './DetailPurchase.css';

export default function DetailPurchase() {
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

  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/purchase_extras/update_purchase_extras.php`, {
        id,
        approval_status: mapValueToStatus(status),
      });
      StuffDetailSweetAlert();
      navigate(-1);
    } catch (error) {
      console.error("อัปเดตสถานะล้มเหลว:", error);
    }
  };

  if (!data) return <div className="detail-purchase-container">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="detail-purchase-container">
      <div className="detail-purchase-box">
        <h2 className="detail-purchase-title">รายละเอียดการขอจัดซื้อเพิ่มเติม</h2>
        <div className="detail-purchase-grid">
          <p><b>เลขที่ใบขอจัดซื้อเพิ่มเติม</b></p><p>{data.running_code || `PE-${String(data.id).padStart(3, '0')}`}</p>
          <p><b>หน่วยงาน</b></p><p>{data.department}</p>
          <p><b>ชื่อ</b></p><p>{data.name}</p>
          <p><b>หมายเหตุ</b></p><p>{data.reason}</p>
          <p><b>สถานะ</b></p>
          <div className="detail-purchase-select-wrapper">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`detail-purchase-select ${status}`}
            >
              <option value="">สถานะ:</option>
              <option value="approved">อนุมัติ</option>
              <option value="rejected">ไม่อนุมัติ</option>
            </select>
          </div>
        </div>

        <h3 className="detail-purchase-subtitle">รายการวัสดุ</h3>
        <table className="detail-purchase-table">
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
                      className="detail-item-image"
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

        <div className="detail-purchase-actions">
          <button className="detail-purchase-btn-back" onClick={() => navigate(-1)}>กลับ</button>
          <button
            className="detail-purchase-btn-save"
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
