// import React from 'react';
// import './Sidebar.css';

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <ul className="sidebar-menu">
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">⬛</span>
//             </div>
//             <span className="menu-text">หน้าแรก</span>
//           </a>
//         </li>
//         <li className="menu-item active">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">🏛️</span>
//             </div>
//             <span className="menu-text">คลังพัสดุ</span>
//           </a>
//         </li>
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">📝</span>
//             </div>
//             <span className="menu-text">เบิกวัสดุ</span>
//           </a>
//         </li>
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">📋</span>
//             </div>
//             <span className="menu-text">รับวัสดุ</span>
//           </a>
//         </li>
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">📦</span>
//             </div>
//             <span className="menu-text">ปรับยอด</span>
//           </a>
//         </li>
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">📊</span>
//             </div>
//             <span className="menu-text">ประวัติการรับและปรับยอด</span>
//           </a>
//         </li>
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">👥</span>
//             </div>
//             <span className="menu-text">บุคลากร</span>
//           </a>
//         </li>
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">🏢</span>
//             </div>
//             <span className="menu-text">บริษัทคู่ค้าร้าน</span>
//           </a>
//         </li>
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">📑</span>
//             </div>
//             <span className="menu-text">รายงาน</span>
//           </a>
//         </li>
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">👤</span>
//             </div>
//             <span className="menu-text">แอดมินส์</span>
//           </a>
//         </li>
//         <li className="menu-item">
//           <a href="#">
//             <div className="icon-box">
//               <span className="icon">⚙️</span>
//             </div>
//             <span className="menu-text">ตั้งค่าระบบ</span>
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

import React from 'react';
import './Sidebar.css';

const menuItems = [
  { icon: "🏠", label: "หน้าหลัก", to: "#" },
  { icon: "🎽", label: "วัสดุสิ้นเปลือง", to: "#" },
  { icon: "📄", label: "เบิกวัสดุ", to: "#" },
  { icon: "📥", label: "รับเข้าวัสดุ", to: "#" },
  { icon: "🛠️", label: "ปรับยอด", to: "#" },
  { icon: "🧾", label: "ประวัติเบิก/จ่าย/ปรับยอด", to: "#" },
  { icon: "👨‍💼", label: "บุคลากร", to: "#" },
  { icon: "🏬", label: "บริษัท/ห้าง/ร้าน", to: "#" },
  { icon: "📊", label: "รายงาน", to: "#" },
  { icon: "👥", label: "แบ่งสิทธิ์", to: "#" },
  { icon: "⚙️", label: "ตั้งค่าระบบ", to: "#" },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li className="menu-item" key={index}>
            <a href={item.to} className={index === 0 ? "active" : ""}>
              <div className="icon-box">{item.icon}</div>
              <span className="menu-text">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;


/* */
