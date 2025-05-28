import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { ComponentAddSuccessAlert, ComponentIncompleteAlert } from "../../SweetAlert/ComponentSweetAlert";
import "./AddCategorize_popup.css";

function AddCatagorizePopup({ onClose, onAdd }) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      ComponentIncompleteAlert();
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/material_categories/add_material_categories.php`, {
        name: categoryName.trim(),
      });

      if (res.data.status === "success") {
        ComponentAddSuccessAlert();
        onAdd?.();
        onClose?.();
      } else {
        ComponentIncompleteAlert();
      }
    } catch (err) {
      console.error("เพิ่มหมวดหมู่ล้มเหลว:", err);
      ComponentIncompleteAlert();
    }
  };

  return (
    <div className="popup-overlay-categorize">
      <div className="popup-box-categorize">
        <div className="popup-header-categorize">
          <span>เพิ่มหมวดหมู่ใหม่</span>
          <button className="close-btn-categorize" onClick={onClose}>✕</button>
        </div>
        <div className="popup-body-categorize">
          <form className="popup-form-categorize" onSubmit={handleSubmit}>
            <label htmlFor="category">หมวด</label>
            <input
              type="text"
              id="category"
              className="popup-input-categorize"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button type="submit" className="popup-submit-categorize">ยืนยัน</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCatagorizePopup;
