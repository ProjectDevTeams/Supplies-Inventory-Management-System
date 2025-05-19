// File: src/components/Incoming/Incoming-add.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Incoming-add.css";

export default function IncomingAdd() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [materialSuggestions, setMaterialSuggestions] = useState([]);

  const [form, setForm] = useState({
    created_by: 3,
    stock_type: "",
    company_id: "",
    company_name: "",
    tax_invoice_number: "",
    purchase_order_number: "",
    created_at: "",
    items: [
      { material_id: "", material_name: "", quantity: "", price_per_unit: "" }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ error: "", success: "" });

  useEffect(() => {
    (async () => {
      try {
        const [mRes, cRes] = await Promise.all([
          axios.get(`${API_URL}/materials/get_materials.php`),
          axios.get(`${API_URL}/companies/get_companies.php`)
        ]);
        setMaterials(mRes.data.data || []);
        setCompanies(cRes.data.data || []);
      } catch {}
    })();
  }, []);

  const setIn = (path, val) =>
    setForm(f => {
      const o = { ...f },
        keys = path.split("."),
        last = keys.pop();
      let cur = o;
      keys.forEach(k => (cur = cur[k]));
      cur[last] = val;
      return o;
    });

  const addItem = () =>
    setForm(f => ({
      ...f,
      items: [
        ...f.items,
        { material_id: "", material_name: "", quantity: "", price_per_unit: "" }
      ]
    }));

  const removeItem = i =>
    setForm(f =>
      f.items.length > 1
        ? { ...f, items: f.items.filter((_, idx) => idx !== i) }
        : f
    );

  const submit = async () => {
    setMsg({ error: "", success: "" });
    setLoading(true);
    try {
      const items = form.items.map(
        ({ material_name, quantity, price_per_unit }) => ({
          material_name,
          quantity: +quantity,
          price_per_unit: +price_per_unit,
          total_price: +quantity * +price_per_unit
        })
      );
      const payload = { ...form, company_id: +form.company_id || null, items };
      const { data } = await axios.post(
        `${API_URL}/receive/add_receive.php`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (data.status === "success") {
        navigate("/incoming/");
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (e) {
      setMsg({ error: e.message || "เกิดข้อผิดพลาด", success: "" });
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = (list, value) => {
    const input = value.trim().toLowerCase();
    return list.filter(x => x.name.toLowerCase().includes(input));
  };
  const renderSuggestion = sug => <span>{sug.name}</span>;

  return (
    <div className="incoming-add-container">
      <h2 className="incoming-add-title">เพิ่มรับเข้าวัสดุ</h2>
      {msg.error && <div className="error-message">{msg.error}</div>}

      {/* คลังวัสดุ */}
      <div className="incoming-add-row">
        <label>คลังวัสดุ</label>
        <select
          className="incoming-add-input"
          value={form.stock_type}
          onChange={e => setIn("stock_type", e.target.value)}
          disabled={loading}
        >
          <option value="">เลือกคลังวัสดุ</option>
          <option value="วัสดุในคลัง">วัสดุในคลัง</option>
          <option value="วัสดุนอกคลัง">วัสดุนอกคลัง</option>
        </select>
      </div>

      {/* ชื่อบริษัท */}
      <div className="incoming-add-row">
        <label>ชื่อบริษัท</label>
        <Autosuggest
          suggestions={companySuggestions}
          onSuggestionsFetchRequested={({ value }) =>
            setCompanySuggestions(getSuggestions(companies, value))
          }
          onSuggestionsClearRequested={() =>
            setCompanySuggestions([])
          }
          getSuggestionValue={s => s.name}
          renderSuggestion={renderSuggestion}
          inputProps={{
            className: "incoming-add-input",
            placeholder: "พิมพ์เพื่อค้นหา...",
            value: form.company_name,
            disabled: loading,
            onChange: (_, { newValue }) => {
              setIn("company_name", newValue);
              const c = companies.find(x => x.name === newValue);
              setIn("company_id", c ? c.id : "");
            }
          }}
        />
      </div>

      {/* เลขที่กำกับภาษี & PO */}
      {["tax_invoice_number", "purchase_order_number"].map((f, i) => (
        <div className="incoming-add-row" key={f}>
          <label>
            {i === 0 ? "เลขที่กำกับภาษี" : "เลขที่ใบสั่งซื้อ (PO)"}
          </label>
          <input
            type="text"
            className="incoming-add-input"
            value={form[f]}
            onChange={e => setIn(f, e.target.value)}
            placeholder={i === 0 ? "INV-XXX" : "PO-XXX"}
            disabled={loading}
          />
        </div>
      ))}

      {/* วันที่รับเข้า */}
      <div className="incoming-add-row">
        <label>วันที่รับเข้า</label>
        <input
          type="date"
          className="incoming-add-input"
          value={form.created_at}
          onChange={e => setIn("created_at", e.target.value)}
          disabled={loading}
        />
      </div>

      <hr className="incoming-add-divider" />

      {/* รายการวัสดุ */}
      {form.items.map((it, idx) => (
        <div className="incoming-add-item-row" key={idx}>
          {/* ชื่อวัสดุ */}
          <div className="incoming-add-row">
            <label>ชื่อวัสดุ</label>
            <Autosuggest
              suggestions={materialSuggestions}
              onSuggestionsFetchRequested={({ value }) =>
                setMaterialSuggestions(getSuggestions(materials, value))
              }
              onSuggestionsClearRequested={() =>
                setMaterialSuggestions([])
              }
              getSuggestionValue={s => s.name}
              renderSuggestion={renderSuggestion}
              inputProps={{
                className: "incoming-add-input",
                placeholder: "พิมพ์เพื่อค้นหา...",
                value: it.material_name,
                disabled: loading,
                onChange: (_, { newValue }) => {
                  setIn(`items.${idx}.material_name`, newValue);
                  const m = materials.find(x => x.name === newValue);
                  setIn(`items.${idx}.material_id`, m ? m.id : "");
                }
              }}
            />
          </div>

          {/* จำนวน และ ราคาต่อหน่วย */}
          {["quantity", "price_per_unit"].map((field, j) => (
            <div className="incoming-add-row" key={field}>
              <label>{j === 0 ? "จำนวน" : "ราคาต่อหน่วย"}</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="incoming-add-input"
                value={it[field]}
                onChange={e =>
                  setIn(`items.${idx}.${field}`, e.target.value.replace(/\D/, ""))
                }
                placeholder="0"
                disabled={loading}
              />
            </div>
          ))}

          {/* ปุ่มลบรายการ */}
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
