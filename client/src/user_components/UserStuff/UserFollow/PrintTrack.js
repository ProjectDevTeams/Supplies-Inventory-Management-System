import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PrintTrack.css";

export default function PrintTrackPage() {
  const { state } = useLocation();
  const data = state?.data || {};

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => window.print(), 500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const formatThaiDate = (dateStr = "") => {
    const d = dateStr ? new Date(dateStr) : new Date();
    const thMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    return `${d.getDate()} ${thMonths[d.getMonth()]} ${d.getFullYear() + 543}`;
  };

  return (
    <div className="printtrack-wrapper">
      {/* Logo */}
      <div className="printtrack-logo-header">
        <img src="/image/logo.png" alt="logo" className="printtrack-logo" />
      </div>

      {/* Title */}
      <h2 className="printtrack-title">ใบเบิกวัสดุ</h2>

      {/* Info */}
      <table className="printtrack-info-table">
        <tbody>
          <tr>
            <td style={{ width: "50%" }}>
              ชื่อพนักงาน .......................................................
            </td>
            <td>
              เลขที่/ปีงบประมาณ .................................................
            </td>
          </tr>
          <tr>
            <td>
              หน่วยงาน ..........................................................
            </td>
            <td>
              วันที่ {formatThaiDate(data.date)}
            </td>
          </tr>
          <tr>
            <td>
              ความประสงค์จะขอเบิกวัสดุ จำนวน ....... รายการ
            </td>
            <td>
              ตำแหน่ง ..........................................................
            </td>
          </tr>
          <tr>
            <td>
              โทรศัพท์ .........
            </td>
            <td>
              เพื่อใช้ในงาน/กิจกรรม ..................................................
            </td>
          </tr>
        </tbody>
      </table>

      {/* Table */}
      <table className="printtrack-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>ลำดับที่</th>
            <th style={{ width: "55%" }}>รายการวัสดุ</th>
            <th style={{ width: "15%" }}>จำนวน</th>
            <th style={{ width: "20%" }}>หน่วยนับ</th>
          </tr>
        </thead>
        <tbody>
          {(data.items || []).map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
          {Array.from({ length: 9 - (data.items?.length || 0) }).map((_, i) => (
            <tr key={i}>
              <td>&nbsp;</td><td></td><td></td><td></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Signatures */}
      <table className="printtrack-sign-table">
        <tbody>
          <tr>
            <td>
              <p className="sign-header">
                ข้าพเจ้าขอรับรองว่าวัสดุที่ขอเบิกไปใช้ในราชการหน่วยงานเท่านั้น
              </p>
              <p className="sign-line">ลงชื่อ..........................................ผู้ขอเบิก</p>
              <p className="sign-line">( ................................. )</p>
              <p className="sign-line">วันที่.................................</p>
              <div className="sign-gap" />
              <p className="sign-line">ลงชื่อ..........................................หัวหน้างาน</p>
              <p className="sign-line">( ........................................ )</p>
              <p className="sign-line">วันที่.................................</p>
            </td>
            <td>
              <p className="sign-header">
                ข้าพเจ้าได้ตรวจรับวัสดุที่ขอเบิกแล้วครบถ้วนตามรายการที่ได้รับอนุมัติ
              </p>
              <p className="sign-line">ลงชื่อ..........................................ผู้รับของ</p>
              <p className="sign-line">( ........................................ )</p>
              <p className="sign-line">วันที่.................................</p>
              <div className="sign-gap" />
              <p className="sign-line">ลงชื่อ..........................................ผู้จ่ายของ</p>
              <p className="sign-line">( ........................................ )</p>
              <p className="sign-line">วันที่.................................</p>
              <div className="sign-gap" />
              <p className="sign-line">ลงชื่อ..........................................ผู้สั่งจ่ายวัสดุ</p>
              <p className="sign-line">( ........................................ )</p>
              <p className="sign-line">วันที่.................................</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
