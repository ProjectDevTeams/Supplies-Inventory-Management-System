import React from "react";
import "./addnew-popup.css";

function AddnewPopup({ onClose }) {  // ✅ รับ onClose จาก props
  return (
    <div className="popup-container">
      <div className="popup-box">
        <div className="popup-header">
          <span>เพิ่มรายการใหม่</span>

          {/* ✅ ปุ่มปิด */}
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="popup-body">
          <form>
            <div className="form-row">
              <label>ชื่อ</label>
              <input type="text" />
            </div>

            <div className="form-row">
              <label>ประเภท</label>
              <select>
                <option value="">ประเภท</option>
                <option value="office">วัสดุสำนักงาน</option>
                <option value="safety">วัสดุความปลอดภัย</option>
              </select>
            </div>

            <div className="form-row">
              <label>หน่วยนับ</label>
              <input list="units" name="unit" />
              <datalist id="units">
                <option value="กระป๋อง" />
                <option value="กระปุก" />
                <option value="ก้อน" />
                <option value="กิโลกรัม" />
                <option value="แกลลอน" />
                <option value="ขวด" />
                <option value="คู่" />
                <option value="เครื่อง" />
              </datalist>
            </div>

            <div className="form-row">
              <label>คลังวัสดุ</label>
              <select>
                <option value="">เลือกคลังวัสดุ</option>
                <option value="inside">วัสดุในคลัง</option>
                <option value="outside">วัสดุนอกคลัง</option>
              </select>
            </div>

            <div className="form-row">
              <label>ยอดยกมา</label>
              <input type="number" />
            </div>

            <div className="form-row">
              <label>ยอดต่ำสุด</label>
              <input type="number" />
            </div>

            <div className="form-row">
              <label>ยอดสูงสุด</label>
              <input type="number" />
            </div>

            <div className="form-row">
              <label>ราคา/หน่วย</label>
              <input type="number" />
            </div>

            <div className="form-row file-upload">
              <label>แนบไฟล์ภาพ</label>
              <div className="upload-group">
                <small>ขนาดไฟล์สูงสุด 5MB</small>
                <label htmlFor="fileUpload" className="custom-file-btn">เลือกไฟล์</label>
                <input type="file" id="fileUpload" className="file-hidden" />
              </div>
            </div>

            <div className="form-row">
              <label>วันที่สร้าง</label>
              <input type="date" />
            </div>

            <div className="form-footer">
              <button type="submit" className="submit-btn">ยืนยัน</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddnewPopup;
