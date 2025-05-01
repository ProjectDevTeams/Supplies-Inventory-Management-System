import React, { useState } from "react";
import "./Permission-Add.css";

function PermissionAdd() {
  const [warehouse, setWarehouse] = useState("");
  const [groupName, setGroupName] = useState("");
  const [permissions, setPermissions] = useState({});

  const handleCheckboxChange = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ warehouse, groupName, permissions });
    alert("บันทึกสิทธิ์เรียบร้อยแล้ว");
  };

  const groupedPermissions = {
    "เมนูที่ใช้บ่อย": ["วัสดุสิ้นเปลือง"],
    "วัสดุสิ้นเปลือง": ["จัดการข้อมูล", "จัดการหมวดหมู่", "หน่วยนับ"],
    "เบิกวัสดุ": ["รายการเบิกวัสดุ", "ติดตามสถานะเบิก", "รายการขอจัดซื้อเพิ่มเติม"],
    "ประวัติเบิก/จ่าย/ปรับยอด": ["ประวัติทั้งหมด", "ประวัติรับเข้า", "ประวัติเบิก", "ประวัติปรับยอด"],
    "รายงาน": [
      "รายงานยอดคงเหลือวัสดุ",
      "รายงานการรับเข้าแต่ละเดือน",
      "รายงานรายจ่ายประจำปี",
      "รายงานการเบิก-จ่าย",
      "รายงานวัสดุใกล้หมดสต็อก"
    ],
    "อื่นๆ": ["อนุมัติเบิกวัสดุ", "รับเข้าวัสดุ", "ปรับยอด", "บุคลากร", "บริษัท/ห้าง/ร้าน", "แบ่งสิทธิ์"]
  };

  return (
    <div className="permission-add-container">
      <form className="permission-add-form" onSubmit={handleSubmit}>
        <div className="permission-add-title">เพิ่มสิทธิ์</div>

        <div className="permission-add-row">
          <label className="permission-add-label">คลังวัสดุ</label>
          <input
            className="permission-add-input"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            placeholder="ชื่อคลังวัสดุ"
          />
        </div>

        <div className="permission-add-row">
          <label className="permission-add-label">ชื่อกลุ่ม</label>
          <input
            className="permission-add-input"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="ชื่อกลุ่มผู้ใช้"
          />
        </div>

        {Object.entries(groupedPermissions).map(([group, items]) => (
          <div key={group} className="permission-add-section">
            <div className="permission-add-section-title">{group}</div>
            <div className="permission-add-checkbox-list">
              {items.map((item) => (
                <label key={item} className="permission-add-checkbox-item">
                  <input
                    type="checkbox"
                    className="permission-add-checkbox"
                    checked={permissions[item] || false}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="permission-add-actions">
          <button type="submit" className="permission-add-submit">บันทึก</button>
        </div>
      </form>
    </div>
  );
}

export default PermissionAdd;
