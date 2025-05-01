import React from "react";
import "./UserStuff_bar.css";


function UserStuffbar() {
  return (
    <div className="userstuff-bar">
      {/* แถบเมนูด้านบน */}
      <div className="userstuff-menu">
        <button className="userstuff-tab active">เบิกวัสดุ</button>
        <button className="userstuff-tab">ติดตามสถานะ</button>
        <button className="userstuff-tab">ประวัติการทำรายการ</button>
        <button className="userstuff-tab">รายการขอจัดซื้อเพิ่มเติม</button>
      </div>

      {/* ค้นหาและไอคอน */}
      <div className="userstuff-right">
        <div className="userstuff-search-box">
          <span className="userstuff-search-icon">🔍</span>
          <input type="text" placeholder="ค้นหา" className="userstuff-input" />
        </div>

        <div className="userstuff-bag-icon">
          <img src="/image/bagicon.png" alt="Bag" />
        </div>
      </div>
    </div>
  );
}

export default UserStuffbar;
