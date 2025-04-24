import React, { useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBoxesPacking,
  faFileAlt,
  faDownload,
  faWrench,
  faFileInvoice,
  faUserTie,
  faStore,
  faChartBar,
  faUsers,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  { icon: faHouse, label: "หน้าหลัก", to: "#" },
  { icon: faBoxesPacking, label: "วัสดุสิ้นเปลือง", to: "#" },
  { icon: faFileAlt, label: "เบิกวัสดุ", to: "#" },
  { icon: faDownload, label: "รับเข้าวัสดุ", to: "#" },
  { icon: faWrench, label: "ปรับยอด", to: "#" },
  { icon: faFileInvoice, label: "ประวัติเบิก/จ่าย/ปรับยอด", to: "#" },
  { icon: faUserTie, label: "บุคลากร", to: "#" },
  { icon: faStore, label: "บริษัท/ห้าง/ร้าน", to: "#" },
  { icon: faChartBar, label: "รายงาน", to: "#" },
  { icon: faUsers, label: "แบ่งสิทธิ์", to: "#" },
  { icon: faCog, label: "ตั้งค่าระบบ", to: "#" },
];

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li className="menu-item" key={index}>
            <a
              href={item.to}
              className={activeIndex === index ? "active" : ""}
              onClick={() => setActiveIndex(index)}
            >
              <div className="icon-box">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <span className="menu-text">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
