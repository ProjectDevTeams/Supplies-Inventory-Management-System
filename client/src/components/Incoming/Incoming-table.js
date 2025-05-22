import { useNavigate } from "react-router-dom";
import { useIncomingTable } from "./useIncomingTable";
import "./Incoming-table.css";

export default function IncomingTable({ searchTerm = "" }) {
  const navigate = useNavigate();
  const {
    currentItems,
    totalPages,
    currentPage,
    inputPage,
    asc,
    formatThaiDateDMY,
    statusClass,
    setInputPage,
    setAsc,
    goToPage,
  } = useIncomingTable(searchTerm, 5);

  return (
    <div className="incoming-container">
      <div className="incoming-description">ตารางการรับเข้าวัสดุ</div>

      <table className="incoming-table">
        <thead>
          <tr>
            <th
              className="incoming-sortable-header"
              onClick={() => setAsc((a) => !a)}
            >
              ลำดับ {asc ? "▲" : "▼"}
            </th>
            {[
              "บริษัท/โครงการ",
              "เลขที่ มอ.",
              "ผู้สร้าง",
              "วันที่สร้าง",
              "ยอดซื้อรวม",
              "สถานะ",
            ].map((h, i) => (
              <th key={i}>{h}</th>
            ))}
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
                <td>
                  <span className={statusClass(item.status)}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="incoming-pagination-wrapper">
        <div className="incoming-pagination-info">
          แสดง {(currentPage - 1) * 5 + 1} ถึง{" "}
          {Math.min(currentPage * 5, totalPages * 5)} จาก {totalPages * 5} แถว
        </div>
        <div className="incoming-pagination-buttons">
          <button
            className="incoming-btn"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            ก่อนหน้า
          </button>
          <input
            type="text"
            className="incoming-page-input"
            placeholder={`${currentPage} / ${totalPages}`}
            value={inputPage}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToPage(parseInt(inputPage, 10));
            }}
          />
          <button
            className="incoming-btn"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}
