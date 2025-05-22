import React, { useState } from "react";
import "./UserStuff_bar.css";
import { useNavigate , useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import UserMorePopup from "../../user_components/UserStuff/UserMorePopup/UserMorePopup";
import UserStuffBasketPopup from "../../user_components/UserPopup/StuffBasket_Popup";



function UserStuffbar({ searchTerm, setSearchTerm, basketItems = [], setBasketItems = () => {} })  {
  const [showMorePopup, setShowMorePopup] = useState(false);
  const [showBasketPopup, setShowBasketPopup] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const isStuffPage = location.pathname === "/userstuff/stuff";


  const handleTabClick = (tab) => {
    switch (tab) {
      case "เบิกวัสดุ":
        navigate("/userstuff/stuff"); // path ไปยัง UserStuffTablePage.js
        break;
      case "สถานะการเบิกวัสดุ ":
        navigate("/userstuff/follow"); // path ไปยัง UserFollowTablePage.js
        break;
      case "ประวัติการทำรายการ":
        navigate("/userstuff/history"); // path ไปยัง UserHistoryTablePage.js
        break;
      case "รายการขอจัดซื้อเพิ่มเติม":
        setShowMorePopup(true);
        break;
      default:
        break;
    }
  };

  const currentTab = (() => {
    switch (location.pathname) {
      case "/userstuff/stuff":
        return "เบิกวัสดุ";
      case "/userstuff/follow":
        return "สถานะการเบิกวัสดุ ";
      case "/userstuff/history":
        return "ประวัติการทำรายการ";
      default:
        return "";
    }
  })();

  const handleConfirmRequest = async () => {
    try {
      const payload = {
        created_by: 1, // สมมติ user id
        materials: basketItems.map((item) => ({
          code: item.code,
          name: item.name,
          quantity: item.quantity,
          category: item.category,
        })),
      };

      console.log("📦 ส่งข้อมูลสำเร็จ", payload);
      setBasketItems([]);
      setShowBasketPopup(false);
    } catch (err) {
      console.error("❌ ส่งข้อมูลล้มเหลว", err);
    }
  };

  const totalQuantity = basketItems.reduce((sum, item) => sum + item.quantity, 0);

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
              className={`userstuff-tab ${currentTab === tab ? "active" : ""}`}
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

          {isStuffPage && (
            <div className="userstuff-bag-icon-wrapper">
              <div
                className="userstuff-bag-icon"
                onClick={() => setShowBasketPopup(true)}
              >
                <img src="/image/bagicon.png" alt="Bag" />
                {totalQuantity > 0 && (
                  <span className="basket-badge">{totalQuantity}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showMorePopup && (
        <UserMorePopup onClose={() => setShowMorePopup(false)} />
      )}

      {showBasketPopup && (
        <UserStuffBasketPopup
          basketItems={basketItems}
          onClose={() => setShowBasketPopup(false)}
          onConfirm={handleConfirmRequest}
          onCancel={() => {
            setBasketItems([]);
            setShowBasketPopup(false);
          }}
        />
      )}
    </>
  );
}

export default UserStuffbar;
