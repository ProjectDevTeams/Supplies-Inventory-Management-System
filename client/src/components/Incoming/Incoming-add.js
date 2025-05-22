import React from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useIncomingAdd } from "./useIncomingAdd";
import "./Incoming-add.css";

export default function IncomingAdd() {
  const navigate = useNavigate();
  const {
    form,
    setIn,
    addItem,
    removeItem,
    getMaterialOptions,
    companyOptions,
    stockOptions,
    submit,
    loading,
    msg,
  } = useIncomingAdd(navigate);

  return (
    <div className="incoming-add-container">
      <div className="incoming-add-title">เพิ่มรับเข้าวัสดุ</div>
      {msg.error && <div className="error-message">{msg.error}</div>}

      <div className="incoming-add-row">
        <label>คลังวัสดุ</label>
        <Select
          classNamePrefix="incoming-select"
          options={stockOptions}
          placeholder="เลือกคลังวัสดุ..."
          isClearable
          onChange={(opt) => setIn("stock_type", opt?.value || "")}
          value={
            form.stock_type
              ? { value: form.stock_type, label: form.stock_type }
              : null
          }
          isDisabled={loading}
        />
      </div>

      {form.stock_type === "วัสดุในคลัง" ? (
        <div className="incoming-add-row">
          <label>ชื่อบริษัท</label>
          <Select
            classNamePrefix="incoming-select"
            options={companyOptions}
            isClearable
            placeholder="เลือกบริษัท..."
            onChange={(opt) => {
              setIn("company_id", opt?.value.toString() || "");
              setIn("company_name", opt?.label || "");
            }}
            value={
              form.company_id
                ? { value: +form.company_id, label: form.company_name }
                : null
            }
            isDisabled={loading}
          />
        </div>
      ) : form.stock_type === "วัสดุนอกคลัง" ? (
        <div className="incoming-add-row">
          <label>ชื่อโครงการ</label>
          <input
            type="text"
            className="incoming-add-input"
            placeholder="พิมพ์ชื่อโครงการ..."
            value={form.project_name}
            disabled={loading}
            onChange={(e) => setIn("project_name", e.target.value)}
          />
        </div>
      ) : null}

      {["tax_invoice_number", "purchase_order_number"].map((field, idx) => (
        <div className="incoming-add-row" key={field}>
          <label>{idx === 0 ? "เลขที่กำกับภาษี" : "เลขที่ มอ. จัดซื้อ"}</label>
          <input
            type="text"
            className="incoming-add-input"
            value={form[field]}
            onChange={(e) => setIn(field, e.target.value)}
            placeholder={idx === 0 ? "INV-XXX" : "PO-XXX"}
            disabled={loading}
          />
        </div>
      ))}

      <div className="incoming-add-row">
        <label>วันที่รับเข้า</label>
        <input
          type="date"
          className="incoming-add-input"
          value={form.created_at}
          onChange={(e) => setIn("created_at", e.target.value)}
          disabled={loading}
        />
      </div>

      <hr className="incoming-add-divider" />

      {form.items.map((it, idx) => (
        <div className="incoming-add-item-row" key={idx}>
          <div className="incoming-add-row">
            <label>ชื่อวัสดุ</label>
            <Select
              classNamePrefix="incoming-select"
              options={getMaterialOptions()}
              isClearable
              placeholder="เลือกวัสดุ..."
              onChange={(opt) => {
                setIn(`items.${idx}.material_id`, opt?.value.toString() || "");
                setIn(`items.${idx}.material_name`, opt?.label || "");
              }}
              value={
                it.material_id
                  ? { value: +it.material_id, label: it.material_name }
                  : null
              }
              isDisabled={!form.stock_type || loading}
            />
          </div>

          {["quantity", "price_per_unit"].map((field, j) => (
            <div className="incoming-add-row" key={field}>
              <label>{j === 0 ? "จำนวน" : "ราคาต่อหน่วย"}</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="incoming-add-input"
                value={it[field]}
                onChange={(e) =>
                  setIn(
                    `items.${idx}.${field}`,
                    e.target.value.replace(/\D/, "")
                  )
                }
                placeholder="0"
                disabled={loading}
              />
            </div>
          ))}

          <button
            className="incoming-add-remove-row"
            onClick={() => removeItem(idx)}
            disabled={loading}
          >
            ลบรายการ
          </button>
        </div>
      ))}

      <button
        className="incoming-add-add-row"
        onClick={addItem}
        disabled={loading}
      >
        + เพิ่มรายการ
      </button>

      <div className="incoming-add-actions">
        <button
          type="button"
          className="incoming-add-cancel"
          onClick={() => navigate("/incoming")}
          disabled={loading}
        >
          ยกเลิก
        </button>
        <button
          type="button"
          className="incoming-add-save"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "กำลังบันทึก..." : "บันทึก"}
        </button>
      </div>
    </div>
  );
}
