import React, { useState, useEffect } from "react";
import "./Permission-Edit.css";

function PermissionEdit({ data = {}, onSave, onCancel }) {
  const [warehouse, setWarehouse] = useState("");
  const [groupName, setGroupName] = useState("");
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    setWarehouse(data.warehouse || "");
    setGroupName(data.groupName || "");
    setPermissions(data.permissions || {});
  }, [data]);

  const handleCheckboxChange = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = { warehouse, groupName, permissions };
    alert("บันทึกสิทธิ์เรียบร้อยแล้ว");
    if (onSave) onSave(updated);
  };

  const groupedPermissions = {
    "เมนูที่ใช้บ่อย": ["วัสดุสิ้นเปลือง"],
    "วัสดุสิ้นเปลือง": ["จัดการข้อมูล", "จัดการหมวดหมู่", "หน่วยนับ"],
    "เบิกวัสดุ": ["รายการเบิกวัสดุ", "ติดตามสถานะเบิก", "รายการขอจัดซื้อเพิ่มเติม"],
    "ประวัติเบิก/จ่าย/ปรับยอด": ["ประวัติทั้งหมด", "ประวัติรับเข้า", "ประวัติเบิก", "ประวัติปรับยอด"],
    "รายงาน": ["รายงานยอดคงเหลือวัสดุ", "รายงานการรับเข้าแต่ละเดือน", "รายงานรายจ่ายประจำปี", "รายงานการเบิก-จ่าย", "รายงานวัสดุใกล้หมดสต็อก"],
    "อื่นๆ": ["อนุมัติเบิกวัสดุ", "รับเข้าวัสดุ", "ปรับยอด", "บุคลากร", "บริษัท/ห้าง/ร้าน", "แบ่งสิทธิ์"]
  };

  return (
    <div className="permission-edit-container">
      <form className="permission-edit-form" onSubmit={handleSubmit}>
        <div className="permission-edit-title">แก้ไขสิทธิ์: {groupName}</div>

        <div className="permission-edit-row">
          <label className="permission-edit-label">คลังวัสดุ</label>
          <input className="permission-edit-input" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} />
        </div>

        <div className="permission-edit-row">
          <label className="permission-edit-label">ชื่อกลุ่ม</label>
          <input className="permission-edit-input" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        </div>

        {Object.entries(groupedPermissions).map(([group, items]) => (
          <div key={group} className="permission-edit-section">
            <div className="permission-edit-section-title">{group}</div>
            <div className="permission-edit-checkbox-list">
              {items.map((item) => (
                <label key={item} className="permission-edit-checkbox-item">
                  <input type="checkbox" className="permission-edit-checkbox" checked={permissions[item] || false} onChange={() => handleCheckboxChange(item)} />
                  {item}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="permission-edit-actions">
          <button type="button" className="permission-edit-cancel" onClick={onCancel}>ยกเลิก</button>
          <button type="submit" className="permission-edit-submit">บันทึก</button>
        </div>
      </form>
    </div>
  );
}

export default PermissionEdit;
