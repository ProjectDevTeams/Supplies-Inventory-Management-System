import React, { useState } from "react";
import "./UserStuff_bar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import UserMorePopup from "../../user_components/UserStuff/UserMorePopup/UserMorePopup";
import UserStuffBasketPopup from "../../user_components/UserPopup/StuffBasket_Popup";

import Swal from "sweetalert2";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function UserStuffbar({
  searchTerm,
  setSearchTerm,
  basketItems = [],
  setBasketItems = () => {},
}) {
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
      case "รายการขอจัดซื้อเพิ่มเติม":
        navigate("/userstuff/more"); // path ไปยัง UserMoreTablePage.js

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
      case "/userstuff/more":
        return "รายการขอจัดซื้อเพิ่มเติม";
      case "/userstuff/more/add":
        return "เพิ่มรายการขอจัดซื้อเพิ่มเติม";
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

  const totalQuantity = basketItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <div className="userstuff-bar">
        <div className="userstuff-menu">
          {["เบิกวัสดุ", "สถานะการเบิกวัสดุ ", "รายการขอจัดซื้อเพิ่มเติม"].map(
            (tab) => (
              <button
                key={tab}
                className={`userstuff-tab ${
                  currentTab === tab ? "active" : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="userstuff-right">
          {[
            "เบิกวัสดุ",
            "สถานะการเบิกวัสดุ ",
            "รายการขอจัดซื้อเพิ่มเติม",
          ].includes(currentTab) && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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

              {currentTab === "รายการขอจัดซื้อเพิ่มเติม" && (
                <button
                  className="userstuff-add-more-btn"
                  onClick={() => setShowMorePopup(true)}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: "0.5rem" }} />
                  <span className="full-text">เพิ่มรายการ</span>
                  <span className="short-text">เพิ่ม</span>
                </button>
              )}
            </div>
          )}

          {isStuffPage && (
            <div className="userstuff-bag-icon-wrapper">
              <div
                className="userstuff-bag-icon"
                onClick={() => {
                  if (totalQuantity > 0) {
                    setShowBasketPopup(true);
                  } else {
                    Swal.fire({
                      icon: "info",
                      title: "ไม่มีรายการที่เลือก",
                      text: "กรุณาเลือกวัสดุก่อนเปิดตะกร้า",
                      confirmButtonText: "ตกลง",
                    });
                  }
                }}
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
        <div className="userstuff-popup-overlay">
          <UserMorePopup onClose={() => setShowMorePopup(false)} />
        </div>
      )}

      {showBasketPopup && (
        <UserStuffBasketPopup
          basketItems={basketItems}
          setBasketItems={setBasketItems}
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
