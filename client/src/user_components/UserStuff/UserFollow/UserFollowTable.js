import React from 'react';
import './UserFollowTable.css';
import { FaPrint } from 'react-icons/fa'; // ใช้ไอคอนปริ๊น

function UserFollowTable() {
  const data = [
    {
      id: 1,
      number: "003-02/2568",
      category: "เบิกวัสดุ",
      items: 1,
      date: "12 ก.พ. 68",
      status: "รออนุมัติ"
    }
  ];

  return (
    <div className="userfollow-table-container">
      <table className="userfollow-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>เลขที่ใบเบิก</th>
            <th>ประเภท</th>
            <th>ปริ้น</th>
            <th>จำนวนรายการ</th>
            <th>วันที่สร้าง</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.number}</td>
              <td>{row.category}</td>
              <td className="print-icon"><FaPrint /></td>
              <td>{row.items}</td>
              <td>{row.date}</td>
              <td className="status-pending">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserFollowTable;
