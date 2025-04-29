import React, { useState } from "react";
import "./Adjust-table.css";

const mockAdjustData = [
  {
    id: 1172,
    from: "วัสดุในคลัง",
    company: "ศูนย์โครงการวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    orderDate: "21 พ.ย. 66",
    state: "อนุมัติ",
  },
  {
    id: 1173,
    from: "วัสดุในคลัง",
    company: "ศูนย์โครงการวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม",
    orderDate: "21 พ.ย. 66",
    state: "อนุมัติ",
  },
  {
    id: 1174,
    from: "วัสดุในคลัง",
    company: "บริษัท เอ บี ซี จำกัด",
    orderDate: "22 พ.ย. 66",
    state: "ไม่อนุมัติ",
  },
  {
    id: 1175,
    from: "วัสดุในคลัง",
    company: "บริษัท ดี อี เอฟ จำกัด",
    orderDate: "22 พ.ย. 66",
    state: "ไม่อนุมัติ",
  },
  {
    id: 1176,
    from: "วัสดุในคลัง",
    company: "บริษัท เอ็ม เอ็น โอ จำกัด",
    orderDate: "23 พ.ย. 66",
    state: "อนุมัติ",
  },
  {
    id: 1177,
    from: "วัสดุในคลัง",
    company: "บริษัท พี คิว อาร์ จำกัด",
    orderDate: "24 พ.ย. 66",
    state: "อนุมัติ",
  },
  {
    id: 1178,
    from: "วัสดุในคลัง",
    company: "บริษัท พี คิว อาร์ จำกัด",
    orderDate: "24 พ.ย. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1179,
    from: "วัสดุในคลัง",
    company: "บริษัท พี คิว อาร์ จำกัด",
    orderDate: "24 พ.ย. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1180,
    from: "วัสดุในคลัง",
    company: "บริษัท พี คิว อาร์ จำกัด",
    orderDate: "24 พ.ย. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1181,
    from: "วัสดุในคลัง",
    company: "บริษัท พี คิว อาร์ จำกัด",
    orderDate: "24 พ.ย. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1182,
    from: "วัสดุในคลัง",
    company: "บริษัท เอ บี ซี จำกัด",
    orderDate: "25 พ.ย. 66",
    state: "อนุมัติ",
  },
  {
    id: 1183,
    from: "วัสดุในคลัง",
    company: "บริษัท ดี อี เอฟ จำกัด",
    orderDate: "26 พ.ย. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1184,
    from: "วัสดุในคลัง",
    company: "บริษัท เอ็ม เอ็น โอ จำกัด",
    orderDate: "27 พ.ย. 66",
    state: "อนุมัติ",
  },
  {
    id: 1185,
    from: "วัสดุในคลัง",
    company: "บริษัท พี คิว อาร์ จำกัด",
    orderDate: "28 พ.ย. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1186,
    from: "วัสดุในคลัง",
    company: "บริษัท เอ บี ซี จำกัด",
    orderDate: "29 พ.ย. 66",
    state: "อนุมัติ",
  },
  {
    id: 1187,
    from: "วัสดุในคลัง",
    company: "บริษัท ดี อี เอฟ จำกัด",
    orderDate: "30 พ.ย. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1188,
    from: "วัสดุในคลัง",
    company: "บริษัท เอ็ม เอ็น โอ จำกัด",
    orderDate: "1 ธ.ค. 66",
    state: "อนุมัติ",
  },
  {
    id: 1189,
    from: "วัสดุในคลัง",
    company: "บริษัท พี คิว อาร์ จำกัด",
    orderDate: "2 ธ.ค. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1190,
    from: "วัสดุในคลัง",
    company: "บริษัท เอ บี ซี จำกัด",
    orderDate: "3 ธ.ค. 66",
    state: "อนุมัติ",
  },
  {
    id: 1191,
    from: "วัสดุในคลัง",
    company: "บริษัท ดี อี เอฟ จำกัด",
    orderDate: "4 ธ.ค. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1192,
    from: "วัสดุในคลัง",
    company: "บริษัท เอ็ม เอ็น โอ จำกัด",
    orderDate: "5 ธ.ค. 66",
    state: "อนุมัติ",
  },
  {
    id: 1193,
    from: "วัสดุในคลัง",
    company: "บริษัท พี คิว อาร์ จำกัด",
    orderDate: "6 ธ.ค. 66",
    state: "รออนุมัติ",
  },
  {
    id: 1194,
    from: "วัสดุในคลัง",
    company: "บริษัท เอ บี ซี จำกัด",
    orderDate: "7 ธ.ค. 66",
    state: "อนุมัติ",
  },
  {
    id: 1195,
    from: "วัสดุในคลัง",
    company: "บริษัท ดี อี เอฟ จำกัด",
    orderDate: "8 ธ.ค. 66",
    state: "รออนุมัติ",
  },
];

// ------------------------Mock Data-------------------------


function AdjustTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc"); // เพิ่มสถานะการเรียง (เริ่มที่ "desc")
  const itemsPerPage = 10;

  // ✅ เรียงข้อมูลตามสถานะปัจจุบัน (มากไปน้อย หรือ น้อยไปมาก)
  const sortedData = [...mockAdjustData].sort((a, b) => {
    return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ✅ ฟังก์ชันสลับการเรียง id
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // รีเซ็ตไปหน้าแรกเสมอเมื่อสลับ
  };

  return (
    <div className="adjustment-table-container">
      <table id="adjustment-table">
        <thead id="adjustment-thead">
          <tr className="adjustment-tr">
            <th
              className="adjustment-th"
              onClick={toggleSortOrder}
              style={{ cursor: "pointer" }}
            >
              ลำดับ {sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th className="adjustment-th">จากคลัง</th>
            <th className="adjustment-th">บริษัท/ร้านค้า</th>
            <th className="adjustment-th">วันที่ซื้อ</th>
            <th className="adjustment-th">สถานะ</th>
          </tr>
        </thead>
        <tbody id="adjustment-tbody">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id} className="adjustment-tr">
                <td className="adjustment-td">{item.id}</td>
                <td className="adjustment-td">{item.from}</td>
                <td className="adjustment-td">{item.company}</td>
                <td className="adjustment-td">{item.orderDate}</td>

                <td
                  className={`adjustment-td ${
                    item.state === "อนุมัติ"
                      ? "status-approved"
                      : item.state === "รออนุมัติ"
                      ? "status-pending"
                      : "status-not-pending"
                  }`}
                >
                  {item.state}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="adjustment-td" colSpan="5">
                ไม่มีข้อมูลในหน้านี้
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-adjust">
        <strong className="pagination-info-adjust">
          แสดง {indexOfFirstItem + 1} ถึง{" "}
          {Math.min(indexOfLastItem, sortedData.length)} จาก {sortedData.length}{" "}
          แถว
        </strong>

        <div className="pagination-buttons-adjust">
          {/* ปุ่ม ก่อนหน้า */}
          {currentPage > 1 ? (
            <a href="#" onClick={handlePrevPage}>
              ก่อนหน้า
            </a>
          ) : (
            <span className="disabled-adjust">ก่อนหน้า</span>
          )}

          {/* เลขหน้าแบบย่อ */}
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter((page) => {
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              );
            })
            .map((page, idx, arr) => (
              <React.Fragment key={page}>
                {idx > 0 && page - arr[idx - 1] > 1 && (
                  <span className="ellipsis">...</span>
                )}
                <a
                  href="#"
                  className={currentPage === page ? "current-adjust" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </a>
              </React.Fragment>
            ))}

          {/* ปุ่ม ถัดไป */}
          {currentPage < totalPages ? (
            <a href="#" onClick={handleNextPage}>
              ถัดไป
            </a>
          ) : (
            <span className="disabled-adjust">ถัดไป</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdjustTable;
