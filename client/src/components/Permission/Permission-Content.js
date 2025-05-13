import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config"; // ✅ แก้ path ให้ถูกกับโปรเจกต์คุณ
import "./Permission-Content.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PermissionContent() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    axios.get(`${API_URL}/permissions/get_permissions.php`)
      .then(res => {
        if (res.data.status === "success") {
          setData(res.data.data);
        }
      })
      .catch(err => {
        console.error("โหลดข้อมูลสิทธิ์ล้มเหลว", err);
      });
  }, []);

  const filteredData = data.filter((item) =>
    [item.name, item.created_at].some((field) =>
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
        ? a.id - b.id
        : b.id - a.id;
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
          warehouse: "", // แก้ภายหลังหากมีข้อมูลคลัง
          permissions: {}, // แก้ภายหลังหากต้องการส่งสิทธิ์แบบละเอียด
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
            <th>ชื่อสิทธิ์</th>
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
            displayedData.map((item) => (
              <tr key={item.id} className="perm-clickable-row" onClick={() => handleRowClick(item.id, item.name)}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.created_at}</td>
                <td>{item.updated_at}</td>
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
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>ก่อนหน้า</button>
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
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default PermissionContent;
