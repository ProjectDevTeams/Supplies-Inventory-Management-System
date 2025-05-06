import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Permission-Content.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const [data, setData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState(""); // ✅ เพิ่ม search term

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");

  // ✅ ฟิลเตอร์ข้อมูลตามคำค้นหา
  const filteredData = data.filter(([id, name, created, updated]) =>
    [name, created].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  const handleSortClick = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...data].sort((a, b) => {
      return newOrder === "asc"
        ? parseInt(a[0]) - parseInt(b[0])
        : parseInt(b[0]) - parseInt(a[0]);
    });
    setSortOrder(newOrder);
    setData(sorted);
  };

  const handleRowClick = (id, name) => {
    navigate(`/permission/edit/${id}`, {
      state: {
        data: {
          id,
          groupName: name,
          warehouse: "",
          permissions: {},
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
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="ค้นหา"
              className="perm-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="perm-add-btn" onClick={() => navigate("/permission/add")}>
            + เพิ่มสิทธิ์
          </button>
        </div>
      </div>

      <table className="perm-table">
        <thead>
          <tr>
            <th>
              <span onClick={handleSortClick} style={{ cursor: "pointer" }}>
                ลำดับ <span className="perm-sort-arrow">{sortOrder === "asc" ? "▲" : "▼"}</span>
              </span>
            </th>
            <th>บริษัท/ร้านค้า</th>
            <th>วันที่สร้าง</th>
            <th>วันที่แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.length === 0 ? (
            <tr>
              <td colSpan="4" className="perm-no-data-message">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            displayedData.map(([id, name, created, updated]) => (
              <tr key={id} className="perm-clickable-row" onClick={() => handleRowClick(id, name)}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{created}</td>
                <td>{updated}</td>
              </tr>
            ))
          )}
        </tbody>

      </table>

      <div className="perm-pagination-wrapper">
        <div className="perm-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="perm-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="perm-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = parseInt(inputPage.trim(), 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
                e.target.blur();
              }
            }}
            placeholder={`${currentPage} / ${totalPages}`}
          />
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default PermissionContent;
