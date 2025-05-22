import React, { useState, useEffect } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Incoming-add.css";

export default function IncomingAdd() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || null;

  const [materials, setMaterials] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [materialSuggestions, setMaterialSuggestions] = useState([]);

  const [form, setForm] = useState({
    created_by: userId,
    stock_type: "",
    company_id: "",
    company_name: "",
    project_name: "",
    tax_invoice_number: "",
    purchase_order_number: "",
    created_at: "",
    items: [{ material_id: "", material_name: "", quantity: "", price_per_unit: "" }]
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
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const setIn = (path, val) =>
    setForm(f => {
      const o = { ...f };
      const keys = path.split(".");
      const last = keys.pop();
      let cur = o;
      keys.forEach(k => (cur = cur[k]));
      cur[last] = val;
      return o;
    });

  const addItem = () =>
    setForm(f => ({ ...f, items: [...f.items, { material_id: "", material_name: "", quantity: "", price_per_unit: "" }] }));

  const removeItem = i =>
    setForm(f =>
      f.items.length > 1 ? { ...f, items: f.items.filter((_, idx) => idx !== i) } : f
    );

  const getSuggestions = (list, value) => {
    const input = value.trim().toLowerCase();
    return list.filter(x => x.name.toLowerCase().includes(input));
  };

  const getCompanySuggestions = value =>
    form.stock_type === "วัสดุในคลัง" ? getSuggestions(companies, value) : [];

  const getMaterialSuggestions = value => {
    if (!form.stock_type) return [];
    const filtered = materials.filter(m => m.location === form.stock_type);
    return getSuggestions(filtered, value);
  };

  const renderSuggestion = sug => <span>{sug.name}</span>;

  const submit = async () => {
    setMsg({ error: "", success: "" });
    setLoading(true);
    try {
      const items = form.items.map(({ material_id, quantity, price_per_unit }) => ({
        material_id: +material_id,
        quantity: +quantity,
        price_per_unit: +price_per_unit,
        total_price: +quantity * +price_per_unit
      }));

      const payload = {
        created_by: userId,
        stock_type: form.stock_type,
        company_id: form.company_id === "" ? "" : +form.company_id,
        project_name: form.project_name === "" ? null : form.project_name,
        tax_invoice_number: form.tax_invoice_number,
        purchase_order_number: form.purchase_order_number,
        created_at: form.created_at,
        items
      };

      const { data } = await axios.post(
        `${API_URL}/receive_materials/add_receive.php`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (data.status === "success") navigate("/incoming/");
      else throw new Error(data.message || "Unknown error");
    } catch (e) {
      setMsg({ error: e.message || "เกิดข้อผิดพลาด", success: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="incoming-add-container">
      <div className="incoming-add-title">เพิ่มรับเข้าวัสดุ</div>
      {msg.error && <div className="error-message">{msg.error}</div>}

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

      {form.stock_type === "วัสดุในคลัง" ? (
        <div className="incoming-add-row">
          <label>ชื่อบริษัท</label>
          <Autosuggest
            suggestions={companySuggestions}
            onSuggestionsFetchRequested={({ value }) => setCompanySuggestions(getCompanySuggestions(value))}
            onSuggestionsClearRequested={() => setCompanySuggestions([])}
            getSuggestionValue={s => s.name}
            renderSuggestion={renderSuggestion}
            inputProps={{
              className: "incoming-add-input",
              placeholder: "พิมพ์เพื่อค้นหาบริษัท...",
              value: form.company_name,
              disabled: loading,
              onFocus: () => setCompanySuggestions(companies),
              onChange: (_, { newValue }) => {
                setIn("company_name", newValue);
                const c = companies.find(x => x.name === newValue);
                setIn("company_id", c ? `${c.id}` : "");
              }
            }}
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
            onChange={e => setIn("project_name", e.target.value)}
          />
        </div>
      ) : null}

      {['tax_invoice_number', 'purchase_order_number'].map((field, idx) => (
        <div className="incoming-add-row" key={field}>
          <label>{idx === 0 ? 'เลขที่กำกับภาษี' : 'เลขที่ มอ. จัดซื้อ'}</label>
          <input
            type="text"
            className="incoming-add-input"
            value={form[field]}
            onChange={e => setIn(field, e.target.value)}
            placeholder={idx === 0 ? 'INV-XXX' : 'PO-XXX'}
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
          onChange={e => setIn("created_at", e.target.value)}
          disabled={loading}
        />
      </div>

      <hr className="incoming-add-divider" />

      {form.items.map((it, idx) => (
        <div className="incoming-add-item-row" key={idx}>
          <div className="incoming-add-row">
            <label>ชื่อวัสดุ</label>
            <Autosuggest
              suggestions={materialSuggestions}
              onSuggestionsFetchRequested={({ value }) => setMaterialSuggestions(getMaterialSuggestions(value))}
              onSuggestionsClearRequested={() => setMaterialSuggestions([])}
              getSuggestionValue={s => s.name}
              renderSuggestion={renderSuggestion}
              inputProps={{
                className: "incoming-add-input",
                placeholder: "พิมพ์เพื่อค้นหา...",
                value: it.material_name,
                disabled: loading,
                onFocus: () => setMaterialSuggestions(materials.filter(m => m.location === form.stock_type)),
                onChange: (_, { newValue }) => {
                  setIn(`items.${idx}.material_name`, newValue);
                  const m = materials.find(x => x.name === newValue && x.location === form.stock_type);
                  setIn(`items.${idx}.material_id`, m ? `${m.id}` : "");
                }
              }}
            />
          </div>

          {['quantity','price_per_unit'].map((field,j)=>(
            <div className="incoming-add-row" key={field}>
              <label>{j===0?'จำนวน':'ราคาต่อหน่วย'}</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="incoming-add-input"
                value={it[field]}
                onChange={e=>setIn(`items.${idx}.${field}`,e.target.value.replace(/\D/,""))}
                placeholder="0"
                disabled={loading}
              />
            </div>
          ))}

          <button className="incoming-add-remove-row" onClick={()=>removeItem(idx)} disabled={loading}>
            ลบรายการ
          </button>
        </div>
      ))}

      <button className="incoming-add-add-row" onClick={addItem} disabled={loading}>
        + เพิ่มรายการ
      </button>

      <div className="incoming-add-actions">
        <button type="button" className="incoming-add-cancel" onClick={()=>navigate("/incoming")} disabled={loading}>
          ยกเลิก
        </button>
        <button type="button" className="incoming-add-save" onClick={submit} disabled={loading}>
          {loading?"กำลังบันทึก...":"บันทึก"}
        </button>
      </div>
    </div>
  );
}