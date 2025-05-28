import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { ComponentUpdateSuccessAlert, ComponentIncompleteAlert } from "../../SweetAlert/ComponentSweetAlert";
import "./AddCategorize_popup.css";

function EditCatagorizePopup({ onClose, onUpdate, category }) {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      ComponentIncompleteAlert();
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/material_categories/update_material_categories.php`, {
        id: category.id,
        name: categoryName.trim()
      });

      if (res.data.status === "success") {
        ComponentUpdateSuccessAlert();
        onUpdate?.();
        onClose?.();
      } else {
        ComponentIncompleteAlert();
      }
    } catch {
      ComponentIncompleteAlert();
    }
  };

  return (
    <div className="popup-overlay-categorize">
      <div className="popup-box-categorize">
        <div className="popup-header-categorize">
          <span>แก้ไขชื่อหมวดหมู่</span>
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

export default EditCatagorizePopup;
