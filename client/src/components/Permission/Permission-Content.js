import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Permission-Content.css";

function PermissionContent() {
  const navigate = useNavigate();

  const initialData = [
    ["1", "แอดมิน ฝ่ายบริการโครงสร้างพื้นฐานฯ", "27 มี.ค. 65", "24 พ.ย. 65"],
    ["2", "สำนักงานความร่วมมืออุตสาหกรรม", "27 มี.ค. 65", "—"],
    ["3", "ศูนย์ทรัพย์สินทางปัญญา", "27 มี.ค. 65", "—"],
    ["4", "ศูนย์บ่มเพาะวิสาหกิจ", "27 มี.ค. 65", "—"],
    ["5", "ฝ่ายยุทธศาสตร์และแผน", "17 พ.ค. 65", "—"],
    ["6", "ศูนย์นวัตกรรมการออกแบบ", "17 พ.ค. 65", "—"],
    ["7", "สำนักงานกลาง", "17 พ.ค. 65", "9 พ.ย. 65"],
    ["8", "สถาบันพัฒนาการเป็นผู้ประกอบการนักศึกษา", "17 พ.ค. 65", "—"],
    ["9", "ประชาสัมพันธ์และสื่อสารองค์กร", "31 ส.ค. 65", "7 ธ.ค. 65"],
    ["10", "STI", "31 ส.ค. 65", "—"],
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const totalPages = Math.ceil(initialData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedData = initialData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  const handleRowClick = (id, name) => {
    navigate(`/permission/edit/${id}`, {
      state: {
        data: {
          id,
          groupName: name,
          warehouse: "",        // ใส่ค่า default ได้
          permissions: {},      // ค่าเริ่มต้น (ปรับตามจริงได้)
        },
      },
    });
  };

  return (
    <div className="perm-container">
      <div className="perm-bar">
        <div className="perm-title">แบ่งสิทธิ์</div>
        <div className="perm-controls">
          <div className="perm-search-box">
            <span className="perm-search-icon">🔍</span>
            <input type="text" placeholder="ค้นหา" className="perm-search-input" />
          </div>
          <button className="perm-add-btn" onClick={() => navigate("/permission/add")}>
            + เพิ่มสิทธิ์
          </button>
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
            <tr key={id} className="perm-clickable-row" onClick={() => handleRowClick(id, name)}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{created}</td>
              <td>{updated}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="perm-pagination-wrapper">
        <div className="perm-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, initialData.length)} จาก {initialData.length} แถว
        </div>
        <div className="perm-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>ก่อนหน้า</button>
          <input
            type="number"
            className="perm-page-input"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setCurrentPage(Number(inputPage))}
            placeholder={`${currentPage} / ${totalPages}`}
          />
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default PermissionContent;
