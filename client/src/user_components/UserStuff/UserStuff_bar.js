import React, { useState } from "react";
import "./UserStuff_bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import UserStuffTable from "../../user_components/UserStuff/UserStuff_table";
import UserFollowTable from "../../user_components/UserStuff/UserFollow/UserFollowTable";
import UserHistoryTable from "../../user_components/UserStuff/UserHistory/UserHistoryTable";
import UserMorePopup from "../../user_components/UserStuff/UserMorePopup/UserMorePopup";
import UserStuffBasketPopup from "../../user_components/UserPopup/StuffBasket_Popup";

function UserStuffbar() {
  const [activeTab, setActiveTab] = useState("เบิกวัสดุ");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMorePopup, setShowMorePopup] = useState(false);
  const [showBasketPopup, setShowBasketPopup] = useState(false);

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
      case "สถานะการเบิกวัสดุ ":
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
          {[
            "เบิกวัสดุ",
            "สถานะการเบิกวัสดุ ",
            "ประวัติการทำรายการ",
            "รายการขอจัดซื้อเพิ่มเติม",
          ].map((tab) => (
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
            <FontAwesomeIcon
              icon={faSearch}
              className="userstuff-search-icon"
            />
            <input
              type="text"
              placeholder="ค้นหา"
              className="userstuff-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {activeTab === "เบิกวัสดุ" && (
            <div
              className="userstuff-bag-icon"
              onClick={() => setShowBasketPopup(true)}
            >
              <img src="/image/bagicon.png" alt="Bag" />
            </div>
          )}
        </div>

        <div className="userstuff-table-content">{renderTable()}</div>
      </div>

      {showMorePopup && (
        <UserMorePopup onClose={() => setShowMorePopup(false)} />
      )}

      {showBasketPopup && (
        <UserStuffBasketPopup onClose={() => setShowBasketPopup(false)} />
      )}
    </>
  );
}

export default UserStuffbar;
