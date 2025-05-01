import React, { useState } from "react";
import "./UserStuff_bar.css";


import UserStuffTable from "../../user_components/UserStuff/UserStuff_table";

import UserFollowTable from "../../user_components/UserStuff/UserFollow/UserFollowTable";
import UserHistoryTable from "../../user_components/UserStuff/UserHistory/UserHistoryTable";
import UserMoreTable from "../../user_components/UserStuff/UserMore/UserMoreTable";

function UserStuffbar() {
  const [activeTab, setActiveTab] = useState("เบิกวัสดุ");
  const [searchTerm, setSearchTerm] = useState("");

  const renderTable = () => {
    switch (activeTab) {
      case "เบิกวัสดุ":
        return <UserStuffTable searchTerm={searchTerm} />;
      case "ติดตามสถานะ":
        return <UserFollowTable searchTerm={searchTerm} />;
      case "ประวัติการทำรายการ":
        return <UserHistoryTable searchTerm={searchTerm} />;
      case "รายการขอจัดซื้อเพิ่มเติม":
        return <UserMoreTable searchTerm={searchTerm} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="userstuff-bar">
        <div className="userstuff-menu">
          {["เบิกวัสดุ", "ติดตามสถานะ", "ประวัติการทำรายการ", "รายการขอจัดซื้อเพิ่มเติม"].map(tab => (
            <button
              key={tab}
              className={`userstuff-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
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
    </>
  );
}


export default UserStuffbar;
