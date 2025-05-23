import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import {
  ComponentConfirmDeleteAlert,
  ComponentDeleteSuccessAlert,
  ComponentUpdateSuccessAlert
} from "../SweetAlert/ComponentSweetAlert";
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

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ComponentConfirmDeleteAlert(); // You may swap to incomplete alert if needed
      return;
    }

    try {
      setSaving(true);
      const res = await axios.put(
        `${API_URL}/companies/update_company.php`,
        {
          id: companyData.id,
          name: name.trim(),
          created_by: userId
        }
      );
      if (res.data.status === "success") {
        ComponentUpdateSuccessAlert();
        onEditCompany(companyData.id, res.data.data.name);
        onClose();
      }
    } catch {
      // silently ignore
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const result = await ComponentConfirmDeleteAlert();
    if (!result.isConfirmed) return;
    try {
      setDeleting(true);
      const res = await axios.delete(
        `${API_URL}/companies/delete_company.php`,
        { data: { id: companyData.id } }
      );
      if (res.data.status === "success") {
        ComponentDeleteSuccessAlert();
        onDeleteCompany(companyData.id);
        onClose();
      }
    } catch {
      // silently ignore
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
