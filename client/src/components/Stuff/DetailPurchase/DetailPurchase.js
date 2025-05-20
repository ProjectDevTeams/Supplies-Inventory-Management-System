// File: DetailPurchase.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config';
import './DetailPurchase.css';

export default function DetailPurchase() {
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

  if (!data) return <div className="detail-purchase-container">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="detail-purchase-container">
      <div className="detail-purchase-box">
        <h2 className="detail-purchase-title">รายละเอียดการขอจัดซื้อเพิ่มเติม</h2>
        <div className="detail-purchase-grid">
          <p><b>คลังวัสดุ</b></p><p>{data.stock_type}</p>
          <p><b>หน่วยงาน</b></p><p>{data.department}</p>
          <p><b>ชื่อ</b></p><p>{data.name}</p>
          <p><b>วัสดุสิ้นเปลือง</b></p><p>{data.items[0]?.name || '-'}</p>
          <p><b>จำนวนขอจัดซื้อเพิ่มเติม</b></p><p>{data.items[0]?.quantity || 0}</p>
          <p><b>หมายเหตุ</b></p><p>{data.reason}</p>
          <p><b>สถานะ</b></p>
          <p>
            <select>
              <option>สถานะ</option>
              <option>อนุมัติ</option>
              <option>ไม่อนุมัติ</option>
            </select>
          </p>
          <p><b>รูป</b></p>
          <p>
            {data.items[0]?.image ? (
              <img src={`${API_URL}/uploads/${data.items[0].image}`} alt="item" style={{ maxWidth: '150px' }} />
            ) : (
              "ไม่มีรูป"
            )}
          </p>
        </div>

        <div className="detail-purchase-actions">
          <button className="btn-back" onClick={() => window.history.back()}>
            กลับ
          </button>
        </div>
      </div>
    </div>
  );
}
