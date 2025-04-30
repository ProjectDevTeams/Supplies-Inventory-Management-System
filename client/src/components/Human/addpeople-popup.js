import React from "react";
import "./addpeople-popup.css";

function AddpeoplePopup({ onClose }) {  // รับ prop onClose เพื่อปิด Popup
  return (
    <div className="popup-container">
      <div className="popup-box">
        <div className="popup-header blue">
          <span>เพิ่มเจ้าหน้าที่ใหม่</span>
          {/* คลิกปุ่มกากบาทเพื่อปิด Popup */}
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="popup-body">
          <form>
            <div className="form-grid">
              <div className="form-row">
                <label>username</label>
                <input type="text" />
              </div>
              <div className="form-row">
                <label>รหัสผ่าน</label>
                <input type="password" />
              </div>
              <div className="form-row">
                <label>ชื่อ-สกุล</label>
                <input type="text" />
              </div>
              <div className="form-row">
                <label>ตำแหน่งงาน</label>
                <input type="text" />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="form-row">
                <label>โทรศัพท์</label>
                <input type="text" />
              </div>
              <div className="form-row">
                <label>สิทธิการใช้งาน</label>
                <select>
                  <option value="">เลือกสิทธิการใช้งาน</option>
                  <option value="admin">STI</option>
                  <option value="user">แอดมิน ฝ่าย STI</option>
                  <option value="user">ประชาสัมพันธ์และสื่อสารองค์กร</option>
                  <option value="user">ฝ่ายยุทธศาสตร์และแผน</option>
                </select>
              </div>
            </div>
            <div className="form-footer right">
              <button type="submit" className="submit-btn green">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddpeoplePopup;
