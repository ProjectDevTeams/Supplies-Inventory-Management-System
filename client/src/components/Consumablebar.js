import React from "react";
import "./Consumablebar.css";

function Consumable() {
  return (
    <body className="">
      <div class="top-bar">
        <div class="top-title">วัสดุสิ้นเปลือง</div>

        <div class="toolbar">
          <div class="search-container">
            <input type="text" placeholder="ค้นหา"></input>
            <span class="search-icon">🔍</span>
          </div>

          <div class="button-group">
            <button class="btn danger">
              สินค้าใกล้หมดสต็อก <span class="count">60</span> รายการ
            </button>
            <button class="btn success">+ เพิ่มรายการ</button>
            <button class="btn primary">จัดการหมวดหมู่</button>
            <button class="btn dark">จัดการหน่วยนับ</button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Consumable;
