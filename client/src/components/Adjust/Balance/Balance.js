import React from "react";
import "./Balance.css";

function Balance() {
  return (
    <div className="balance-container">
      <h2 className="balance-header">ปรับยอด</h2>

      <div className="balance-box">
        <div className="balance-row">
          <strong>จากคลัง</strong>
          <span>วัสดุในคลัง</span>
        </div>

        <hr className="balance-divider" />

        <div className="balance-row">
          <strong>วัสดุสิ้นเปลือง</strong>
          <span>ถ่าน Panasonic AAA</span>
        </div>

        <div className="balance-row">
          <strong>จากจำนวน</strong>
          <span>96</span>
          <strong className="balance-right">เป็นจำนวน</strong>
          <span>0</span>
        </div>
      </div>

      <div className="balance-actions">
        <button className="balance-back-button" onClick={() => window.history.back()}>
          กลับ
        </button>
      </div>
    </div>
  );
}

export default Balance;
