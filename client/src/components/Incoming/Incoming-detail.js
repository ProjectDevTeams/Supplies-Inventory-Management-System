// File: src/components/Incoming/Incoming-detail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import "./Incoming-detail.css";

export default function IncomingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Header & items state
  const [header, setHeader] = useState({
    id: null,
    created_by: null,
    warehouse: "",
    company: "",
    taxNumber: "",
    orderNumber: "",
    date: "",
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lookup data
  const [materials, setMaterials] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Fetch bill header + items
  useEffect(() => {
    axios
      .get(`${API_URL}/receive_materials/update_receive.php?id=${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          const { bill, items } = res.data.data;
          setHeader({
            id: bill.id,
            created_by: bill.created_by,
            warehouse: bill.stock_type,
            company: bill.company_id,
            taxNumber: bill.tax_invoice_number,
            orderNumber: bill.purchase_order_number,
            date: bill.created_at,
          });
          setItems(
            items.map((it) => ({
              material_name: it.material_name,
              quantity: it.quantity,
              price_per_unit: it.price_per_unit,
            }))
          );
        } else {
          alert("ไม่พบข้อมูลบิล");
          navigate(-1);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        navigate(-1);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // Fetch materials + companies for selects
  useEffect(() => {
    async function fetchLookups() {
      try {
        const [mRes, cRes] = await Promise.all([
          axios.get(`${API_URL}/materials/get_materials.php`),
          axios.get(`${API_URL}/companies/get_companies.php`),
        ]);
        setMaterials(mRes.data.data || []);
        setCompanies(cRes.data.data || []);
      } catch (err) {
        console.error("Lookup fetch error:", err);
      }
    }
    fetchLookups();
  }, []);

  // Handlers for header fields
  const handleHeaderChange = (field) => (e) => {
    setHeader((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handlers for items
  const handleItemChange = (idx, field) => (e) => {
    const raw = e.target.value;
    const val =
      field === "quantity" || field === "price_per_unit"
        ? Number(raw)
        : raw;
    setItems((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: val } : row))
    );
  };

  // Compute totals
  const lineTotal = (it) => (it.quantity * it.price_per_unit).toFixed(2);
  const grandTotal = () =>
    items
      .reduce((sum, it) => sum + it.quantity * it.price_per_unit, 0)
      .toFixed(2);

  // Submit updated bill
  const handleSave = () => {
    const payload = {
      id: header.id,
      created_by: header.created_by,
      stock_type: header.warehouse,
      company_id: header.company,
      tax_invoice_number: header.taxNumber,
      purchase_order_number: header.orderNumber,
      created_at: header.date,
      items: items.map((it) => ({
        material_name: it.material_name,
        quantity: it.quantity,
        price_per_unit: it.price_per_unit,
        total_price: parseFloat(lineTotal(it)),
      })),
    };

    axios
      .put(`${API_URL}/receive_materials/update_receive.php`, payload)
      .then((res) => {
        if (res.data.status === "success") {
          alert("บันทึกข้อมูลเรียบร้อยแล้ว");
          navigate(-1);
        } else {
          alert("บันทึกไม่สำเร็จ: " + res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("เกิดข้อผิดพลาดขณะบันทึก");
      });
  };

  if (loading) {
    return <div className="incoming-detail-container">กำลังโหลด...</div>;
  }

  return (
    <div className="incoming-detail-container">
      <h2 className="incoming-detail-title">รับเข้าวัสดุ บิล #{header.id}</h2>

      {/* Header Section */}
      <div className="incoming-detail-row">
        <label>คลังวัสดุ</label>
        <select
          className="incoming-detail-select"
          value={header.warehouse}
          onChange={handleHeaderChange("warehouse")}
        >
          <option value="">-- เลือกคลังวัสดุ --</option>
          <option value="วัสดุในคลัง">วัสดุในคลัง</option>
          <option value="วัสดุนอกคลัง">วัสดุนอกคลัง</option>
        </select>
      </div>

      <div className="incoming-detail-row">
        <label>บริษัท/ร้านค้า</label>
        <select
          className="incoming-detail-select"
          value={header.company}
          onChange={handleHeaderChange("company")}
        >
          <option value="">-- เลือกบริษัท --</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="incoming-detail-row">
        <label>เลขที่กำกับภาษี</label>
        <input
          type="text"
          className="incoming-detail-input"
          value={header.taxNumber}
          readOnly
        />
      </div>

      <div className="incoming-detail-row">
        <label>เลขที่ใบสั่งซื้อ (PO)</label>
        <input
          type="text"
          className="incoming-detail-input"
          value={header.orderNumber}
          onChange={handleHeaderChange("orderNumber")}
        />
      </div>

      <div className="incoming-detail-row">
        <label>วันที่</label>
        <input
          type="date"
          className="incoming-detail-input"
          value={header.date}
          onChange={handleHeaderChange("date")}
        />
      </div>

      <hr className="incoming-detail-divider" />

      {/* Items Table */}
      <h3 className="incoming-detail-subtitle">รายการวัสดุ</h3>
      <table className="incoming-detail-items-table">
        <thead>
          <tr>
            <th>วัสดุสิ้นเปลือง</th>
            <th>จำนวน</th>
            <th>ราคา/หน่วย</th>
            <th>ราคารวม</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={idx}>
              <td>
                <select
                  className="incoming-detail-select"
                  value={it.material_name}
                  onChange={(e) =>
                    handleItemChange(idx, "material_name")(e)
                  }
                >
                  <option value="">-- เลือกวัสดุ --</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="incoming-detail-input"
                  value={it.quantity}
                  onChange={(e) => handleItemChange(idx, "quantity")(e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  className="incoming-detail-input"
                  value={it.price_per_unit}
                  onChange={(e) =>
                    handleItemChange(idx, "price_per_unit")(e)
                  }
                />
              </td>
              <td>{lineTotal(it)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="incoming-detail-summary">
        <strong>ราคารวมทั้งบิล:</strong> {grandTotal()}
      </div>

      {/* Actions */}
      <div className="incoming-detail-actions">
        <button
          className="incoming-detail-back-button"
          onClick={() => navigate(-1)}
        >
          ย้อนกลับ
        </button>
        <button
          className="incoming-detail-save-button"
          onClick={handleSave}
        >
          บันทึกการอัพเดต
        </button>
      </div>
    </div>
  );
}
