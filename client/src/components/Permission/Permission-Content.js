import React, { useState } from "react";
import "./Permission-Content.css";

function PermissionContent() {
  const initialData = [
    ["01", "แอดมิน ฝ่ายบริการโครงสร้างพื้นฐานฯ", "27 มี.ค. 65", "24 พ.ย. 65"],
    ["02", "สำนักงานความร่วมมืออุตสาหกรรม", "27 มี.ค. 65", "—"],
    ["03", "ศูนย์ทรัพย์สินทางปัญญา", "27 มี.ค. 65", "—"],
    ["04", "ศูนย์บ่มเพาะวิสาหกิจ", "27 มี.ค. 65", "—"],
    ["05", "ฝ่ายยุทธศาสตร์และแผน", "17 พ.ค. 65", "—"],
    ["06", "ศูนย์นวัตกรรมการออกแบบ", "17 พ.ค. 65", "—"],
    ["07", "สำนักงานกลาง", "17 พ.ค. 65", "9 พ.ย. 65"],
    ["08", "สถาบันพัฒนาการเป็นผู้ประกอบการนักศึกษา", "17 พ.ค. 65", "—"],
    ["09", "ประชาสัมพันธ์และสื่อสารองค์กร", "31 ส.ค. 65", "7 ธ.ค. 65"],
    ["10", "STI", "31 ส.ค. 65", "—"],
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(initialData.length / itemsPerPage);
  const displayedData = initialData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="perm-container">
      <div className="perm-bar">
        <div className="perm-title">แบ่งสิทธิ์</div>

        <div className="perm-controls">
          <div className="perm-search-box">
            <span className="perm-search-icon">🔍</span>
            <input type="text" placeholder="ค้นหา" className="perm-search-input" />
          </div>
          <button className="perm-add-btn">+ เพิ่มสิทธิ์</button>
        </div>
      </div>

      <table className="perm-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>บริษัท/ร้านค้า</th>
            <th>วันที่สร้าง</th>
            <th>วันที่แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map(([id, name, created, updated]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>
                <span className="perm-highlight-clickable">{name}</span>
                <br />
              </td>
              <td>{created}</td>
              <td>{updated}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="perm-pagination">
        <div className="perm-pagination-info">
          แสดง {(currentPage - 1) * itemsPerPage + 1} ถึง{" "}
          {Math.min(currentPage * itemsPerPage, initialData.length)} จาก {initialData.length} แถว
        </div>
        <div className="perm-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>ก่อนหน้า</button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default PermissionContent;
