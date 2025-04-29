import React from "react";
import "./Report-Content.css";

function ReportContent() {
  return (
    <div className="report-bar">
      <div className="report-title">รายงาน</div>

      <div className="report-controls">
        <button className="report-btn report-blue">รายงานยอดคงเหลือวัสดุ</button>
        <button className="report-btn report-purple">รายงานการรับเข้า</button>
        <button className="report-btn report-orange">รายงานรายจ่ายประจำปี</button>
        <button className="report-btn report-yellow">รายงานการเบิก-จ่าย</button>
        <button className="report-btn report-red">รายงานวัสดุใกล้หมดสต็อก</button>
      </div>

      {/* ส่วนฟอร์มค้นหา */}
      <div className="report-search">
        <div className="report-search-row">
          <div className="report-search-group">
            <label>ตั้งแต่</label>
            <div className="report-dropdowns">
              <select>
                <option>เลือกเดือน</option>
              </select>
              <select>
                <option>เลือกปี</option>
              </select>
            </div>
          </div>

          <div className="report-search-group">
            <label>คลังวัสดุ</label>
            <select>
              <option>ทั้งหมด</option>
            </select>
          </div>
        </div>

        <div className="report-search-row">
          <div className="report-search-group">
            <label>จนถึง</label>
            <div className="report-dropdowns">
              <select>
                <option>เลือกเดือน</option>
              </select>
              <select>
                <option>เลือกปี</option>
              </select>
            </div>
          </div>

          <div className="report-search-button">
            <button className="report-btn-search">ค้นหา</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportContent;
