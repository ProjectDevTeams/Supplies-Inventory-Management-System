// File: src/components/IncomingDetail/IncomingDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { API_URL } from "../../config";
import "./Incoming-detail.css";

export default function IncomingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [header, setHeader] = useState({
    id: null,
    created_by: null,
    warehouse: "",
    company: null,
    companyName: null,
    projectName: null,
    taxNumber: "",
    orderNumber: "",
    date: "",
    approvalStatus: ""
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [materials, setMaterials] = useState([]);
  const [companies, setCompanies] = useState([]);

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

  const handleSave = () => {
    const payload = {
      id: header.id,
      created_by: header.created_by,
      stock_type: header.warehouse,
      company_id: header.company,
      project_name: header.projectName,
      tax_invoice_number: header.taxNumber,
      purchase_order_number: header.orderNumber,
      created_at: header.date,
      approval_status: header.approvalStatus,
      items: items.map(it => ({
        material_id: it.material_id,
        material_name: it.material_name,
        quantity: it.quantity,
        price_per_unit: it.price_per_unit,
        total_price: (it.quantity * it.price_per_unit).toFixed(2)
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

  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));
  const materialOptions = materials
    .filter(m => m.location === header.warehouse)
    .map(m => ({ value: m.id, label: m.name }));

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
        <Select
          classNamePrefix="incoming-select"
          options={companyOptions}
          isClearable
          placeholder="เลือกบริษัท..."
          onChange={opt =>
            setHeader(h => ({
              ...h,
              company: opt ? opt.value : null,
              companyName: opt ? opt.label : null
            }))
          }
          value={
            header.company
              ? { value: header.company, label: header.companyName }
              : null
          }
          isDisabled={loading}
        />
      </div>

      {header.warehouse === "วัสดุนอกคลัง" && (
        <div className="incoming-detail-row">
          <label>ชื่อโครงการ</label>
          <input
            type="text"
            className="incoming-detail-input"
            placeholder="พิมพ์ชื่อโครงการ..."
            value={header.projectName || ""}
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
                <Select
                  classNamePrefix="incoming-select"
                  options={materialOptions}
                  isClearable
                  placeholder="เลือกวัสดุ..."
                  onChange={opt => {
                    const val = opt ? opt.value : "";
                    const label = opt ? opt.label : "";
                    setItems(prev =>
                      prev.map((row, i) =>
                        i === idx
                          ? {
                              ...row,
                              material_id: val,
                              material_name: label
                            }
                          : row
                      )
                    );
                  }}
                  value={
                    it.material_id
                      ? { value: it.material_id, label: it.material_name }
                      : null
                  }
                  isDisabled={!header.warehouse || loading}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="incoming-detail-input"
                  value={it.quantity}
                  onChange={e =>
                    setItems(prev =>
                      prev.map((row, i) =>
                        i === idx
                          ? { ...row, quantity: Number(e.target.value) }
                          : row
                      )
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  className="incoming-detail-input"
                  value={it.price_per_unit}
                  onChange={e =>
                    setItems(prev =>
                      prev.map((row, i) =>
                        i === idx
                          ? { ...row, price_per_unit: Number(e.target.value) }
                          : row
                      )
                    )
                  }
                />
              </td>
              <td>{(it.quantity * it.price_per_unit).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="incoming-detail-summary">
        <strong>ราคารวมทั้งบิล:</strong>{" "}
        {items
          .reduce((sum, it) => sum + it.quantity * it.price_per_unit, 0)
          .toFixed(2)}
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
