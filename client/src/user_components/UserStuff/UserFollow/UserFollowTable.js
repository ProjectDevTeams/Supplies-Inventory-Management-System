import React, { useState } from 'react';
import './UserFollowTable.css';
import { FaPrint } from 'react-icons/fa';

function UserFollowTable({ searchTerm = "" }) {
  const data = [
    {
      id: 1,
      number: "003-02/2568",
      category: "เบิกวัสดุ",
      items: 1,
      date: "12 ก.พ. 68",
      status: "รออนุมัติ"
    },
    {
      id: 2,
      number: "004-02/2568",
      category: "เบิกวัสดุ",
      items: 3,
      date: "13 ก.พ. 68",
      status: "อนุมัติแล้ว"
    },
    {
      id: 3,
      number: "005-02/2568",
      category: "เบิกวัสดุ",
      items: 2,
      date: "14 ก.พ. 68",
      status: "รอดำเนินการ"
    },
    {
      id: 4,
      number: "006-02/2568",
      category: "เบิกวัสดุ",
      items: 5,
      date: "15 ก.พ. 68",
      status: "รออนุมัติ"
    },
    {
      id: 5,
      number: "007-02/2568",
      category: "เบิกวัสดุ",
      items: 4,
      date: "16 ก.พ. 68",
      status: "ไม่อนุมัติ"
    },
    {
      id: 6,
      number: "008-02/2568",
      category: "เบิกวัสดุ",
      items: 1,
      date: "17 ก.พ. 68",
      status: "รออนุมัติ"
    },
    {
      id: 7,
      number: "007-02/2568",
      category: "เบิกวัสดุ",
      items: 2,
      date: "3 ก.พ. 68",
      status: "อนุมัติแล้ว"
    },
    {
      id: 8,
      number: "008-02/2568",
      category: "เบิกวัสดุ",
      items: 1,
      date: "7 ก.พ. 68",
      status: "รออนุมัติ"
    },
    {
      id: 9,
      number: "009-02/2568",
      category: "เบิกวัสดุ",
      items: 4,
      date: "10 ก.พ. 68",
      status: "ไม่อนุมัติ"
    },
    {
      id: 10,
      number: "010-02/2568",
      category: "เบิกวัสดุ",
      items: 3,
      date: "12 ก.พ. 68",
      status: "อนุมัติแล้ว"
    },
    {
      id: 11,
      number: "011-02/2568",
      category: "เบิกวัสดุ",
      items: 5,
      date: "14 ก.พ. 68",
      status: "รออนุมัติ"
    },
    {
      id: 12,
      number: "012-02/2568",
      category: "เบิกวัสดุ",
      items: 2,
      date: "17 ก.พ. 68",
      status: "ไม่อนุมัติ"
    },
    {
      id: 13,
      number: "013-02/2568",
      category: "เบิกวัสดุ",
      items: 1,
      date: "19 ก.พ. 68",
      status: "อนุมัติแล้ว"
    },
    {
      id: 14,
      number: "014-02/2568",
      category: "เบิกวัสดุ",
      items: 3,
      date: "21 ก.พ. 68",
      status: "รออนุมัติ"
    },
    {
      id: 15,
      number: "015-02/2568",
      category: "เบิกวัสดุ",
      items: 6,
      date: "23 ก.พ. 68",
      status: "อนุมัติแล้ว"
    },
  ];

  // ✅ กรองข้อมูลจากทุกช่อง
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
            <th>ปริ้น</th>
          </tr>
        </thead>
        <tbody>
          {userfollowCurrentItems.map((row) => (
            <tr key={row.id}>
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
              <td className="print-icon"><FaPrint /></td>
            </tr>
          ))}
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
