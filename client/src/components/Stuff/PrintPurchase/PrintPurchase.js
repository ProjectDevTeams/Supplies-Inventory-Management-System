import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PrintPurchase.css';
import { API_URL } from '../../../config'; 

export default function PrintPurchasePage() {
  const location = useLocation();
  const passedData = location.state?.data;
  const [data, setData] = useState(passedData || null);
  const [hasPrinted, setHasPrinted] = useState(false);

  const formatThaiDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const thMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    return `${date.getDate()} ${thMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

  useEffect(() => {
    if (data && !hasPrinted) {
      setHasPrinted(true);
      setTimeout(() => window.print(), 500);
    }
  }, [data, hasPrinted]);

  if (!data) return <div className="printpurchase-wrapper">ไม่มีข้อมูลสำหรับพิมพ์</div>;

  return (
    <div className="printpurchase-wrapper">
      {/* หัวกระดาษ */}
      <div className="printpurchase-header">
        <img src="/image/logo.png" alt="logo" className="printpurchase-logo" />
        <div className="printpurchase-date">วันที่: {formatThaiDate(new Date())}</div>
      </div>

      {/* หัวเรื่อง */}
      <h2 className="printpurchase-title">รายละเอียดการขอจัดซื้อเพิ่มเติม</h2>

      {/* ข้อมูลทั่วไป */}
      <div className="printpurchase-info-grid">
        <div>
          <strong>เลขที่ใบขอจัดซื้อเพิ่มเติม</strong>
          <div>{data.running_code || `PE-${String(data.id).padStart(3, '0')}`}</div>
        </div>
        <div>
          <strong>หน่วยงาน</strong>
          <div>{data.department || '-'}</div>
        </div>
        <div>
          <strong>ชื่อ</strong>
          <div>{data.full_name || data.name || '-'}</div>
        </div>
        <div>
          <strong>หมายเหตุ</strong>
          <div>{data.reason || '-'}</div>
        </div>
        <div>
          <strong>สถานะ</strong>
          <div>{data.approval_status || '-'}</div>
        </div>
        <div>
          <strong>จำนวนรายการ</strong>
          <div>{data.items?.length || 0} รายการ</div>
        </div>
      </div>

      {/* หัวตารางวัสดุ */}
      <h3 className="printpurchase-subtitle">รายการวัสดุ</h3>
      <table className="printpurchase-table">
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '45%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>รูปภาพ</th>
            <th>รายการ</th>
            <th>จำนวน/หน่วยนับ</th>
          </tr>
        </thead>
        <tbody>
          {data.items?.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                {item.image ? (
                  <img
                    src={`${API_URL}/${item.image}`}
                    alt={item.name || item.material_name || item.new_material_name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                ) : (
                  <span>ไม่มีรูป</span>
                )}
              </td>
              <td>{item.name || item.material_name || item.new_material_name || '-'}</td>
              <td>{item.quantity} {item.unit || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ลายเซ็น */}
      <div className="printpurchase-signature">
        <div className="printpurchase-sign-box">
          <div>( ..................................................... )</div>
          <div>(ผู้ขอจัดซื้อ)</div>
        </div>
        <div className="printpurchase-sign-box">
          <div>( ..................................................... )</div>
          <div>(ผู้อนุมัติ)</div>
        </div>
      </div>
    </div>
  );
}
