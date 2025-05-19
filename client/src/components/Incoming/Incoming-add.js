import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import "./Incoming-add.css";

export default function IncomingAdd() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companySearch, setCompanySearch] = useState("");
  const [form, setForm] = useState({
    created_by: 3,
    stock_type: "",
    company_id: "",
    tax_invoice_number: "",
    purchase_order_number: "",
    created_at: "",
    items: [{ material_id: "", quantity: "", price_per_unit: "" }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        console.error("โหลดข้อมูลล้มเหลว:", e);
      }
    })();
  }, []);

  const updatePath = (path, value) => {
    setForm(prev => {
      const next = { ...prev };
      const keys = path.split(".");
      let cur = next;
      keys.slice(0, -1).forEach(k => (cur = cur[k]));
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const addItem = () => {
    setForm(f => ({
      ...f,
      items: [...f.items, { material_id: "", quantity: "", price_per_unit: "" }]
    }));
  };

  const removeItem = idx => {
    setForm(f =>
      f.items.length > 1
        ? { ...f, items: f.items.filter((_, i) => i !== idx) }
        : f
    );
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const items = form.items.map(({ material_id, quantity, price_per_unit }) => {
        const mat = materials.find(m => m.id === +material_id) || {};
        if (!mat.name) throw new Error(`วัสดุ id=${material_id} ไม่พบ`);
        return {
          material_name: mat.name,
          quantity: +quantity,
          price_per_unit: +price_per_unit,
          total_price: +quantity * +price_per_unit
        };
      });
      const response = await axios.post(
        `${API_URL}/receive_materials.php`,
        { ...form, company_id: +form.company_id || null, items },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.status === "success") {
        navigate(`/receive/${response.data.bill_id}`);
      } else {
        throw new Error(response.data.message || "Unknown error");
      }
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(companySearch.toLowerCase())
  );

  return (
    <div className="incoming-add-container">
      <h2 className="incoming-add-title">เพิ่มรับเข้าวัสดุ</h2>
      {error && <div className="error-message">{error}</div>}

      {/* คลังวัสดุ */}
      <div className="incoming-add-row">
        <label>คลังวัสดุ</label>
        <select
          className="incoming-add-input"
          value={form.stock_type}
          onChange={e => updatePath('stock_type', e.target.value)}
          disabled={loading}
        >
          <option value="">เลือกคลังวัสดุ</option>
          <option value="วัสดุในคลัง">วัสดุในคลัง</option>
          <option value="วัสดุนอกคลัง">วัสดุนอกคลัง</option>
        </select>
      </div>

      {/* ค้นหาบริษัท */}
      <div className="incoming-add-row">
        <label>ค้นหาบริษัท</label>
        <input
          type="text"
          className="incoming-add-input"
          value={companySearch}
          onChange={e => setCompanySearch(e.target.value)}
          placeholder="พิมพ์ชื่อบริษัท..."
          disabled={loading}
        />
      </div>

      {/* เลือกบริษัท */}
      <div className="incoming-add-row">
        <label>ชื่อบริษัท</label>
        <select
          className="incoming-add-input"
          value={form.company_id}
          onChange={e => updatePath('company_id', e.target.value)}
          disabled={loading}
        >
          <option value="">เลือกบริษัท</option>
          {filteredCompanies.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* เลขที่กำกับภาษี */}
      <div className="incoming-add-row">
        <label>เลขที่กำกับภาษี</label>
        <input
          type="text"
          className="incoming-add-input"
          value={form.tax_invoice_number}
          onChange={e => updatePath('tax_invoice_number', e.target.value)}
          placeholder="INV-XXX"
          disabled={loading}
        />
      </div>
      {/* เลขที่ PO */}
      <div className="incoming-add-row">
        <label>เลขที่ใบสั่งซื้อ (PO)</label>
        <input
          type="text"
          className="incoming-add-input"
          value={form.purchase_order_number}
          onChange={e => updatePath('purchase_order_number', e.target.value)}
          placeholder="PO-XXX"
          disabled={loading}
        />
      </div>

      {/* วันที่รับเข้า */}
      <div className="incoming-add-row">
        <label>วันที่รับเข้า</label>
        <input
          type="date"
          className="incoming-add-input"
          value={form.created_at}
          onChange={e => updatePath('created_at', e.target.value)}
          disabled={loading}
        />
      </div>

      <hr className="incoming-add-divider" />

      {/* รายการวัสดุ */}
      {form.items.map((item, idx) => (
        <div key={idx} className="incoming-add-item-row">
          <div className="incoming-add-row">
            <label>ชื่อวัสดุ {idx + 1}</label>
            <select
              className="incoming-add-input"
              value={item.material_id}
              onChange={e => updatePath(`items.${idx}.material_id`, e.target.value)}
              disabled={loading}
            >
              <option value="">เลือกวัสดุ</option>
              {materials.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="incoming-add-row">
            <label>จำนวน {idx + 1}</label>
            <input
              type="number"
              className="incoming-add-input"
              value={item.quantity}
              onChange={e => updatePath(`items.${idx}.quantity`, e.target.value)}
              placeholder="0"
              disabled={loading}
            />
          </div>
          <div className="incoming-add-row">
            <label>ราคาต่อหน่วย {idx + 1}</label>
            <input
              type="number"
              className="incoming-add-input"
              value={item.price_per_unit}
              onChange={e => updatePath(`items.${idx}.price_per_unit`, e.target.value)}
              placeholder="0.00"
              disabled={loading}
            />
          </div>
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
          className="incoming-add-save"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "กำลังบันทึก..." : "บันทึก"}
        </button>
      </div>
    </div>
  );
}
