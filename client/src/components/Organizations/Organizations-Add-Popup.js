import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./Organizations-Add-Popup.css";

export default function OrganizationsAddPopup({ onClose, onAddCompany }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("กรุณากรอกชื่อร้านค้าใหม่");
      return;
    }
    try {
      setLoading(true);
      // ดึง userId จาก localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

      const res = await axios.post(
        `${API_URL}/companies/add_company.php`,
        {
          name,
          created_by: userId
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === "success") {
        onAddCompany(res.data.data);
        onClose();
      } else {
        alert("เกิดข้อผิดพลาด: " + res.data.message);
      }
    } catch {
      alert("ไม่สามารถบันทึกได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-popup-container">
      <div className="add-popup-box">
        <div className="add-popup-header">
          <span>เพิ่มร้านค้าใหม่</span>
          <button className="add-close-btn" onClick={onClose} disabled={loading}>
            ✕
          </button>
        </div>
        <div className="add-popup-body">
          <form onSubmit={handleSubmit}>
            <div className="add-form-row">
              <label>ชื่อบริษัท/ห้าง/ร้าน</label>
              <input
                type="text"
                placeholder="กรอกชื่อร้านค้าใหม่"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="add-form-footer">
              <button type="submit" className="add-submit-btn" disabled={loading}>
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
