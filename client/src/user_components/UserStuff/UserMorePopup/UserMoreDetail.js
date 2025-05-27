// UserMoreDetail.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../../config';
import './UserMoreDetail.css';

export default function UserMoreDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;

  // === ใช้ตัวแปรจากโค้ดแรก ===
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [originalStatus, setOriginalStatus] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/purchase_extras_items/get_purchase_extras_items.php?id=${id}`
        );
        if (res.data.status === 'success') {
          const d = res.data.data;
          setData(d);
          setItems(d.items);
          const curr = mapStatusToValue(d.approval_status);
          setStatus(curr);
          setOriginalStatus(curr);
        }
      } catch (err) {
        console.error('โหลดข้อมูลล้มเหลว:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  const mapStatusToValue = s => {
    if (s === 'อนุมัติ') return 'approved';
    if (s === 'ไม่อนุมัติ') return 'rejected';
    return 'pending';
  };
  const mapValueToStatus = v => {
    if (v === 'approved') return 'อนุมัติ';
    if (v === 'rejected') return 'ไม่อนุมัติ';
    return 'รออนุมัติ';
  };

  const save = async () => {
    try {
      await axios.post(
        `${API_URL}/purchase_extras/update_purchase_extras.php`,
        { id, approval_status: mapValueToStatus(status) }
      );
      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        timer: 1500,
        showConfirmButton: false
      });
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !data) {
    return <div className="more-detail-container">กำลังโหลด...</div>;
  }

  const stockOptions = [
    { value: 'วัสดุในคลัง', label: 'วัสดุในคลัง' },
    { value: 'วัสดุนอกคลัง', label: 'วัสดุนอกคลัง' }
  ];
  const approvalOptions = [
    { value: 'pending', label: 'รออนุมัติ' },
    { value: 'approved', label: 'อนุมัติ' },
    { value: 'rejected', label: 'ไม่อนุมัติ' }
  ];

  return (
    <div className="more-detail-container">
      <h2 className="more-detail-title">รายละเอียดการขอจัดซื้อเพิ่มเติม</h2>

      <div className="more-detail-row">
        <label>เลขที่</label>
        <span>{data.running_code || `PE-${String(data.id).padStart(3, '0')}`}</span>
      </div>
      <div className="more-detail-row">
        <label>คลังวัสดุ</label>
        <Select
          classNamePrefix="more-detail-select"
          options={stockOptions}
          value={stockOptions.find(o => o.value === data.items[0]?.stock_type) || null}
          isDisabled
          placeholder={data.items[0]?.stock_type || 'วัสดุในคลัง'}
        />
      </div>
      <div className="more-detail-row">
        <label>หน่วยงาน</label>
        <input
          className="more-detail-input"
          value={data.department}
          readOnly
        />
      </div>
      <div className="more-detail-row">
        <label>ชื่อ</label>
        <input
          className="more-detail-input"
          value={data.name}
          readOnly
        />
      </div>
      <div className="more-detail-row">
        <label>หมายเหตุ</label>
        <textarea
          className="more-detail-textarea"
          rows={3}
          value={data.reason}
          readOnly
        />
      </div>

      {/* แก้เฉพาะตรงนี้ให้เป็น span แสดงสถานะ */}
      <div className="more-detail-row">
        <label>สถานะ</label>
        <span className={`more-detail-status ${status}`}>
          {mapValueToStatus(status)}
        </span>
      </div>

      <hr className="more-detail-divider" />

      <h3 className="more-detail-subtitle">รายการวัสดุ</h3>
      <table className="more-detail-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อวัสดุ</th>
            <th>จำนวน</th>
            <th>ราคา/หน่วย</th>
            <th>ราคารวม</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{it.new_material_name || it.material_name}</td>
              <td>{it.quantity}</td>
              <td>{it.price_per_unit}</td>
              <td>{(it.quantity * it.price_per_unit).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="more-detail-actions">
        <button className="more-detail-btn-back" onClick={() => navigate(-1)}>
          ย้อนกลับ
        </button>
        <button
          className="more-detail-btn-save"
          onClick={save}
          disabled={status === originalStatus}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
}
