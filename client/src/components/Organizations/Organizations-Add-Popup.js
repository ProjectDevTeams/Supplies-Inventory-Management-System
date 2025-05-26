import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import {
  ComponentIncompleteAlert,
  ComponentAddSuccessAlert
} from "../SweetAlert/ComponentSweetAlert";
import "./Organizations-Add-Popup.css";

export default function OrganizationsAddPopup({ onClose, onAddCompany }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ComponentIncompleteAlert();
      return;
    }
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id || 0;

      const res = await axios.post(
        `${API_URL}/companies/add_company.php`,
        {
          name: name.trim(),
          created_by: userId
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === "success") {
        ComponentAddSuccessAlert();
        onAddCompany(res.data.data);
        onClose();
      } else {
        ComponentIncompleteAlert();
      }
    } catch {
      ComponentIncompleteAlert();
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
