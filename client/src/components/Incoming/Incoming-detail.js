import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import { API_URL } from "../../config";
import "./Incoming-detail.css";

export default function IncomingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [header, setHeader] = useState({
    id: null,
    created_by: null,
    warehouse: "",
    company: null,       // allow null
    companyName: null,   // allow null
    projectName: null,   // allow null
    taxNumber: "",
    orderNumber: "",
    date: "",
    approvalStatus: ""
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [materials, setMaterials] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [materialSuggestions, setMaterialSuggestions] = useState([]);

  const getSuggestions = (list, value) => {
    const input = value.trim().toLowerCase();
    return list.filter(x => x.name.toLowerCase().includes(input));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/receive_materials/update_receive.php?id=${id}`)
      .then(res => {
        const { status, data } = res.data;
        if (status === "success") {
          const { bill, items } = data;
          setHeader({
            id: bill.id,
            created_by: bill.created_by,
            warehouse: bill.stock_type,
            company: bill.company_id ?? null,
            companyName: bill.company_name ?? null,
            projectName: bill.project_name ?? null,
            taxNumber: bill.tax_invoice_number,
            orderNumber: bill.purchase_order_number,
            date: bill.created_at,
            approvalStatus: bill.approval_status
          });
          setItems(
            items.map(it => ({
              material_id: it.material_id,
              material_name: it.material_name || "",
              quantity: it.quantity,
              price_per_unit: it.price_per_unit
            }))
          );
        } else {
          navigate(-1);
        }
      })
      .catch(() => navigate(-1))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/materials/get_materials.php`),
      axios.get(`${API_URL}/companies/get_companies.php`)
    ])
      .then(([mRes, cRes]) => {
        setMaterials(mRes.data.data || []);
        setCompanies(cRes.data.data || []);
      })
      .catch(console.error);
  }, []);

  const handleHeaderChange = field => e =>
    setHeader(h => ({ ...h, [field]: e.target.value }));

  const handleItemChange = (i, field) => e => {
    const raw = e.target.value;
    const val =
      field === "quantity" || field === "price_per_unit"
        ? Number(raw)
        : raw;
    setItems(prev =>
      prev.map((row, idx) => (idx === i ? { ...row, [field]: val } : row))
    );
  };

  const lineTotal = it => (it.quantity * it.price_per_unit).toFixed(2);
  const grandTotal = () =>
    items.reduce((sum, it) => sum + it.quantity * it.price_per_unit, 0).toFixed(2);

  const handleSave = () => {
    const payload = {
      id: header.id,
      created_by: header.created_by,
      stock_type: header.warehouse,
      company_id: header.company,               // send null or number
      project_name: header.projectName,         // send null or string
      tax_invoice_number: header.taxNumber,
      purchase_order_number: header.orderNumber,
      created_at: header.date,
      approval_status: header.approvalStatus,
      items: items.map(it => ({
        material_name: it.material_name,
        material_id: it.material_id,
        quantity: it.quantity,
        price_per_unit: it.price_per_unit,
        total_price: parseFloat(lineTotal(it))
      }))
    };

    axios
      .put(`${API_URL}/receive_materials/update_receive.php`, payload)
      .then(res => {
        if (res.data.status === "success") {
          navigate(-1);
        }
      })
      .catch(() => {
        // handle error
      });
  };

  if (loading) {
    return <div className="incoming-detail-container">กำลังโหลด...</div>;
  }

  return (
    <div className="incoming-detail-container">
      <h2 className="incoming-detail-title">รับเข้าวัสดุ บิล #{header.id}</h2>

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
        <Autosuggest
          suggestions={companySuggestions}
          onSuggestionsFetchRequested={({ value }) =>
            setCompanySuggestions(getSuggestions(companies, value))
          }
          onSuggestionsClearRequested={() =>
            setCompanySuggestions([])
          }
          getSuggestionValue={sug => sug.name}
          renderSuggestion={sug => <span>{sug.name}</span>}
          inputProps={{
            className: "incoming-detail-select",
            placeholder: "-- เลือกบริษัท --",
            value: header.companyName ?? "",
            onChange: (_, { newValue }) => {
              const c = companies.find(x => x.name === newValue);
              setHeader(h => ({
                ...h,
                companyName: newValue,
                company: c ? c.id : null
              }));
            }
          }}
        />
      </div>

      {header.warehouse === "วัสดุนอกคลัง" && (
        <div className="incoming-detail-row">
          <label>ชื่อโครงการ</label>
          <input
            type="text"
            className="incoming-detail-input"
            placeholder="พิมพ์ชื่อโครงการ..."
            value={header.projectName ?? ""}
            onChange={handleHeaderChange("projectName")}
          />
        </div>
      )}

      <div className="incoming-detail-row">
        <label>เลขที่กำกับภาษี</label>
        <input
          type="text"
          className="incoming-detail-input"
          value={header.taxNumber}
          onChange={handleHeaderChange("taxNumber")}
        />
      </div>

      <div className="incoming-detail-row">
        <label>เลขที่ มอ. จัดซื้อ</label>
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

      <div className="incoming-detail-row">
        <label>สถานะอนุมัติ</label>
        <select
          className="incoming-detail-select"
          value={header.approvalStatus}
          onChange={handleHeaderChange("approvalStatus")}
        >
          <option value="">-- เลือกสถานะ --</option>
          <option value="รออนุมัติ">รออนุมัติ</option>
          <option value="อนุมัติ">อนุมัติ</option>
          <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
        </select>
      </div>

      <hr className="incoming-detail-divider" />

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
                <Autosuggest
                  suggestions={materialSuggestions}
                  onSuggestionsFetchRequested={({ value }) =>
                    setMaterialSuggestions(getSuggestions(materials, value))
                  }
                  onSuggestionsClearRequested={() =>
                    setMaterialSuggestions([])
                  }
                  getSuggestionValue={sug => sug.name}
                  renderSuggestion={sug => <span>{sug.name}</span>}
                  inputProps={{
                    className: "incoming-detail-select",
                    placeholder: "-- เลือกวัสดุ --",
                    value: it.material_name,
                    onChange: (_, { newValue }) => {
                      const m = materials.find(x => x.name === newValue);
                      handleItemChange(idx, "material_name")({ target: { value: newValue } });
                      handleItemChange(idx, "material_id")({ target: { value: m ? m.id : "" } });
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="incoming-detail-input"
                  value={it.quantity}
                  onChange={handleItemChange(idx, "quantity")}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  className="incoming-detail-input"
                  value={it.price_per_unit}
                  onChange={handleItemChange(idx, "price_per_unit")}
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

      <div className="incoming-detail-actions">
        <button
          onClick={() => navigate(-1)}
          className="incoming-detail-back-button"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleSave}
          className="incoming-detail-save-button"
        >
          บันทึกการอัพเดต
        </button>
      </div>
    </div>
  );
}
