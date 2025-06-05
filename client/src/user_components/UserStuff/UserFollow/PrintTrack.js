import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import "./PrintTrack.css";

export default function PrintTrackPage() {
  const location = useLocation();
  const id = location.state?.id;

  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState({ position: "", phone: "" }); // ⭐ state ใหม่

  useEffect(() => {
    if (!id) return;

    axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`, { params: { id } })
      .then(res => {
        if (res.data.status === 'success' && Array.isArray(res.data.data)) {
          const itemData = res.data.data[0];
          setData(itemData);

          // ⭐ โหลด users แล้วหา created_by_id
          if (itemData.created_by_id) {
            axios.get(`${API_URL}/users/get_users.php`)
              .then(userRes => {
                if (Array.isArray(userRes.data)) {
                  const foundUser = userRes.data.find(u => parseInt(u.id) === parseInt(itemData.created_by_id));
                  if (foundUser) {
                    setUserInfo({
                      position: foundUser.position || "",
                      phone: foundUser.phone || ""
                    });
                  } else {
                    console.warn("⚠️ ไม่พบ user ตรงกับ created_by_id");
                  }
                }
              })
              .catch(err => console.error("❌ โหลด userInfo ผิดพลาด:", err));
          }
        } else {
          console.warn("⚠️ API success แต่ data ไม่ใช่ array หรือว่าง");
        }
      })
      .catch(err => console.error("❌ โหลดข้อมูลผิดพลาด:", err));
  }, [id]);

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

  if (!data || !data.items) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  const total = data.items.reduce((sum, i) => sum + parseFloat(i.total_price), 0).toFixed(2);

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
              ชื่อพนักงาน {data.created_by || "......................................................."}
            </td>
            <td>
              เลขที่/ปีงบประมาณ {data.running_code || "................................................."}
            </td>
          </tr>
          <tr>
            <td>
              วันที่ {formatThaiDate(data.created_at)}
            </td>
            <td>
              คลัง วัสดุในคลัง
            </td>
          </tr>
          <tr>
            <td>
              โทรศัพท์ {userInfo.phone || ".........................................................."}              
            </td>
            <td>
              ตำแหน่ง {userInfo.position || ".........................................................."}
            </td>
          </tr>
          <tr>
            <td>
              ความประสงค์จะขอเบิกวัสดุ จำนวน {data.items.length} รายการ
            </td>
            <td>
              เพื่อใช้ในงาน/กิจกรรม {data.reason || "-"}
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
            <th style={{ width: "15%" }}>จำนวน/หน่วยนับ</th>
            <th style={{ width: "20%" }}>มูลค่า</th>
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
            <td colSpan="3"><strong>รวม</strong></td>
            <td>{total}</td>
          </tr>
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
              <p className="sign-line">ลงชื่อ..............................................................ผู้ขอเบิก</p>
              <p className="sign-line">({data.created_by || "......................................................."})</p>
              <p className="sign-line">วันที่ {formatThaiDate(data.created_at)}</p>
              <div className="sign-gap" />
              <p className="sign-line">ลงชื่อ..............................................................หัวหน้างาน</p>
              <p className="sign-line">({data.supervisor_name || "................................................."})</p>
              <p className="sign-line">วันที่.....................................................................</p>
            </td>
            <td>
              <p className="sign-header">
                ข้าพเจ้าได้ตรวจรับวัสดุที่ขอเบิกแล้วครบถ้วนตามรายการที่ได้รับอนุมัติ
              </p>
              <p className="sign-line">ลงชื่อ..............................................................ผู้รับของ</p>
              <p className="sign-line">({data.created_by || "......................................................."})</p>
              <p className="sign-line">วันที่.................................................................</p>
              <div className="sign-gap" />
              <p className="sign-line">ลงชื่อ..............................................................ผู้จ่ายของ</p>
              <p className="sign-line">(..............................................................)</p>
              <p className="sign-line">วันที่...................................................................</p>
              <div className="sign-gap" />
              <p className="sign-line">ลงชื่อ..............................................................ผู้สั่งจ่ายวัสดุ</p>
              <p className="sign-line">(..............................................................)</p>
              <p className="sign-line">วันที่..........................................................................</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
