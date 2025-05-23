import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import {
  ComponentIncompleteAlert,
  ComponentAddSuccessAlert
} from "../SweetAlert/ComponentSweetAlert";
import "./Adjust-add.css";

export default function AdjustAdd({ onSave, onCancel }) {
  const warehouseOptions = [
    { value: "วัสดุในคลัง", label: "วัสดุในคลัง" },
    { value: "วัสดุนอกคลัง", label: "วัสดุนอกคลัง" },
  ];

  const [supplyOptions, setSupplyOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/materials/get_materials.php`)
      .then((res) => {
        if (res.data.status === "success") {
          const options = res.data.data.map((mat) => ({
            value: mat.id,
            label: mat.name,
            quantity: Number(mat.remain),
            location: mat.location
          }));
          setSupplyOptions(options);
        }
      })
      .catch((err) => console.error("โหลดข้อมูลวัสดุล้มเหลว", err));
  }, []);

  const [rows, setRows] = useState([
    { id: Date.now(), warehouse: "", supply: "", current: "", next: "" },
  ]);

  const addRow = () =>
    setRows((r) => [
      ...r,
      { id: Date.now(), warehouse: "", supply: "", current: "", next: "" },
    ]);

  const removeRow = (id) =>
    setRows((r) => (r.length > 1 ? r.filter((x) => x.id !== id) : r));

  const updateRow = (id, field, value) =>
    setRows((r) =>
      r.map((x) =>
        x.id === id
          ? {
              ...x,
              [field]: value,
              ...(field === "warehouse" ? { current: "", supply: "" } : {}),
            }
          : x
      )
    );

  const handleSave = async () => {
    const incomplete = rows.some((x) => !x.warehouse || !x.supply || x.next === "");
    if (incomplete) {
      ComponentIncompleteAlert();
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      if (!userId) {
        ComponentIncompleteAlert();
        return;
      }

      const res1 = await axios.post(`${API_URL}/adjustments/add_adjustment.php`, {
        created_by: userId,
      });
      if (res1.data.status === "success") {
        const adjustment_id = res1.data.adjustment_id;
        const items = rows.map((r) => ({
          stock_type: r.warehouse,
          material_id: Number(r.supply),
          quantity: Number(r.next),
          old_quantity: Number(r.current),
        }));
        const res2 = await axios.post(
          `${API_URL}/adjustment_items/add_adjustment_items.php`,
          { adjustment_id, items }
        );
        if (res2.data.status === "success") {
          ComponentAddSuccessAlert();
          onSave(rows);
        } else {
          ComponentIncompleteAlert();
        }
      } else {
        ComponentIncompleteAlert();
      }
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      ComponentIncompleteAlert();
    }
  };

  return (
    <>
      <div className="adjust-add-bar">
        <div className="adjust-add-title">ปรับยอด</div>
        <div className="adjust-add-controls">
          <button className="adjust-add-add-btn" onClick={addRow}>
            ＋ เพิ่มแถว
          </button>
        </div>
      </div>

      {rows.map((r) => (
        <div key={r.id} className="adjust-add-row">
          <select
            value={r.warehouse}
            onChange={(e) => updateRow(r.id, "warehouse", e.target.value)}
          >
            <option value="">– เลือกคลัง –</option>
            {warehouseOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <select
            value={r.supply}
            onChange={(e) => {
              const selected = supplyOptions.find(
                (opt) => opt.value === Number(e.target.value)
              );
              updateRow(r.id, "supply", selected ? selected.value : "");
              updateRow(r.id, "current", selected ? selected.quantity : "");
            }}
          >
            <option value="">– เลือกวัสดุ –</option>
            {supplyOptions
              .filter((opt) => opt.location === r.warehouse)
              .map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
          </select>

          <input
            type="number"
            placeholder="ปัจจุบัน"
            value={r.current}
            readOnly
            style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
          />

          <input
            type="number"
            placeholder="เปลี่ยนเป็น"
            value={r.next}
            onChange={(e) => updateRow(r.id, "next", e.target.value)}
          />

          <button
            className="adjust-add-remove-btn"
            onClick={() => removeRow(r.id)}
          >
            −
          </button>
        </div>
      ))}

      <div className="adjust-add-footer">
        <button className="adjust-add-save-btn" onClick={handleSave}>
          บันทึก
        </button>
        <button className="adjust-add-cancel-btn" onClick={onCancel}>
          ยกเลิก
        </button>
      </div>
    </>
  );
}
