// UserMoreTable.js
import React, { useState, useEffect } from "react";
import "./UserMoreTable.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";

function UserMoreTable({ searchTerm = "" }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [asc, setAsc] = useState(true);
  const perPage = 5;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const fullName = storedUser?.full_name;
      const res = await axios.get(`${API_URL}/purchase_extras/get_purchase_extras.php`);
      if (res.data.status === "success") {
        const filtered = res.data.data.filter(
          item => String(item.created_by) === String(fullName)
        );
        const formatted = filtered.map(item => ({
          id: parseInt(item.id, 10),
          requester: item.created_by,
          date: item.created_date,
          status:
            item.approval_status === "อนุมัติ"
              ? "approved"
              : item.approval_status === "ไม่อนุมัติ"
              ? "rejected"
              : "pending",
        }));
        setData(formatted);
      }
    } catch (err) {
      console.error("โหลดข้อมูลล้มเหลว:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderStatus = st =>
    ({ pending: "รออนุมัติ", approved: "อนุมัติ", rejected: "ไม่อนุมัติ" }[st] || "-");

  const formatThaiDate = dateString => {
    const date = new Date(dateString);
    const thMonths = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
    ];
    return `${date.getDate()} ${thMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

  // sort & filter
  const sorted = [...data].sort((a, b) => (asc ? a.id - b.id : b.id - a.id));
  const filtered = sorted.filter(
    item =>
      item.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatThaiDate(item.date).includes(searchTerm) ||
      renderStatus(item.status).includes(searchTerm)
  );

  // pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const indexOfFirstItem = (page - 1) * perPage;
  const indexOfLastItem = page * perPage;
  const items = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const toggleSort = () => setAsc(prev => !prev);
  const prev = () => {
    if (page > 1) {
      setPage(p => p - 1);
      setInput("");
    }
  };
  const next = () => {
    if (page < totalPages) {
      setPage(p => p + 1);
      setInput("");
    }
  };
  const onKey = e => {
    if (e.key === "Enter") {
      const v = Number(input);
      if (v >= 1 && v <= totalPages) setPage(v);
      e.target.blur();
    }
  };

  return (
    <div className="user-more-table-container">
      <table className="user-more-table">
        <thead>
          <tr>
            <th onClick={toggleSort} style={{ cursor: "pointer" }}>
              ลำดับ {asc ? "▲" : "▼"}
            </th>
            <th>ผู้ขอจัดซื้อ</th>
            <th>วันที่ขอจัดซื้อ</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="4" className="user-more-no-data">ไม่พบข้อมูล</td>
            </tr>
          ) : (
            items.map(i => (
              <tr
                key={i.id}
                className="user-more-table-row"
                onClick={() => navigate("/userstuff/more/detail", { state: { id: i.id } })}
                style={{ cursor: "pointer" }}
              >
                <td>{i.id}</td>
                <td>{i.requester}</td>
                <td>{formatThaiDate(i.date)}</td>
                <td className={`status status-${i.status}`}>{renderStatus(i.status)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="user-more-table-pagination-wrapper">
        <div className="user-more-table-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง{" "}
          {Math.min(indexOfLastItem, filtered.length)} จาก {filtered.length} แถว
        </div>
        <div className="user-more-table-pagination-buttons">
          <button disabled={page === 1} onClick={prev}>ก่อนหน้า</button>
          <input
            type="number"
            className="user-more-table-page-input"
            min={1}
            max={totalPages}
            value={input}
            placeholder={`${page} / ${totalPages}`}
            onFocus={() => setInput("")}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
          />
          <button disabled={page === totalPages} onClick={next}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default UserMoreTable;
