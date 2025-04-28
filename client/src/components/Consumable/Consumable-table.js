import React from "react";
import "./Consumable-table.css";

function Consumable_Table() {
  return (
    <div className="Table-Contrainer">
      <table>
        <thead>
          <tr>
            <th>รหัส</th>
            <th>รูปภาพ</th>
            <th>รายการ</th>
            <th>ยอดยกมา</th>
            <th>ยอดต่ำสุด</th>
            <th>ยอดสูงสุด</th>
            <th>รับ</th>
            <th>จ่าย</th>
            <th>คงเหลือ</th>
          </tr>
        </thead>

        <tbody>
          {/* ---------------- MOCK ข้อมูลตาราง -------------------------- */}
          <tr>
            <td>OF001</td>
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
            <td>1</td>
            <td>1</td>
            <td>5</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
          </tr>
          {/* เพิ่มแถวอื่น ๆ ตามต้องการ */}
          <tr>
            <td>OF002</td>
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
            <td>1</td>
            <td>1</td>
            <td>5</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
          </tr>

          <tr>
            <td>OF003</td>
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
            <td>1</td>
            <td>1</td>
            <td>5</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
          </tr>

          <tr>
            <td>OF004</td>
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
            <td>1</td>
            <td>1</td>
            <td>5</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
          </tr>

          <tr>
            <td>OF005</td>
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
            <td>1</td>
            <td>1</td>
            <td>5</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
          </tr>
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