import React, { useState } from 'react';
import './UserFollowTable.css';
import { FaPrint } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function UserFollowTable({ searchTerm = "" }) {
  const navigate = useNavigate();

  const initialData = [
    {
      id: 1, number: "003-02/2568", category: "เบิกวัสดุ", items: 1, date: "12 ก.พ. 68",
      status: "รออนุมัติ", status_user: "รอรับของ"
    },
    {
      id: 2, number: "004-02/2568", category: "เบิกวัสดุ", items: 3, date: "13 ก.พ. 68",
      status: "รออนุมัติ", status_user: "รอรับของ"
    },
  ];

  const [data, setData] = useState(initialData);

  const handleStatusUserChange = (id, newStatus) => {
    const updatedData = data.map(item =>
      item.id === id ? { ...item, status_user: newStatus } : item
    );
    setData(updatedData);
  };

  const filteredData = data.filter((row) =>
    row.id.toString().includes(searchTerm) ||
    row.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.items.toString().includes(searchTerm) ||
    row.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [userfollowCurrentPage, setUserfollowCurrentPage] = useState(1);
  const [userfollowItemsPerPage] = useState(5);
  const [userfollowInputPage, setUserfollowInputPage] = useState(1);

  const userfollowIndexOfLastItem = userfollowCurrentPage * userfollowItemsPerPage;
  const userfollowIndexOfFirstItem = userfollowIndexOfLastItem - userfollowItemsPerPage;
  const userfollowCurrentItems = filteredData.slice(userfollowIndexOfFirstItem, userfollowIndexOfLastItem);
  const userfollowTotalPages = Math.ceil(filteredData.length / userfollowItemsPerPage);

  const handleUserfollowPrev = () => {
    if (userfollowCurrentPage > 1) {
      setUserfollowCurrentPage(userfollowCurrentPage - 1);
      setUserfollowInputPage(userfollowCurrentPage - 1);
    }
  };

  const handleUserfollowNext = () => {
    if (userfollowCurrentPage < userfollowTotalPages) {
      setUserfollowCurrentPage(userfollowCurrentPage + 1);
      setUserfollowInputPage(userfollowCurrentPage + 1);
    }
  };

  const handleUserfollowChange = (e) => {
    setUserfollowInputPage(e.target.value);
  };

  const handleUserfollowKeyDown = (e) => {
    if (e.key === 'Enter') {
      const page = Math.max(1, Math.min(userfollowTotalPages, Number(userfollowInputPage)));
      setUserfollowCurrentPage(page);
      setUserfollowInputPage(page);
    }
  };

  return (
    <div className="userfollow-table-container">
      <table className="user-follow-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>เลขที่ใบเบิก</th>
            <th>ประเภท</th>
            <th>จำนวนรายการ</th>
            <th>วันที่สร้าง</th>
            <th>สถานะ</th>
            <th>สถานะผู้ใช้</th>
            <th>ปริ้น</th>
          </tr>
        </thead>
        <tbody>
          {userfollowCurrentItems.length === 0 ? (
            <tr>
              <td colSpan="8" className="userfollow-no-data">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            userfollowCurrentItems.map((row) => (
              <tr
                key={row.id}
                className="userfollow-row"
                onClick={() => navigate("/user/confirm-status")}
              >
                <td>{row.id}</td>
                <td>{row.number}</td>
                <td>{row.category}</td>
                <td>{row.items}</td>
                <td>{row.date}</td>
                <td className={
                  row.status === "อนุมัติแล้ว" ? "status-approved" :
                    row.status === "รออนุมัติ" ? "status-pending" :
                      row.status === "รอดำเนินการ" ? "status-processing" :
                        row.status === "ไม่อนุมัติ" ? "status-cancelled" : ""
                }>
                  {row.status}
                </td>
                <td>
                  <select
                    value={row.status_user}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusUserChange(row.id, e.target.value)}
                    className={
                      row.status_user === "รอรับของ" ? "status-pending-items" :
                        row.status_user === "รับของเรียบร้อย" ? "status-receive-items" : ""
                    }
                  >
                    <option className="select-option1" value="รอรับของ">รอรับของ</option>
                    <option className="select-option2" value="รับของเรียบร้อย">รับของเรียบร้อย</option>
                  </select>
                </td>
                <td className="print-icon" onClick={(e) => e.stopPropagation()}><FaPrint /></td>
              </tr>
            ))
          )}
        </tbody>

      </table>

      <div className="userfollow-pagination">
        <div className="userfollow-pagination-info">
          แสดง {userfollowIndexOfFirstItem + 1} ถึง {Math.min(userfollowIndexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="userfollow-pagination-buttons">
          <button className="btn" disabled={userfollowCurrentPage === 1} onClick={handleUserfollowPrev}>
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="org-page-input"
            placeholder={`${userfollowCurrentPage} / ${userfollowTotalPages}`}
            value={userfollowInputPage}
            min={1}
            max={userfollowTotalPages}
            onFocus={() => setUserfollowInputPage('')}
            onChange={handleUserfollowChange}
            onKeyDown={handleUserfollowKeyDown}
          />
          <button className="btn" disabled={userfollowCurrentPage === userfollowTotalPages} onClick={handleUserfollowNext}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserFollowTable;
