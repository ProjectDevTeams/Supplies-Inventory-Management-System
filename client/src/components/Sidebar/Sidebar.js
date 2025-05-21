import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import {
  faHouse,
  faBoxesPacking,
  faFileAlt,
  faDownload,
  faWrench,
  faUserTie,
  faStore,
  faChartBar,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  { icon: faHouse, label: "หน้าหลัก", to: "/home" },
  { icon: faBoxesPacking, label: "วัสดุสิ้นเปลือง", to: "/consumable" },
  { icon: faFileAlt, label: "เบิกวัสดุ", to: "/stuff" },
  { icon: faDownload, label: "รับเข้าวัสดุ", to: "/incoming" },
  { icon: faWrench, label: "ปรับยอด", to: "/adjust" },
  { icon: faUserTie, label: "บุคลากร", to: "/human" },
  { icon: faStore, label: "บริษัท/ห้าง/ร้าน", to: "/organizations" },
  { icon: faChartBar, label: "รายงาน", to: "/report" },
  { icon: faCog, label: "ตั้งค่าระบบ", to: "/setting" },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li className="menu-item" key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <div className="icon-box">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <span className="menu-text">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
