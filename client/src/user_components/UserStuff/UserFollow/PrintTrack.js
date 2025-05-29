// File: PrintTrackPage.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PrintTrack.css";

export default function PrintTrackPage() {
  const { state } = useLocation();
  const data = state?.data;
  console.log("📦 รับข้อมูลจาก navigate:", data);
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => window.print(), 500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const formatThaiDate = (dateStr) => {
    const d = new Date(dateStr);
    const thMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
                      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    return `${d.getDate()} ${thMonths[d.getMonth()]} ${d.getFullYear() + 543}`;
  };

  if (!data) return <div style={{ padding: "2cm" }}>ไม่พบข้อมูล</div>;

  return (
    <div className="printtrack-wrapper">
      <div className="printtrack-header">
        <img src="/image/logo.png" alt="logo" className="printtrack-logo" />
        <h2 className="printtrack-title">ใบเบิกวัสดุ</h2>
      </div>

      <div className="printtrack-grid">
        <div>เลขที่ใบเบิก: {data.code}</div>
        <div>วันที่: {formatThaiDate(data.date)}</div>
        <div>ชื่อ: {data.name}</div>
        <div>ตำแหน่ง: {data.position}</div>
        <div>หน่วยงาน: {data.department}</div>
        <div>โทรศัพท์: {data.phone}</div>
      </div>

      <table className="printtrack-table">
        <thead>
          <tr>
            <th>ลำดับที่</th>
            <th>รายการวัสดุ</th>
            <th>จำนวน</th>
            <th>หน่วยนับ</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="printtrack-signature">
        <div>
          <p>ลงชื่อ..................................................... ผู้ขอเบิก</p>
          <p>( {data.name} )</p>
          <p>วันที่..........................................</p>
        </div>
        <div>
          <p>ลงชื่อ..................................................... หัวหน้างาน</p>
          <p>( ............................................... )</p>
          <p>วันที่..........................................</p>
        </div>
        <div>
          <p>ลงชื่อ..................................................... ผู้จ่ายของ</p>
          <p>( ............................................... )</p>
          <p>วันที่..........................................</p>
        </div>
      </div>
    </div>
  );
}
