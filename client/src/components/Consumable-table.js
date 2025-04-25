import React from "react";
import "./Consumable-table.css";

function Consumable_Table() {
  return (
    <div className="Table-Container">
      <table className="table-consumable">
        <thead>
          <tr>
            <th id="col-name">รหัส</th>
            <th id="col-name">รูปภาพ</th>
            <th id="col-name">รายการ</th>
            <th id="col-name">ยอดยกมา</th>
            <th id="col-name">ยอดต่ำสุด</th>
            <th id="col-name">ยอดสูงสุด</th>
            <th id="col-name">รับ</th>
            <th id="col-name">จ่าย</th>
            <th id="col-name">คงเหลือ</th>
          </tr>
        </thead>

        <tbody>
          {/* ---------------- MOCK ข้อมูลตาราง -------------------------- */}
          <tr>
            <td id="data-in-table">OF001</td>
            <td>
              <img src="https://via.placeholder.com/60" alt="Scotch" />
            </td>
            <td className="item-cell">
              <b>ชื่อ :</b> 3M Scotch เทปกาวสองหน้า...
              <br />
              หมวดหมู่ : วัสดุสำนักงาน
              <br />
              หน่วยนับ : ม้วน | คลังวัสดุ : วัสดุในคลัง
              <br />
              ราคา/หน่วย : 220
              <br />
              สถานะ : <span className="item-status">ใกล้หมดสต็อก!</span>
              <div className="item-actions">
                <a href="#" className="edit">
                  ✏ แก้ไข
                </a>
                <a href="#" className="adjust">
                  ปรับยอด
                </a>
              </div>
            </td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">5</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">1</td>
          </tr>
          {/* เพิ่มแถวอื่น ๆ ตามต้องการ */}

          <tr>
            <td id="data-in-table">OF002</td>
            <td>
              <img src="https://via.placeholder.com/60" alt="Scotch" />
            </td>
            <td className="item-cell">
              <b>ชื่อ :</b> 3M Scotch เทปกาวสองหน้า...
              <br />
              หมวดหมู่ : วัสดุสำนักงาน
              <br />
              หน่วยนับ : ม้วน | คลังวัสดุ : วัสดุในคลัง
              <br />
              ราคา/หน่วย : 220
              <br />
              สถานะ : <span className="item-status">ใกล้หมดสต็อก!</span>
              <div className="item-actions">
                <a href="#" className="edit">
                  ✏ แก้ไข
                </a>
                <a href="#" className="adjust">
                  ปรับยอด
                </a>
              </div>
            </td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">5</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">1</td>
          </tr>

          <tr>
            <td id="data-in-table">OF003</td>
            <td>
              <img src="https://via.placeholder.com/60" alt="Scotch" />
            </td>
            <td className="item-cell">
              <b>ชื่อ :</b> 3M Scotch เทปกาวสองหน้า...
              <br />
              หมวดหมู่ : วัสดุสำนักงาน
              <br />
              หน่วยนับ : ม้วน | คลังวัสดุ : วัสดุในคลัง
              <br />
              ราคา/หน่วย : 220
              <br />
              สถานะ : <span className="item-status">ใกล้หมดสต็อก!</span>
              <div className="item-actions">
                <a href="#" className="edit">
                  ✏ แก้ไข
                </a>
                <a href="#" className="adjust">
                  ปรับยอด
                </a>
              </div>
            </td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">5</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">1</td>
          </tr>

          <tr>
            <td id="data-in-table">OF004</td>
            <td>
              <img src="https://via.placeholder.com/60" alt="Scotch" />
            </td>
            <td className="item-cell">
              <b>ชื่อ :</b> 3M Scotch เทปกาวสองหน้า...
              <br />
              หมวดหมู่ : วัสดุสำนักงาน
              <br />
              หน่วยนับ : ม้วน | คลังวัสดุ : วัสดุในคลัง
              <br />
              ราคา/หน่วย : 220
              <br />
              สถานะ : <span className="item-status">ใกล้หมดสต็อก!</span>
              <div className="item-actions">
                <a href="#" className="edit">
                  ✏ แก้ไข
                </a>
                <a href="#" className="adjust">
                  ปรับยอด
                </a>
              </div>
            </td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">5</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">1</td>
          </tr>

           <tr>
            <td id="data-in-table">OF005</td>
            <td>
              <img src="https://via.placeholder.com/60" alt="Scotch" />
            </td>
            <td className="item-cell">
              <b>ชื่อ :</b> 3M Scotch เทปกาวสองหน้า...
              <br />
              หมวดหมู่ : วัสดุสำนักงาน
              <br />
              หน่วยนับ : ม้วน | คลังวัสดุ : วัสดุในคลัง
              <br />
              ราคา/หน่วย : 220
              <br />
              สถานะ : <span className="item-status">ใกล้หมดสต็อก!</span>
              <div className="item-actions">
                <a href="#" className="edit">
                  ✏ แก้ไข
                </a>
                <a href="#" className="adjust">
                  ปรับยอด
                </a>
              </div>
            </td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">1</td>
            <td id="data-in-table">5</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">2</td>
            <td id="data-in-table">1</td>
          </tr>    
{/* --------------------------Mock ข้อมูลตาราง-----------------------------------        */}

        </tbody>
      </table>

      <div className="pagination">
        <strong className="pagination-info">แสดง 1 ถึง 5 จาก 120 แถว</strong>
        <div className="pagination-buttons">
          <span className="disabled">ก่อนหน้า</span>
          <span className="current">1</span>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          ...
          <a href="#">24</a>
          <a href="#">ถัดไป</a>
        </div>
      </div>
    </div>
  );
}

export default Consumable_Table;
