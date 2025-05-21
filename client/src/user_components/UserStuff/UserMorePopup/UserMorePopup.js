import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

import './UserMorePopup.css';

function UserMorePopup({ onClose }) {
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // จำลองวัสดุที่หมด
    const mockMaterials = [
      { label: "เทปกาว", value: "เทปกาว" },
      { label: "กระดาษ A4", value: "กระดาษ A4" },
      { label: "หมึกเครื่องพิมพ์", value: "หมึกเครื่องพิมพ์" }
    ];
    setOptions(mockMaterials);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const materialName = item?.value || "";
    console.log("วัสดุ:", materialName);
    console.log("จำนวน:", quantity);
    console.log("หมายเหตุ:", note);
    onClose();
  };

  return (
    <div className="usermorepopup-overlay">
      <div className="usermorepopup-container">
        <div className="usermorepopup-header">
          <span>รายการขอจัดซื้อเพิ่มเติม</span>
          <button className="usermorepopup-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="usermorepopup-body">
            <div className="usermorepopup-row">
              <label>วัสดุสิ้นเปลือง</label>
              <CreatableSelect
                options={options}
                value={item}
                onChange={setItem}
                isClearable
                isSearchable
                placeholder="เลือกหรือพิมพ์ชื่อวัสดุ..."
                className="custom-select"
                 formatCreateLabel={(inputValue) => `เพิ่ม "${inputValue}"`} 
              />
            </div>

            <div className="usermorepopup-row">
              <label>จำนวนขอจัดซื้อเพิ่มเติม</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  setQuantity(value);
                }}
              />
            </div>

            <div className="usermorepopup-row">
              <label>หมายเหตุ</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <div className="usermorepopup-footer">
            <button type="submit" className="usermorepopup-confirm">
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserMorePopup;
