import { useState, useEffect } from "react";
import axios from "axios";
import "./Consumable-table.css";
import AddnewPopup from "./addnew-popup";
import Consumable from "./Consumablebar";
import { API_URL } from "../../config";

const itemsPerPage = 5;

function Consumable_Table({ searchTerm, setSearchTerm }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [inputPage, setInputPage] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    axios
      .get(`${API_URL}/materials/get_materials.php`)
      .then((r) => {
        if (r.data.status === "success") {
          setData(
            r.data.data.map((item) => ({
              ...item,
              image: item.image,
              id: String(item.id),
              price: parseFloat(item.price),
            }))
          );
        }
      })
      .catch(console.error);
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === "id") {
      valA = parseInt(valA, 10);
      valB = parseInt(valB, 10);
    }
    if (typeof valA === "number") {
      return sortAsc ? valA - valB : valB - valA;
    } else {
      return sortAsc
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
  });

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  return (
    <div className="table-container-consumable">
      <Consumable
        onAddClick={() => setShowPopup(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <table className="consumable-table">
        <thead className="consumable-thead">
          <tr className="consumable-thead-row">
            <th className="consumable-th" onClick={() => { setSortBy("id"); setSortAsc((p) => !p); }}>
              ลำดับ {sortBy === "id" ? (sortAsc ? "▲" : "▼") : "▲"}
            </th>
            <th className="consumable-th">รูปภาพ</th>
            <th className="consumable-th">รายการ</th>
            <th className="consumable-th">ยอดยกมา</th>
            <th className="consumable-th">ยอดต่ำสุด</th>
            <th className="consumable-th">ยอดสูงสุด</th>
            <th className="consumable-th">รับ</th>
            <th className="consumable-th">จ่าย</th>
            <th className="consumable-th">คงเหลือ</th>
          </tr>
        </thead>
        <tbody className="consumable-tbody">
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="9" className="consumable-no-data">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            currentItems.map((item, idx) => (
              <tr key={idx} className="consumable-tr">
                <td className="consumable-td">{item.id}</td>
                <td className="consumable-td">
                  <img
                    src={
                      item.image
                        ? `${API_URL}/${item.image}`
                        : "https://via.placeholder.com/60"
                    }
                    alt={item.name}
                    className="consumable-image"
                  />
                </td>
                <td className="item-cell consumable-td">
                  <b>ชื่อ :</b> {item.name}
                  <br />
                  หมวดหมู่ : {item.category}
                  <br />
                  หน่วยนับ : {item.unit} | คลังวัสดุ : {item.location}
                  <br />
                  ราคา/หน่วย : {item.price}
                  <br />
                  สถานะ :{" "}
                  <span
                    className={`item-status ${
                      item.status.includes("วัสดุใกล้หมดสต็อก")
                        ? "low-stock"
                        : "in-stock"
                    }`}
                  >
                    {item.status}
                  </span>
                  <div className="item-actions">
                    <button type="button" className="consumable-edit">
                      ✏ แก้ไข
                    </button>
                  </div>
                </td>
                <td className="consumable-td">{item.carry_over_quantity}</td>
                <td className="consumable-td">{item.low}</td>
                <td className="consumable-td">{item.high}</td>
                <td className="consumable-td">{item.brought}</td>
                <td className="consumable-td">{item.issued_quantity}</td>
                <td className="consumable-td">{item.remain}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showPopup && <AddnewPopup onClose={() => setShowPopup(false)} />}

      <div className="consumable-pagination-wrapper">
        <div className="consumable-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง{" "}
          {Math.min(indexOfLastItem, data.length)} จาก {data.length} แถว
        </div>
        <div className="consumable-pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="consumable-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            placeholder={`${currentPage} / ${totalPages}`}
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
          />
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default Consumable_Table;
