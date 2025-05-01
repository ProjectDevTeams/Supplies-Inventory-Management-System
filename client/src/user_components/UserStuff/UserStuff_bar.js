import React, { useState } from "react";
import "./UserStuff_bar.css";

import UserStuffTable from "../../user_components/UserStuff/UserStuff_table";
import UserFollowTable from "../../user_components/UserStuff/UserFollow/UserFollowTable";
import UserHistoryTable from "../../user_components/UserStuff/UserHistory/UserHistoryTable";
import UserMorePopup from "../../user_components/UserStuff/UserMorePopup/UserMorePopup"; // ✅ ใช้ popup แทน

function UserStuffbar() {
  const [activeTab, setActiveTab] = useState("เบิกวัสดุ");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMorePopup, setShowMorePopup] = useState(false); // ✅ state เปิดป๊อปอัป

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "รายการขอจัดซื้อเพิ่มเติม") {
      setShowMorePopup(true);
    }
  };

  const renderTable = () => {
    switch (activeTab) {
      case "เบิกวัสดุ":
        return <UserStuffTable searchTerm={searchTerm} />;
      case "ติดตามสถานะ":
        return <UserFollowTable searchTerm={searchTerm} />;
      case "ประวัติการทำรายการ":
        return <UserHistoryTable searchTerm={searchTerm} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="userstuff-bar">
        <div className="userstuff-menu">
          {["เบิกวัสดุ", "ติดตามสถานะ", "ประวัติการทำรายการ", "รายการขอจัดซื้อเพิ่มเติม"].map((tab) => (
            <button
              key={tab}
              className={`userstuff-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="userstuff-right">
          <div className="userstuff-search-box">
            <span className="userstuff-search-icon">🔍</span>
            <input
              type="text"
              placeholder="ค้นหา"
              className="userstuff-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {activeTab === "เบิกวัสดุ" && (
            <div className="userstuff-bag-icon">
              <img src="/image/bagicon.png" alt="Bag" />
            </div>
          )}
        </div>

        <div className="userstuff-table-content">
          {renderTable()}
        </div>
      </div>

      {/* ✅ ป๊อปอัปสำหรับรายการขอจัดซื้อเพิ่มเติม */}
      {showMorePopup && <UserMorePopup onClose={() => setShowMorePopup(false)} />}
    </>
  );
}

export default UserStuffbar;
