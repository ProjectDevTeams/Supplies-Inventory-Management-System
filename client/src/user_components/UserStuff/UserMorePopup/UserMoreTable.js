import React, { useState, useEffect } from "react";
import "./UserMoreTable.css";

function UserMoreTable({ searchTerm = "" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [inputPage, setInputPage] = useState("");

  useEffect(() => {
    // ✅ ใช้ mock data แทนการเรียก API
    const mock = [
      {
        requester: "สมชาย ใจดี",
        date: "2025-05-10",
        status: "อนุมัติ",
      },
      {
        requester: "สุภาวดี พูนสุข",
        date: "2025-05-12",
        status: "รออนุมัติ",
      },
      {
        requester: "ทศพล อินทร์ใจดี",
        date: "2025-05-13",
        status: "ไม่อนุมัติ",
      },
      {
        requester: "จิราพร จันทร์เพ็ญ",
        date: "2025-05-14",
        status: "อนุมัติ",
      },
      {
        requester: "บุญช่วย ชาญกิจ",
        date: "2025-05-15",
        status: "รออนุมัติ",
      },
      {
        requester: "ดาราวรรณ เพ็ชรรุ่ง",
        date: "2025-05-16",
        status: "ไม่อนุมัติ",
      },
    ];

    const formatted = mock.map((item, index) => ({
      id: index + 1,
      requester: item.requester,
      date: formatDateThai(item.date),
      status: item.status,
    }));

    setData(formatted);
    setLoading(false);

    // 🔁 ถ้าจะใช้ API จริงให้ uncomment ด้านล่าง
    /*
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost/api/user_more_data.php");
        if (res.data.status === "success") {
          const mapped = res.data.data.map((item, index) => ({
            id: index + 1,
            requester: item.requester,
            date: formatDateThai(item.date),
            status: item.status,
          }));
          setData(mapped);
        }
      } catch (error) {
        console.error("โหลดข้อมูลผิดพลาด:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    */
  }, []);

  const formatDateThai = (dateStr) => {
    const date = new Date(dateStr);
    const monthNames = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

  const filteredData = data.filter(
    (row) =>
      row.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const page = parseInt(inputPage);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        setInputPage("");
      }
    }
  };

  if (loading) return <div className="user-more-loading">กำลังโหลด...</div>;

  return (
    <div className="user-more-table-container">
      <table className="user-more-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ผู้ขอจัดซื้อ</th>
            <th>วันที่ขอจัดซื้อ</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="4" className="user-more-no-data">
                ไม่พบข้อมูล
              </td>
            </tr>
          ) : (
            currentItems.map((row, idx) => (
              <tr key={idx}>
                <td>{row.id}</td>
                <td>{row.requester}</td>
                <td>{row.date}</td>
                <td className={`status-${row.status.toLowerCase()}`}>{row.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="user-more-pagination">
        <div className="user-more-pagination-info">
          แสดง {indexOfFirst + 1} ถึง {Math.min(indexOfLast, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="user-more-pagination-buttons">
          <button className="btn" onClick={handlePrev} disabled={currentPage === 1}>ก่อนหน้า</button>
          <input
            type="number"
            min={1}
            max={totalPages}
            placeholder={`${currentPage} / ${totalPages}`}
            className="org-page-input"
            value={inputPage}
            onChange={handlePageChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setInputPage("")}
          />
          <button className="btn" onClick={handleNext} disabled={currentPage === totalPages}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default UserMoreTable;
