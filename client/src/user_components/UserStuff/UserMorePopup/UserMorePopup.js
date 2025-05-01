import React, { useState } from 'react';
import './UserMorePopup.css';

function UserMorePopup({ onClose }) {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // ❗ ป้องกันรีเฟรช
    console.log("บันทึกข้อมูล:", { item, quantity, note });

    // 👇 ตรงนี้คุณสามารถส่งข้อมูลไปยัง backend ได้ เช่น fetch/axios
    // หลังบันทึกเสร็จ
    onClose(); // ปิด popup
  };

  return (
    <div className="usermorepopup-overlay">
      <div className="usermorepopup-container">
        <div className="usermorepopup-header">
          <span>รายการขอจัดซื้อเพิ่มเติม</span>
          <button className="usermorepopup-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="usermorepopup-body">
            <div className="usermorepopup-row">
              <label>วัสดุสิ้นเปลือง</label>
              <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
            </div>
            <div className="usermorepopup-row">
              <label>จำนวนขอจัดซื้อเพิ่มเติม</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="usermorepopup-row">
              <label>หมายเหตุ</label>
              <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </div>
          <div className="usermorepopup-footer">
            <button type="submit" className="usermorepopup-confirm">ยืนยัน</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserMorePopup;
