import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../config";
import "./UserMorePopup.css";
import Swal from "sweetalert2";

function UserMorePopup({ onClose }) {
  const [options, setOptions] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [rows, setRows] = useState([
    { id: Date.now(), item: null, quantity: 1, note: "" },
  ]);

  const [, setInputText] = useState(""); 

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`${API_URL}/materials/get_materials.php`);
        if (res.data.status === "success") {
          const all = res.data.data.map((m) => ({
            label: `${m.name} (จำนวนคงเหลือ: ${m.remain})`,
            value: m.name,
            remain: m.remain,
            rawLabel: m.name,
          }));

          setAllOptions(all);
          setOptions(all.filter((m) => parseInt(m.remain) === 0)); // เริ่มต้น = เหลือ 0 เท่านั้น
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (isSubmitting) return; // 👈 ถ้ากำลังส่งข้อมูลอยู่ ไม่ต้องทำอะไร

    setIsSubmitting(true); // ✅ ปิดการกดปุ่มชั่วคราว

    try {
      // สมมุติว่าเราส่ง rows ไปยัง backend
      await axios.post(`${API_URL}/your_endpoint.php`, { rows });

      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ",
        text: "รายการถูกบันทึกเรียบร้อยแล้ว!",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      console.error("❌ บันทกล้มเหลว:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setIsSubmitting(false); // ✅ เปิดปุ่มกลับหลังจากเสร็จ
    }
  };

  return (
    <div className="usermorepopup-container">
      <div className="usermorepopup-header">
        <h2>รายการขอจัดซื้อเพิ่มเติม</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button className="usermorepopup-add-btn" onClick={addRow}>
            ＋ เพิ่มแถว
          </button>
          <button className="usermorepopup-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
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
            menuPortalTarget={document.body} // 👈 ให้ dropdown popup ไปอยู่นอก DOM ปกติ
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // 👈 ให้ซ้อนอยู่บนสุด
            }}
            filterOption={null}
            formatCreateLabel={(inputValue) => `เพิ่ม "${inputValue}"`}
            isValidNewOption={(inputValue, _, selectOptions) => {
              if (!inputValue) return false;
              return !selectOptions.some(
                (opt) => opt.value.toLowerCase() === inputValue.toLowerCase()
              );
            }}
            getOptionLabel={(e) =>
              e.__isNew__ ? (
                e.label
              ) : (
                <div className="usermorepopup-option">
                  <span className="usermorepopup-name">{e.rawLabel}</span>
                  <span className="usermorepopup-amount">
                    จำนวนคงเหลือ: {e.remain}
                  </span>
                </div>
              )
            }
            onInputChange={(input) => {
              setInputText(input);
              if (input.trim() === "") {
                setOptions(allOptions.filter((m) => parseInt(m.remain) === 0));
              } else {
                setOptions(
                  allOptions.filter((m) =>
                    (m.rawLabel || "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  )
                );
              }
            }}
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
            title="ลบแถว"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <div className="usermorepopup-footer">
        <button
          className="usermorepopup-save-btn"
          onClick={handleSave}
          disabled={isSubmitting}
          style={{
            opacity: isSubmitting ? 0.6 : 1,
            pointerEvents: isSubmitting ? "none" : "auto",
          }}
        >
          {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
        </button>
      </div>
    </div>
  );
}

export default UserMorePopup;
