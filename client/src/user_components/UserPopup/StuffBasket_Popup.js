import React from 'react';
import './StuffBasket_Popup.css';

const StuffBasket_Popup = ({ onClose }) => {
  return (
    <div className="stuff-popup-overlay">
      <div className="stuff-popup">
        <div className="stuff-popup-header">
          <span className="stuff-popup-title">ยืนยันรายการ</span>
          <button className="stuff-popup-close" onClick={onClose}>×</button>
        </div>
        <div className="stuff-popup-body">
          <div className="stuff-info-grid">
            <div><label>ชื่อ</label><input type="text" value="นางสาวเพลิงดาว วิยา" readOnly /></div>
            <div><label>สังกัด</label><input type="text" value="STI" readOnly /></div>
            <div><label>เบิกจำนวน</label><input type="text" value="1 รายการ" readOnly /></div>
            <div><label>คลัง</label><input type="text" value="วัสดุในคลัง" readOnly /></div>
            <div><label>เพื่อใช้ในงาน/กิจกรรม</label><input type="text" readOnly /></div>
            <div><label>หัวหน้างาน</label>
              <select disabled>
                <option>หัวหน้างาน</option>
              </select>
            </div>
          </div>

          <div className="stuff-table-section">
            <h3>รายการวัสดุ</h3>
            <table className="stuff-material-table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รายการ</th>
                  <th>จำนวน/หน่วยนับ</th>
                  <th>มูลค่า</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Pentax ใบมีดคัตเตอร์ใหญ่ L150</td>
                  <td>2 กล่อง</td>
                  <td>22.00</td>
                </tr>
                <tr>
                  <td colSpan="2">รวม</td>
                  <td>1 รายการ</td>
                  <td>22.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="stuff-popup-footer">
          <button className="confirm-button">ยืนยัน</button>
        </div>
      </div>
    </div>
  );
};

export default StuffBasket_Popup;