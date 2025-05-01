import React, { useState } from "react";
import "./UserStuff_table.css";

const mockData = [
  {code:"OF001",image:"https://via.placeholder.com/60",name:"แฟ้ม A4 สีฟ้า",category:"แฟ้มเอกสาร",remain:12},
  {code:"OF002",image:"https://via.placeholder.com/60",name:"ดินสอ 2B HB",category:"เครื่องเขียน",remain:30},
  {code:"OF003",image:"https://via.placeholder.com/60",name:"ยางลบขนาดเล็ก",category:"เครื่องเขียน",remain:18},
  {code:"OF004",image:"https://via.placeholder.com/60",name:"ปากกาเจลสีน้ำเงิน",category:"เครื่องเขียน",remain:25},
  {code:"OF005",image:"https://via.placeholder.com/60",name:"Pentax ไบด์คัตเตอร์ขนาดใหญ่ L150",category:"วัสดุสำนักงาน",remain:5},
  {code:"OF006",image:"https://via.placeholder.com/60",name:"กล่องใส่เอกสารพลาสติก",category:"แฟ้มเอกสาร",remain:10},
  {code:"OF007",image:"https://via.placeholder.com/60",name:"คลิปหนีบกระดาษ 33 มม.",category:"เครื่องเขียน",remain:50},
  {code:"OF008",image:"https://via.placeholder.com/60",name:"เครื่องเจาะกระดาษ 2 รู",category:"เครื่องใช้สำนักงาน",remain:7},
  {code:"OF009",image:"https://via.placeholder.com/60",name:"Scotch เทปกาว 2 หน้า 1.6 มม.กว้าง 21 มม. ยาว 5 ม.",category:"วัสดุสำนักงาน",remain:10},
  {code:"OF010",image:"https://via.placeholder.com/60",name:'Scotch เทปเยื่อกาว 2 หน้า 18 มม.x20 หลา (3/4" 3M)',category:"วัสดุสำนักงาน",remain:8},
  {code:"OF011",image:"https://via.placeholder.com/60",name:"Scotch เทปเยื่อกาว 2 หน้า 24 มม.x10 หลา",category:"วัสดุสำนักงาน",remain:7},
  {code:"OF012",image:"https://via.placeholder.com/60",name:"ถุงซิปล็อกใส 5x7 นิ้ว",category:"วัสดุสำนักงาน",remain:60},
  {code:"OF013",image:"https://via.placeholder.com/60",name:"Unitape 1/2 IN x 36 YDS. สลิตถนอมใส (ม้วนเล็ก)",category:"วัสดุสำนักงาน",remain:31},
  {code:"OF014",image:"https://via.placeholder.com/60",name:"Unitape 3/4 IN x 36 YDS. สลิตถนอมใส (ใหญ่)",category:"วัสดุสำนักงาน",remain:20},
  {code:"OF015",image:"https://via.placeholder.com/60",name:"Whiteboard Monomi สีดำ",category:"วัสดุสำนักงาน",remain:10},
  {code:"OF016",image:"https://via.placeholder.com/60",name:"แผ่นรองตัด A3",category:"เครื่องใช้สำนักงาน",remain:4},
  {code:"OF017",image:"https://via.placeholder.com/60",name:"กล่องเอกสาร 3 ช่อง",category:"แฟ้มเอกสาร",remain:6},
  {code:"OF018",image:"https://via.placeholder.com/60",name:"กรรไกร ขนาด 8 นิ้ว",category:"วัสดุสำนักงาน",remain:4},
  {code:"OF019",image:"https://via.placeholder.com/60",name:"กระดาษโน้ตสี 3x3 นิ้ว",category:"กระดาษ",remain:35},
  {code:"OF020",image:"https://via.placeholder.com/60",name:"กระดาษ A3 Double A",category:"วัสดุสำนักงาน",remain:7}
];

const itemsPerPage = 5;

function UserStuff_Table() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");

  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="table-container-userstuff">
      <table className="userstuff-table">
        <thead>
          <tr>
            <th>รหัส</th>
            <th>รูปภาพ</th>
            <th>รายการ</th>
            <th>จำนวนที่สามารถเบิกได้</th>
            <th>ทำรายการ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.code}</td>
              <td><img src={item.image} alt={item.name} className="stuff-image" /></td>
              <td>
                <b>ชื่อ :</b> {item.name}<br />
                หมวดหมู่ : {item.category}
              </td>
              <td>{item.remain}</td>
              <td><button className="select-btn">เลือก</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="userstuff-pagination-wrapper">
        <div className="userstuff-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, mockData.length)} จาก {mockData.length} แถว
        </div>
        <div className="userstuff-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>ก่อนหน้า</button>

          <input
            type="number"
            className="userstuff-page-input"
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

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default UserStuff_Table;
