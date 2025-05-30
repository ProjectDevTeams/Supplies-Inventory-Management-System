import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../config";
import "./UserMorePopup.css";
import Swal from "sweetalert2";

function UserMorePopup({ onClose }) {
  const [options, setOptions] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [materialsData, setMaterialsData] = useState([]);
  const [rows, setRows] = useState([
    { id: Date.now(), item: null, quantity: 1, file: null, note: "" },
  ]);
  const [, setInputText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`${API_URL}/materials/get_materials.php`);
        if (res.data.status === "success") {
          // ✅ กรองเฉพาะวัสดุในคลัง
          const filtered = res.data.data.filter(
            (m) => m.location === "วัสดุในคลัง"
          );

          const all = filtered.map((m) => ({
            label: `${m.name} (จำนวนคงเหลือ: ${m.remain})`,
            value: m.name,
            remain: m.remain,
            rawLabel: m.name,
          }));

          setAllOptions(all);
          setOptions(all.filter((m) => parseInt(m.remain) === 0));
          setMaterialsData(filtered);
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
      { id: Date.now(), item: null, quantity: 1, file: null, note: "" },
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

  const handleSave = async () => {
    if (isSubmitting) return;

    // 🔍 ตรวจสอบว่าแต่ละ row ต้องมี item (วัสดุ) และไฟล์แนบ
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const materialName = row.item?.value || row.item?.label;

      if (!materialName || !row.file) {
        Swal.fire({
          icon: "warning",
          title: "กรอกข้อมูลไม่ครบ",
          text: "กรุณาเลือกหรือเพิ่มชื่อวัสดุ และแนบรูปภาพก่อนบันทึกรายการ",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const created_by = user?.id;
      if (!created_by) {
        Swal.fire("ไม่พบข้อมูลผู้ใช้", "กรุณาเข้าสู่ระบบใหม่", "error");
        return;
      }

      const uploadFormData = new FormData();
      rows.forEach((row, index) => {
        if (row.file) {
          uploadFormData.append(`file_${index}`, row.file);
        }
      });

      const uploadRes = await axios.post(
        `${API_URL}/purchase_extras_items/upload_image.php`,
        uploadFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const uploadedImages = uploadRes.data?.uploaded || {};

      const items = rows.map((r, index) => {
        const name = r.item?.value ?? r.item?.label ?? "";
        const matched = materialsData.find((m) => m.name === name);
        return {
          quantity: r.quantity,
          material_id: matched ? matched.id : null,
          new_material_name: matched ? null : name,
          image: matched?.image || uploadedImages[`file_${index}`] || "",
        };
      });

      const res = await axios.post(
        `${API_URL}/purchase_extras/add_purchase_extras.php`,
        {
          created_by,
          reason: rows[0]?.note || "",
          items,
        }
      );

      if (res.data.status === "success") {
        Swal.fire("บันทึกสำเร็จ", "รายการถูกบันทึกเรียบร้อยแล้ว!", "success");
        onClose();
      } else {
        Swal.fire("ผิดพลาด", res.data.message || "บันทึกไม่สำเร็จ", "error");
      }
    } catch (error) {
      console.error("❌ บันทกล้มเหลว:", error);
      Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลได้", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="usermorepopup-container">
      <div className="usermorepopup-header">
        <h2>รายการขอจัดซื้อเพิ่มเติม</h2>
        <button className="usermorepopup-close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="usermorepopup-info-block">
        <div className="usermorepopup-info-group">
          <label>หมายเหตุ</label>
          <input
            type="text"
            placeholder="ใส่หมายเหตุ..."
            value={rows[0]?.note || ""}
            onChange={(e) => updateRow(rows[0].id, "note", e.target.value)}
            className="usermorepopup-info-input"
          />
        </div>
      </div>

      <hr className="usermorepopup-divider" />

      {rows.map((row) => (
        <div key={row.id} className="usermorepopup-row">
          <div className="usermorepopup-row-line1">
            <CreatableSelect
              options={options}
              value={row.item}
              onChange={(val) => updateRow(row.id, "item", val)}
              isClearable
              placeholder="เลือก/เพิ่มชื่อวัสดุ..."
              className="usermorepopup-select"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              filterOption={null}
              formatCreateLabel={(inputValue) => `เพิ่ม "${inputValue}"`}
              isValidNewOption={(inputValue, _, selectOptions) =>
                inputValue &&
                !selectOptions.some(
                  (opt) => opt.value.toLowerCase() === inputValue.toLowerCase()
                )
              }
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
                setOptions(
                  input.trim() === ""
                    ? allOptions.filter((m) => parseInt(m.remain) === 0)
                    : allOptions.filter((m) =>
                        (m.rawLabel || "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      )
                );
              }}
            />

            <input
              type="number"
              min="1"
              value={row.quantity ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                const num = parseInt(val, 10);
                updateRow(row.id, "quantity", isNaN(num) || num < 1 ? null : num);
              }}
              placeholder="1"
              className="usermorepopup-input usermorepopup-quantity-input"
            />
          </div>

          <div className="usermorepopup-file-container">
            <div className="usermorepopup-file-input">
              <label className="usermorepopup-file-label">
                เลือกไฟล์
                <input
                  type="file"
                  onChange={(e) => updateRow(row.id, "file", e.target.files[0] || null)}
                />
              </label>
            </div>

            <span className="usermorepopup-file-name">
              {row.file?.name || "ไม่มีไฟล์ที่เลือก"}
            </span>

            <button
              className="usermorepopup-remove-btn"
              onClick={() => removeRow(row.id)}
              title="ลบแถว"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      <div className="usermorepopup-add-btn" onClick={addRow}>
        ＋ เพิ่มรายการ
      </div>

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
          {isSubmitting ? "กำลังบันทึก..." : "บันทึกรายการ"}
        </button>
      </div>
    </div>
  );
}

export default UserMorePopup;
