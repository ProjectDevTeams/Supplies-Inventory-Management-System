import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { API_URL } from "../../../config";
import "./UserMorePopup.css";

function UserMorePopup() {
  const [options, setOptions] = useState([]);
  const [rows, setRows] = useState([
    { id: Date.now(), item: null, quantity: 1, note: "" },
  ]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`${API_URL}/materials/get_materials.php`);
        if (res.data.status === "success") {
          const filtered = res.data.data
            .filter((m) => parseInt(m.remain) === 0)
            .map((m) => ({
              label: m.name,
              value: m.name,
            }));
          setOptions(filtered);
        }
      } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
      }
    };

    fetchMaterials();
  }, []);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: Date.now(), item: null, quantity: 1, note: "" },
    ]);
  };

  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const updateRow = (id, field, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleSave = () => {
    console.log("✅ ส่งข้อมูล:", rows);
    alert("บันทึกสำเร็จ (mock)");
  };

  return (
    <div className="usermorepopup-container">
      <div className="usermorepopup-header">
        <h2>รายการขอจัดซื้อเพิ่มเติม</h2>
        <button className="usermorepopup-add-btn" onClick={addRow}>
          ＋ เพิ่มแถว
        </button>
      </div>

      {rows.map((row) => (
        <div key={row.id} className="usermorepopup-row">
          <CreatableSelect
            options={options}
            value={row.item}
            onChange={(val) => updateRow(row.id, "item", val)}
            isClearable
            placeholder="เลือก/เพิ่มชื่อวัสดุ..."
            className="usermorepopup-select"
          />

          <input
            type="number"
            min="1"
            value={row.quantity}
            onChange={(e) =>
              updateRow(row.id, "quantity", Math.max(1, +e.target.value || 1))
            }
            placeholder="จำนวน"
            className="usermorepopup-input"
          />

          <input
            type="text"
            value={row.note}
            onChange={(e) => updateRow(row.id, "note", e.target.value)}
            placeholder="หมายเหตุ"
            className="usermorepopup-input"
          />

          <button
            className="usermorepopup-remove-btn"
            onClick={() => removeRow(row.id)}
          >
            −
          </button>
        </div>
      ))}

      <div className="usermorepopup-footer">
        <button className="usermorepopup-save-btn" onClick={handleSave}>
          บันทึก
        </button>
      </div>
    </div>
  );
}

export default UserMorePopup;
