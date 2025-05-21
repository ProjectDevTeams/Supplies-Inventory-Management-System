import { useState, useEffect } from "react";
import axios from "axios";
import "./UserStuff_table.css";
import StuffItemPopup from "../UserPopup/StuffItem_Popup";
import { API_URL } from "../../config";

// จำนวนรายการต่อหน้า
const itemsPerPage = 5;

function UserStuff_Table({ searchTerm = "", basketItems, setBasketItems }) {
  // เก็บรายการวัสดุจาก API
  const [materials, setMaterials] = useState([]);
  // เก็บหน้าปัจจุบัน
  const [currentPage, setCurrentPage] = useState(1);
  // สำหรับเก็บค่าที่กรอกในกล่อง input หน้า
  const [inputPage, setInputPage] = useState("");
  // วัสดุที่ถูกเลือก (ใช้เปิด popup)
  const [selectedItem, setSelectedItem] = useState(null);
  // สำหรับโหลดสถานะข้อมูล
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลวัสดุเมื่อโหลด component
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`${API_URL}/materials/get_materials.php`);
        if (res.data.status === "success") {
          setMaterials(res.data.data); // เซ็ตข้อมูลที่ได้จาก API
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดวัสดุ:", error);
      } finally {
        setLoading(false); // ปิดสถานะโหลด
      }
    };
    fetchMaterials();
  }, []);

  // กรองข้อมูลตามคำค้นหาจากชื่อ, id, หมวดหมู่ หรือจำนวนคงเหลือ
  const filteredData = materials.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.remain.toString().includes(searchTerm)
  );

  // คำนวณจำนวนหน้า
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // คำนวณตำแหน่งของข้อมูลที่จะเอาไปแสดงในหน้านี้
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // แสดงข้อความขณะโหลดข้อมูล
  if (loading) return <div className="userstuff-loading">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="userstuff-table-container">
      {/* ตารางแสดงรายการวัสดุ */}
      <table className="userstuff-table">
        <thead>
          <tr>
            <th>รหัส</th>
            <th>รูปภาพ</th>
            <th>รายการ</th>
            <th>จำนวนคงเหลือ</th>
            <th>ทำรายการ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                {/* โหลดรูปจาก path image ที่ได้จาก API */}
                <img src={`${API_URL}/${item.image}`} alt={item.name} className="stuff-image" />
              </td>
              <td>
                <b>ชื่อ :</b> <span className="item-name">{item.name}</span>
                <br />
                <span className="userstuff-category">
                  หมวดหมู่ : {item.category}
                </span>
              </td>
              <td>{item.remain}</td>
              <td>
                {/* ปุ่มเลือกวัสดุเพื่อเปิด popup */}
                <button
                  className="userstuff-select-btn"
                  onClick={() => setSelectedItem(item)}
                >
                  เลือก
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* แสดงข้อมูลแบ่งหน้า */}
      <div className="userstuff-pagination-wrapper">
        <div className="userstuff-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง{" "}
          {Math.min(indexOfLastItem, filteredData.length)} จาก{" "}
          {filteredData.length} แถว
        </div>
        <div className="userstuff-pagination-buttons">
          {/* ปุ่มย้อนกลับหน้า */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ก่อนหน้า
          </button>

          {/* กล่องกรอกเลขหน้า */}
          <input
            type="number"
            className="userstuff-page-input"
            value={inputPage}
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

          {/* ปุ่มไปหน้าถัดไป */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ถัดไป
          </button>
        </div>
      </div>

      {/* แสดง popup เมื่อเลือกวัสดุ */}
      {selectedItem && (
        <StuffItemPopup
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={(item, quantity) => {
            // ถ้าวัสดุนี้อยู่ในตะกร้าแล้ว → เพิ่มจำนวน
            const existing = basketItems.find((i) => i.id === item.id);
            if (existing) {
              setBasketItems((prev) =>
                prev.map((i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
                )
              );
            } else {
              // ถ้ายังไม่มี → เพิ่มใหม่
              setBasketItems((prev) => [...prev, { ...item, quantity }]);
            }
            setSelectedItem(null); // ปิด popup หลังทำรายการ
          }}
        />
      )}
    </div>
  );
}

export default UserStuff_Table;
