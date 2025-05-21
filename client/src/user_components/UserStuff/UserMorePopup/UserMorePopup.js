import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
import { API_URL } from "../../../config"; // ปรับตามโครงสร้างโปรเจกต์ของคุณ
import './UserMorePopup.css';

function UserMorePopup({ onClose }) {
  const [item, setItem] = useState(null); // วัสดุที่เลือก
  const [quantity, setQuantity] = useState(""); // จำนวน
  const [note, setNote] = useState(""); // หมายเหตุ
  const [options, setOptions] = useState([]); // รายการวัสดุคงเหลือ 0

  useEffect(() => {
  const fetchOutOfStockMaterials = async () => {
    try {
      const res = await axios.get(`${API_URL}/materials/get_materials.php`);
      console.log("API ตอบกลับ:", res.data);
      if (res.data.status === "success") {
        const filtered = res.data.data
          .filter(m => parseInt(m.remain) === 0)
          .map(m => ({
            label: m.name,
            value: m.name
          }));
        console.log("วัสดุคงเหลือ 0:", filtered);
        setOptions(filtered);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
    }
  };

  fetchOutOfStockMaterials();
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const materialName = item?.value || "";
    console.log("วัสดุ:", materialName);
    console.log("จำนวน:", quantity);
    console.log("หมายเหตุ:", note);
    onClose(); // ปิด popup หลังยืนยัน
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

            {/* วัสดุสิ้นเปลือง */}
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

            {/* จำนวน */}
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

            {/* หมายเหตุ */}
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
