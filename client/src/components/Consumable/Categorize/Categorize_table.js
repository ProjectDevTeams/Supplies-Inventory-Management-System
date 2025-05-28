import { useState, useEffect } from "react";
import "./Categorize_table.css";
import AddCatagorizePopup from "./AddCategorize_popup";
import EditCatagorizePopup from "./EditCategorize_popup";
import Categorizebar from "./Categorize_bar";
import axios from "axios";
import { API_URL } from "../../../config";
import { ComponentConfirmDeleteAlert, ComponentDeleteSuccessAlert } from "../../SweetAlert/ComponentSweetAlert";

function Categorize_table() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editId, setEditId] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/material_categories/get_material_categories.php`);
      if (res.data.status === "success" && Array.isArray(res.data.data)) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const result = await ComponentConfirmDeleteAlert();
    if (!result.isConfirmed) return;
    try {
      await axios.post(`${API_URL}/material_categories/delete_material_categories.php`, { id });
      ComponentDeleteSuccessAlert();
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const sortedCategories = [...data].sort((a, b) =>
    a.name.localeCompare(b.name, "th")
  );

  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedCategories = sortedCategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="categorize-table-container">
      <Categorizebar onAddClick={() => setShowAddPopup(true)} />

      {showAddPopup && (
        <AddCatagorizePopup
          onClose={() => {
            setShowAddPopup(false);
            fetchCategories();
          }}
        />
      )}

      {editId !== null && (
        <EditCatagorizePopup
          category={data.find((d) => d.id === editId)}
          onClose={() => setEditId(null)}
          onUpdate={fetchCategories}
        />
      )}

      <table className="categorize-table">
        <thead>
          <tr>
            <th className="categorize-th">อันดับ</th>
            <th className="categorize-th">หมวดหมู่</th>
          </tr>
        </thead>
        <tbody>
          {displayedCategories.map((item, index) => (
            <tr key={item.id} className="categorize-row">
              <td className="categorize-td">{indexOfFirstItem + index + 1}</td>
              <td className="categorize-td">
                {item.name}
                <div className="categorize-actions">
                  <button
                    className="categorize-edit-btn"
                    onClick={() => setEditId(item.id)}
                  >
                    <img
                      className="img-edit-categorize"
                      src="../image/Edit.png"
                      alt="edit"
                    />
                  </button>
                  <button
                    className="categorize-delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <img
                      className="img-remove-categorize"
                      src="../image/delete.png"
                      alt="delete"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="categorize-pagination-wrapper">
        <div className="categorize-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedCategories.length)} จาก {sortedCategories.length} แถว
        </div>
        <div className="categorize-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="categorize-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            placeholder={`${currentPage} / ${totalPages}`}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = parseInt(inputPage.trim(), 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
                e.target.blur();
              }
            }}
          />
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default Categorize_table;
