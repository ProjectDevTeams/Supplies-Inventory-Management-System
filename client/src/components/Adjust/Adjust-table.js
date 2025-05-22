import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import "./Adjust-table.css";

function AdjustTable({ searchTerm }) {
  const navigate = useNavigate();
  const location = useLocation();

  // สถานะของข้อมูลตาราง, การโหลด, การแบ่งหน้า และการเรียง
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 10;

  // โหลดข้อมูลจาก API เมื่อ component mount หรือมีการ reload
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${API_URL}/adjustment_items/get_adjustment_items.php`);
        const adjustments = res.data?.data || [];

        // รวมข้อมูลตาม adjustment_id (ไม่แสดงซ้ำ)
        const grouped = adjustments.map(adj => ({
          id: adj.id,
          full_name: adj.full_name,
          created_date: adj.created_date,
          status: adj.status,
          items: adj.items || []
        }));

        setAdjustments(grouped);
        setLoading(false);
      } catch (err) {
        console.error("❌ โหลดข้อมูลล้มเหลว:", err);
      }
    };

    fetchAll();
  }, [location.state?.reload]);

  // กรองข้อมูลจาก searchTerm
  const filteredData = adjustments.filter(item =>
    item.id.toString().includes(searchTerm.toLowerCase()) ||
    (item.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.created_date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // เรียงลำดับข้อมูลตาม adjustment_id
  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id
  );

  // คำนวณหน้าปัจจุบัน
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // เปลี่ยนหน้า
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // เปลี่ยนการเรียงลำดับ
  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // กลับไปหน้าแรกหลังเปลี่ยนการเรียง
  };

  // reset กล่องพิมพ์หมายเลขหน้าเมื่อเปลี่ยนหน้า
  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  // แสดงวันที่พร้อม subtext
  const formatDateWithSubtext = (dateStr) => {
    if (!dateStr) return "--";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return d.toLocaleDateString("th-TH", options);
  };

  if (loading) return <div style={{ padding: "2rem" }}>🔄 กำลังโหลดข้อมูล...</div>;

  return (
    <div className="adjustment-table-container">
      <div className="adjustment-table-description">ตารางประวัติการปรับยอด</div>

      {/* ตารางแสดงข้อมูลการปรับยอด */}
      <table id="adjustment-table">
        <thead id="adjustment-thead">
          <tr className="adjustment-tr">
            <th className="adjustment-th" onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
              ลำดับ {sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th className="adjustment-th">ผู้สร้าง</th>
            <th className="adjustment-th">วันที่สร้าง</th>
            <th className="adjustment-th">สถานะ</th>
          </tr>
        </thead>
        <tbody id="adjustment-tbody">
          {currentItems.length > 0 ? (
            currentItems.map(item => (
              <tr
                key={item.id}
                className="adjustment-tr"
                onClick={() => navigate(`/adjust/balance/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td className="adjustment-td">{item.id}</td>
                <td className="adjustment-td">{item.full_name || `ID: ${item.created_by}`}</td>
                <td className="adjustment-td">{formatDateWithSubtext(item.created_date)}</td>
                <td
                  className="adjustment-td"
                  style={{
                    fontWeight: "bold",
                    color:
                      item.status === "อนุมัติ"
                        ? "#2d7a3e"     // เขียว
                        : item.status === "ไม่อนุมัติ"
                        ? "#e63946"     // แดง
                        : "#d48b00"     // ส้ม/เหลือง (รออนุมัติ)
                  }}
                >
                  {item.status || "รออนุมัติ"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="adjust-no-data" colSpan="4">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="adjust-pagination-wrapper">
        <div className="adjust-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedData.length)} จาก {sortedData.length} แถว
        </div>
        <div className="adjust-pagination-buttons">
          <button disabled={currentPage === 1} onClick={handlePrevPage}>ก่อนหน้า</button>
          <input
            type="number"
            className="adjust-page-input"
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
          <button disabled={currentPage === totalPages} onClick={handleNextPage}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default AdjustTable;
