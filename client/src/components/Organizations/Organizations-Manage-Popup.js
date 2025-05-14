import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./Organizations-Manage-Popup.css";

export default function OrganizationsManagePopup({
  onClose,
  companyData,
  onDeleteCompany,
  onEditCompany,
}) {
  const [name, setName] = useState(companyData.name);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // update handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("กรุณากรอกชื่อบริษัท");
      return;
    }

    try {
      setSaving(true);
      const res = await axios.put(
        `${API_URL}/companies/update_company.php`,
        { id: companyData.id, name: name.trim() }
      );
      if (res.data.status === "success") {
        onEditCompany(companyData.id, res.data.data.name);
      } else {
        alert("อัปเดตไม่สำเร็จ: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดขณะอัปเดต");
    } finally {
      setSaving(false);
    }
  };

  // delete handler
  const handleDelete = async () => {
    if (
      !window.confirm(
        `คุณแน่ใจว่าต้องการลบ "${companyData.name}" หรือไม่?`
      )
    ) {
      return;
    }
    try {
      setDeleting(true);
      const res = await axios.delete(
        `${API_URL}/companies/delete_company.php`,
        { data: { id: companyData.id } }
      );
      if (res.data.status === "success") {
        onDeleteCompany(companyData.id);
      } else {
        alert("ลบไม่สำเร็จ: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดขณะลบ");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="manage-popup-container">
      <div className="manage-popup-box">
        <div className="manage-popup-header">
          <span>จัดการบริษัท/ห้าง/ร้าน</span>
          <button
            className="manage-close-btn"
            onClick={onClose}
            disabled={saving || deleting}
          >
            ✕
          </button>
        </div>

        <div className="manage-popup-body">
          <form onSubmit={handleSubmit}>
            <div className="manage-form-row">
              <label>ชื่อบริษัท/ห้าง/ร้าน</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saving || deleting}
              />
            </div>

            <div className="manage-popup-footer">
              <button
                type="button"
                className="manage-delete-btn"
                onClick={handleDelete}
                disabled={saving || deleting}
              >
                {deleting ? "กำลังลบ..." : "ลบ"}
              </button>
              <button
                type="submit"
                className="manage-submit-btn"
                disabled={saving || deleting}
              >
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
