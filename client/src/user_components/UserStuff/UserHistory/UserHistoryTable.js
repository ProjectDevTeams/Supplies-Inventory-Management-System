import React, { useState } from 'react';
import './UserHistoryTable.css';
import { useNavigate } from 'react-router-dom'; // เพิ่มบรรทัดนี้ด้านบน

function UserHistoryTable({ searchTerm = "" }) {

  const navigate = useNavigate(); // เพิ่มบรรทัดนี้ใน component ก่อน return

  const data = [
    {
      id: 1,
      number: "003-12/2567",
      category: "เบิกวัสดุ",
      items: 1,
      date: "12 ธ.ค. 67",
      status: "รับของเรียบร้อย"
    },
    {
      id: 2,
      number: "ถ่าน 9 โวลต์",
      category: "จัดซื้อเพิ่มเติม",
      items: 1,
      date: "28 มี.ค. 67",
      status: "รับของเรียบร้อย"
    }
  ];

  // ✅ เพิ่มการกรองข้อมูลจากทุกช่อง
  const filteredData = data.filter((row) =>
    row.id.toString().includes(searchTerm) ||
    row.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.items.toString().includes(searchTerm) ||
    row.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [userhistoryCurrentPage, setUserhistoryCurrentPage] = useState(1);
  const [userhistoryItemsPerPage] = useState(5);
  const [userhistoryInputPage, setUserhistoryInputPage] = useState(1);

  const userhistoryIndexOfLastItem = userhistoryCurrentPage * userhistoryItemsPerPage;
  const userhistoryIndexOfFirstItem = userhistoryIndexOfLastItem - userhistoryItemsPerPage;
  const userhistoryCurrentItems = filteredData.slice(userhistoryIndexOfFirstItem, userhistoryIndexOfLastItem);
  const userhistoryTotalPages = Math.ceil(filteredData.length / userhistoryItemsPerPage);

  const handleUserhistoryPrev = () => {
    if (userhistoryCurrentPage > 1) {
      setUserhistoryCurrentPage(userhistoryCurrentPage - 1);
      setUserhistoryInputPage(userhistoryCurrentPage - 1);
    }
  };

  const handleUserhistoryNext = () => {
    if (userhistoryCurrentPage < userhistoryTotalPages) {
      setUserhistoryCurrentPage(userhistoryCurrentPage + 1);
      setUserhistoryInputPage(userhistoryCurrentPage + 1);
    }
  };

  const handleUserhistoryChange = (e) => {
    setUserhistoryInputPage(e.target.value);
  };

  const handleUserhistoryKeyDown = (e) => {
    if (e.key === 'Enter') {
      const page = Math.max(1, Math.min(userhistoryTotalPages, Number(userhistoryInputPage)));
      setUserhistoryCurrentPage(page);
      setUserhistoryInputPage(page);
    }
  };

  return (
    <div className="userhistory-table-container">
      <table className="userhistory-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>เลขที่ใบเบิก</th>
            <th>ประเภท</th>
            <th>จำนวนรายการ</th>
            <th>วันที่สร้าง</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {userhistoryCurrentItems.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>

              <td>
                {/* {row.number} */}
                <span
                  className="clickable-number"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    navigate("/user/confirm-history", { state: { item: row } }); // เปลี่ยนเป็น row
                  }}
                >
                  {row.number}
                </span>
              </td>

              <td>{row.category}</td>
              <td>{row.items}</td>
              <td>{row.date}</td>
              <td
                className={
                  row.status === "อนุมัติ"
                    ? "status-approved"
                    : row.status === "รับของเรียบร้อย"
                    ? "status-done"
                    : ""
                }
              >
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="userhistory-pagination">
        <div className="userhistory-pagination-info">
          แสดง {userhistoryIndexOfFirstItem + 1} ถึง{" "}
          {Math.min(userhistoryIndexOfLastItem, filteredData.length)} จาก{" "}
          {filteredData.length} แถว
        </div>
        <div className="userhistory-pagination-buttons">
          <button
            className="btn"
            disabled={userhistoryCurrentPage === 1}
            onClick={handleUserhistoryPrev}
          >
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="org-page-input"
            placeholder={`${userhistoryCurrentPage} / ${userhistoryTotalPages}`}
            value={userhistoryInputPage}
            min={1}
            max={userhistoryTotalPages}
            onFocus={() => setUserhistoryInputPage("")}
            onChange={handleUserhistoryChange}
            onKeyDown={handleUserhistoryKeyDown}
          />

          <button
            className="btn"
            disabled={userhistoryCurrentPage === userhistoryTotalPages}
            onClick={handleUserhistoryNext}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHistoryTable;
