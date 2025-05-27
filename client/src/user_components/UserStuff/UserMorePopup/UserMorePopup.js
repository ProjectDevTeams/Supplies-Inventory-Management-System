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
  const [materialsData, setMaterialsData] = useState([]);
  const [rows, setRows] = useState([
    { id: Date.now(), item: null, quantity: 1, file: null }
  ]);
  const [inputText, setInputText] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`${API_URL}/materials/get_materials.php`);
        if (res.data.status === "success") {
          const filtered = res.data.data.filter(
            (m) => m.location === "วัสดุในคลัง"
          );

          const formatted = filtered.map((m) => ({
            label: m.name,
            value: m.name,
            rawLabel: m.name,
          }));

          setAllOptions(formatted);
          setOptions(formatted);
          setMaterialsData(res.data.data);
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
      { id: Date.now(), item: null, quantity: null, file: null }
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
    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const created_by = user?.id;

      if (!created_by) {
        Swal.fire("ไม่พบข้อมูลผู้ใช้", "กรุณาเข้าสู่ระบบใหม่", "error");
        return;
      }

      // อัปโหลดรูปภาพ
      const uploadFormData = new FormData();
      rows.forEach((row, index) => {
        if (row.file) {
          uploadFormData.append(`file_${index}`, row.file);
        }
      });
      
      const uploadRes = await axios.post(`${API_URL}/purchase_extras_items/upload_image.php`,
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const uploadedImages = uploadRes.data?.uploaded || {};

      // สร้างรายการวัสดุ
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

      const payload = {
        created_by,
        reason: note,
        items,
      };

      const res = await axios.post(
        `${API_URL}/purchase_extras/add_purchase_extras.php`,
        payload
      );

      if (res.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          text: "รายการถูกบันทึกเรียบร้อยแล้ว!",
          confirmButtonColor: "#28a745",
        });
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "ผิดพลาด",
          text: res.data.message || "บันทึกไม่สำเร็จ",
          confirmButtonColor: "#dc3545",
        });
      }
    } catch (error) {
      console.error("❌ บันทกล้มเหลว:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="usermorepopup-container">
      <div className="usermorepopup-header">
        <h2>รายการขอจัดซื้อเพิ่มเติม</h2>
        <button className="usermorepopup-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="usermorepopup-info-block">
        <div className="usermorepopup-info-group">
          <label>หมายเหตุ</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ใส่หมายเหตุ..."
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
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              filterOption={null}
              formatCreateLabel={(inputValue) => `เพิ่ม "${inputValue}"`}
              isValidNewOption={(inputValue, _, selectOptions) => {
                if (!inputValue) return false;
                return !selectOptions.some(
                  (opt) =>
                    opt.value.toLowerCase() === inputValue.toLowerCase()
                );
              }}
              getOptionLabel={(e) =>
                e.__isNew__ ? e.label : e.rawLabel
              }
              onInputChange={(input) => {
                setInputText(input);
                if (input.trim() === "") {
                  setOptions(allOptions);
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
              value={row.quantity ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                const num = parseInt(val, 10);
                updateRow(
                  row.id,
                  "quantity",
                  isNaN(num) || num < 1 ? null : num
                );
              }}
              placeholder="จำนวน"
              className="usermorepopup-input usermorepopup-quantity-input"
            />
          </div>

          <div className="usermorepopup-row-line2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                updateRow(row.id, "file", e.target.files?.[0] || null)
              }
              className="usermorepopup-file-input"
            />
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

      <div className="usermorepopup-bottom-controls">
        <button className="usermorepopup-add-btn" onClick={addRow}>
          ＋ เพิ่มรายการ
        </button>
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
