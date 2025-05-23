import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useIncomingDetail } from "./useIncomingDetail";
import { IncomingDetailSweetAlertUpdate } from "./IncomingSweetAlert";
import "./Incoming-detail.css";

export default function IncomingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    header,
    setHeader,
    items,
    setItems,
    materials,
    companies,
    loading,
    save
  } = useIncomingDetail(id, navigate);

  const handleHeaderSelect = field => opt => {
    if (field === "warehouse")
      setHeader(h => ({ ...h, warehouse: opt?.value || "" }));
    if (field === "company")
      setHeader(h => ({
        ...h,
        company: opt?.value || null,
        companyName: opt?.label || null
      }));
    if (field === "approvalStatus")
      setHeader(h => ({ ...h, approvalStatus: opt?.value || "" }));
  };

  const handleHeaderChange = field => e =>
    setHeader(h => ({ ...h, [field]: e.target.value }));

  if (loading) {
    return <div className="incoming-detail-container">กำลังโหลด...</div>;
  }

  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));
  const materialOptions = materials
    .filter(m => m.location === header.warehouse)
    .map(m => ({ value: m.id, label: m.name }));

  const stockOptions = [
    { value: "วัสดุในคลัง", label: "วัสดุในคลัง" },
    { value: "วัสดุนอกคลัง", label: "วัสดุนอกคลัง" }
  ];

  const approvalOptions = [
    { value: "รออนุมัติ", label: "รออนุมัติ" },
    { value: "อนุมัติ", label: "อนุมัติ" },
    { value: "ไม่อนุมัติ", label: "ไม่อนุมัติ" }
  ];

  return (
    <div className="incoming-detail-container">
      <h2 className="incoming-detail-title">รับเข้าวัสดุ บิล #{header.id}</h2>

      <div className="incoming-detail-row">
        <label>คลังวัสดุ</label>
        <Select
          classNamePrefix="incoming-select"
          options={stockOptions}
          isClearable
          placeholder="เลือกคลังวัสดุ..."
          onChange={handleHeaderSelect("warehouse")}
          value={
            header.warehouse
              ? { value: header.warehouse, label: header.warehouse }
              : null
          }
        />
      </div>

      <div className="incoming-detail-row">
        <label>บริษัท/ร้านค้า</label>
        <Select
          classNamePrefix="incoming-select"
          options={companyOptions}
          isClearable
          placeholder="เลือกบริษัท..."
          onChange={handleHeaderSelect("company")}
          value={
            header.company
              ? { value: header.company, label: header.companyName }
              : null
          }
        />
      </div>

      {header.warehouse === "วัสดุนอกคลัง" && (
        <div className="incoming-detail-row">
          <label>ชื่อโครงการ</label>
          <input
            className="incoming-detail-input"
            value={header.projectName || ""}
            onChange={handleHeaderChange("projectName")}
          />
        </div>
      )}

      <div className="incoming-detail-row">
        <label>เลขที่กำกับภาษี</label>
        <input
          className="incoming-detail-input"
          value={header.taxNumber}
          onChange={handleHeaderChange("taxNumber")}
        />
      </div>

      <div className="incoming-detail-row">
        <label>เลขที่ มอ. จัดซื้อ</label>
        <input
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
        <Select
          classNamePrefix="incoming-select"
          options={approvalOptions}
          isClearable
          placeholder="เลือกสถานะ..."
          onChange={handleHeaderSelect("approvalStatus")}
          value={
            header.approvalStatus
              ? { value: header.approvalStatus, label: header.approvalStatus }
              : null
          }
        />
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
                          ? { ...row, material_id: val, material_name: label }
                          : row
                      )
                    );
                  }}
                  value={
                    it.material_id
                      ? { value: it.material_id, label: it.material_name }
                      : null
                  }
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
        <button onClick={() => navigate(-1)} className="incoming-detail-back-button">
          ย้อนกลับ
        </button>
        <button
          onClick={() =>
            save().then(() => {
              IncomingDetailSweetAlertUpdate();
              navigate(-1);
            })
          }
          className="incoming-detail-save-button"
        >
          บันทึกการอัพเดต
        </button>
      </div>
    </div>
  );
}
