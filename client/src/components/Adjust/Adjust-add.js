import  { useState } from "react";
import "./Adjust-add.css";

export default function AdjustAdd({ onSave, onCancel }) {
  const warehouseOptions = [
    { value: "วัสดุในคลัง", label: "วัสดุในคลัง" },
    { value: "วัสดุนอกคลัง", label: "วัสดุนอกคลัง" },
  ];
  const supplyOptions = [
    { value: "3m_scotch", label: "3M Scotch เทปกาวสองหน้า..." },
    { value: "elfen", label: "Elfen ลิ้นแฟ้มโลหะสีทอง" },
  ];

  const [rows, setRows] = useState([
    { id: Date.now(), warehouse: "", supply: "", current: "", next: "" },
  ]);

  const addRow = () =>
    setRows(r => [
      ...r,
      { id: Date.now(), warehouse: "", supply: "", current: "", next: "" },
    ]);
  const removeRow = id =>
    setRows(r => (r.length > 1 ? r.filter(x => x.id !== id) : r));
  const updateRow = (id, field, value) =>
    setRows(r =>
      r.map(x =>
        x.id === id
          ? {
              ...x,
              [field]: value,
              ...(field === "warehouse" ? { current: "" } : {}),
            }
          : x
      )
    );

  const handleSave = () => {
    for (let x of rows) {
      if (!x.warehouse || !x.supply || x.next === "") {
        alert("กรุณากรอกข้อมูลให้ครบทุกแถว");
        return;
      }
    }
    onSave(rows);
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

      {rows.map(r => (
        <div key={r.id} className="adjust-add-row">
          <select
            value={r.warehouse}
            onChange={e => updateRow(r.id, "warehouse", e.target.value)}
          >
            <option value="">– เลือกคลัง –</option>
            {warehouseOptions.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={r.supply}
            onChange={e => updateRow(r.id, "supply", e.target.value)}
          >
            <option value="">– เลือกวัสดุ –</option>
            {supplyOptions.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="ปัจจุบัน"
            value={r.current}
            onChange={e => updateRow(r.id, "current", e.target.value)}
          />
          <input
            type="number"
            placeholder="เปลี่ยนเป็น"
            value={r.next}
            onChange={e => updateRow(r.id, "next", e.target.value)}
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
