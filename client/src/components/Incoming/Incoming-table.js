// File: src/components/Incoming/Incoming-table.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import "./Incoming-table.css";

const thaiMonths = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.",
  "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
  "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];

function formatThaiDateDMY(dmy) {
  const [dd, mm, yyyy] = dmy.split("-");
  const day = dd.padStart(2, "0");
  const month = thaiMonths[parseInt(mm, 10) - 1];
  const year = (parseInt(yyyy, 10) + 543).toString();
  return `${day} ${month} ${year}`;
}

export default function IncomingTable({ searchTerm = "" }) {
  const [data, setData] = useState([]);
  const [incomingCurrentPage, setIncomingCurrentPage] = useState(1);
  const [incomingInputPage, setIncomingInputPage] = useState("");
  const [incomingAsc, setIncomingAsc] = useState(true);
  const incomingItemsPerPage = 5;
  const navigate = useNavigate();

  // ฟังก์ชันจัดรูปวันที่จาก 'YYYY-MM-DD' → 'DD-MM-YYYY'
  const formatDate = (d) => (d ? d.split("-").reverse().join("-") : "-");

  // fetch data
  useEffect(() => {
    axios
      .get(`${API_URL}/receive_materials/get_receives.php`)
      .then((res) => {
        if (res.data.status === "success") {
          const formatted = res.data.data.map((item) => ({
            id: item.id,
            company: item.company_name || "-",
            po: item.purchase_order_number || "-",
            created_by: item.created_by || "-",
            created_at: formatDate(item.created_at),
            amount: parseFloat(item.total_price) || 0,
            status: item.status || "-"        // เพิ่มสถานะจาก API
          }));
          setData(formatted);
        }
      })
      .catch((err) => console.error("API fetch error:", err));
  }, []);

  // sort
  const sortedData = [...data].sort((a, b) =>
    incomingAsc ? a.id - b.id : b.id - a.id
  );

  // filter
  const filteredData = sortedData.filter((item) =>
    [item.company, item.po, item.created_by, item.created_at, item.amount, item.status]
      .some((field) =>
        field
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
  );

  // pagination
  const totalPages = Math.ceil(filteredData.length / incomingItemsPerPage);
  const indexOfLastItem = incomingCurrentPage * incomingItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - incomingItemsPerPage;
  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const toggleSort = () => setIncomingAsc((prev) => !prev);
  const handleNextPage = () =>
    incomingCurrentPage < totalPages &&
    setIncomingCurrentPage((p) => p + 1);
  const handlePrevPage = () =>
    incomingCurrentPage > 1 && setIncomingCurrentPage((p) => p - 1);

  return (
    <div className="incoming-container">
      <div className="incoming-description">ตารางการรับเข้าวัสดุ</div>
      <table className="incoming-table">
        <thead>
          <tr>
            <th className="incoming-sortable-header" onClick={toggleSort}>
              ลำดับ {incomingAsc ? "▲" : "▼"}
            </th>
            <th>บริษัท/ร้านค้า</th>
            <th>เลขที่ มอ.</th>
            <th>ผู้สร้าง</th>
            <th>วันที่สร้าง</th>
            <th>ยอดซื้อรวม</th>
            <th>สถานะ</th>  {/* เพิ่มคอลัมน์ สถานะ */}
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="7" className="incoming-no-data">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr
                key={item.id}
                className="incoming-tr"
                onClick={() => navigate(`/incoming/detail/${item.id}`)}
              >
                <td>{item.id}</td>
                <td>{item.company}</td>
                <td>{item.po}</td>
                <td>{item.created_by}</td>
                <td>{formatThaiDateDMY(item.created_at)}</td>
                <td>{item.amount.toLocaleString()}</td>
                <td>{item.status}</td> {/* แสดงสถานะ */}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="incoming-pagination-wrapper">
        <div className="incoming-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง{" "}
          {Math.min(indexOfLastItem, filteredData.length)} จาก{" "}
          {filteredData.length} แถว
        </div>
        <div className="incoming-pagination-buttons">
          <button
            className="incoming-btn"
            disabled={incomingCurrentPage === 1}
            onClick={handlePrevPage}
          >
            ก่อนหน้า
          </button>
          <input
            type="text"
            className="incoming-page-input"
            placeholder={
              incomingInputPage === ""
                ? `${incomingCurrentPage} / ${totalPages}`
                : ""
            }
            value={incomingInputPage}
            onFocus={() => setIncomingInputPage("")}
            onChange={(e) => setIncomingInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const p = parseInt(incomingInputPage, 10);
                if (!isNaN(p) && p >= 1 && p <= totalPages) {
                  setIncomingCurrentPage(p);
                }
                setIncomingInputPage("");
                e.target.blur();
              }
            }}
          />
          <button
            className="incoming-btn"
            disabled={incomingCurrentPage === totalPages}
            onClick={handleNextPage}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}
