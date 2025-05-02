import React, { useState, useEffect } from "react";
import "./Adjust-table.css";

const mockAdjustData = [
  { id: 1172, from: "วัสดุในคลัง", company: "ศูนย์โครงการวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "21 พ.ย. 66", state: "อนุมัติ" },
  { id: 1173, from: "วัสดุในคลัง", company: "ศูนย์โครงการวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม", orderDate: "21 พ.ย. 66", state: "อนุมัติ" },
  { id: 1174, from: "วัสดุในคลัง", company: "บริษัท เอ บี ซี จำกัด", orderDate: "22 พ.ย. 66", state: "ไม่อนุมัติ" },
  { id: 1175, from: "วัสดุในคลัง", company: "บริษัท ดี อี เอฟ จำกัด", orderDate: "22 พ.ย. 66", state: "ไม่อนุมัติ" },
  { id: 1176, from: "วัสดุในคลัง", company: "บริษัท เอ็ม เอ็น โอ จำกัด", orderDate: "23 พ.ย. 66", state: "อนุมัติ" },
  { id: 1177, from: "วัสดุในคลัง", company: "บริษัท พี คิว อาร์ จำกัด", orderDate: "24 พ.ย. 66", state: "อนุมัติ" },
  { id: 1178, from: "วัสดุในคลัง", company: "บริษัท พี คิว อาร์ จำกัด", orderDate: "24 พ.ย. 66", state: "รออนุมัติ" },
  { id: 1179, from: "วัสดุในคลัง", company: "บริษัท พี คิว อาร์ จำกัด", orderDate: "24 พ.ย. 66", state: "รออนุมัติ" },
  { id: 1180, from: "วัสดุในคลัง", company: "บริษัท พี คิว อาร์ จำกัด", orderDate: "24 พ.ย. 66", state: "รออนุมัติ" },
  { id: 1181, from: "วัสดุในคลัง", company: "บริษัท พี คิว อาร์ จำกัด", orderDate: "24 พ.ย. 66", state: "รออนุมัติ" },
  { id: 1182, from: "วัสดุในคลัง", company: "บริษัท เอ บี ซี จำกัด", orderDate: "25 พ.ย. 66", state: "อนุมัติ" },
  { id: 1183, from: "วัสดุในคลัง", company: "บริษัท ดี อี เอฟ จำกัด", orderDate: "26 พ.ย. 66", state: "รออนุมัติ" },
  { id: 1184, from: "วัสดุในคลัง", company: "บริษัท เอ็ม เอ็น โอ จำกัด", orderDate: "27 พ.ย. 66", state: "อนุมัติ" },
  { id: 1185, from: "วัสดุในคลัง", company: "บริษัท พี คิว อาร์ จำกัด", orderDate: "28 พ.ย. 66", state: "รออนุมัติ" },
  { id: 1186, from: "วัสดุในคลัง", company: "บริษัท เอ บี ซี จำกัด", orderDate: "29 พ.ย. 66", state: "อนุมัติ" },
  { id: 1187, from: "วัสดุในคลัง", company: "บริษัท ดี อี เอฟ จำกัด", orderDate: "30 พ.ย. 66", state: "รออนุมัติ" },
  { id: 1188, from: "วัสดุในคลัง", company: "บริษัท เอ็ม เอ็น โอ จำกัด", orderDate: "1 ธ.ค. 66", state: "อนุมัติ" },
  { id: 1189, from: "วัสดุในคลัง", company: "บริษัท พี คิว อาร์ จำกัด", orderDate: "2 ธ.ค. 66", state: "รออนุมัติ" },
  { id: 1190, from: "วัสดุในคลัง", company: "บริษัท เอ บี ซี จำกัด", orderDate: "3 ธ.ค. 66", state: "อนุมัติ" },
  { id: 1191, from: "วัสดุในคลัง", company: "บริษัท ดี อี เอฟ จำกัด", orderDate: "4 ธ.ค. 66", state: "รออนุมัติ" },
  { id: 1192, from: "วัสดุในคลัง", company: "บริษัท เอ็ม เอ็น โอ จำกัด", orderDate: "5 ธ.ค. 66", state: "อนุมัติ" },
  { id: 1193, from: "วัสดุในคลัง", company: "บริษัท พี คิว อาร์ จำกัด", orderDate: "6 ธ.ค. 66", state: "รออนุมัติ" },
  { id: 1194, from: "วัสดุในคลัง", company: "บริษัท เอ บี ซี จำกัด", orderDate: "7 ธ.ค. 66", state: "อนุมัติ" },
  { id: 1195, from: "วัสดุในคลัง", company: "บริษัท ดี อี เอฟ จำกัด", orderDate: "8 ธ.ค. 66", state: "รออนุมัติ" },
  

];

function AdjustTable({ searchTerm }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 10;

  const filteredData = mockAdjustData.filter((item) =>
    item.id.toString().includes(searchTerm.toLowerCase()) ||
    item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.orderDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  return (
    <div className="adjustment-table-container">
      <table id="adjustment-table">
        <thead id="adjustment-thead">
          <tr className="adjustment-tr">
            <th className="adjustment-th" onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
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
                <td className={`adjustment-td ${
                  item.state === "อนุมัติ"
                    ? "status-approved"
                    : item.state === "รออนุมัติ"
                    ? "status-pending"
                    : "status-not-pending"
                }`}>
                  {item.state}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="adjustment-td" colSpan="5">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
                  setInputPage("");
                }
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
