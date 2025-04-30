import React, { useState } from "react";
import "./Report-Content.css";
import ReportMaterialRemain from "./Report-MaterialRemain";
import ReportReceive from "./Report-Receive";
import ReportAnnual from "./Report-Annual";
import ReportIssue from "./Report-Issue";
import ReportLowStock from "./Report-LowStock";

function ReportContent() {
  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const years = ["2565", "2566", "2567"];
  const warehouses = ["ทั้งหมด", "วัสดุในคลัง", "วัสดุนอกคลัง"];

  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [warehouse, setWarehouse] = useState("ทั้งหมด");

  const [showResult, setShowResult] = useState(false);
  const [currentReport, setCurrentReport] = useState("");

  const handleSearch = () => {
    setShowResult(true);
  };

  const handleReportClick = (reportType) => {
    setCurrentReport(reportType);
    setShowResult(false);
  };

  const reportNames = {
    remain: "รายงานยอดคงเหลือวัสดุ",
    receive: "รายงานการรับเข้า",
    annual: "รายงานรายจ่ายประจำปี",
    issue: "รายงานการเบิก-จ่าย",
    lowstock: "รายงานวัสดุใกล้หมดสต็อก"
  };

  return (
    <div className="report-bar">
      <div className="report-title">
        รายงาน{currentReport ? ` / ${reportNames[currentReport]}` : ""}
      </div>

      <div className="report-controls">
        <button className="report-btn report-blue" onClick={() => handleReportClick("remain")}>
          รายงานยอดคงเหลือวัสดุ
        </button>
        <button className="report-btn report-purple" onClick={() => handleReportClick("receive")}>
          รายงานการรับเข้า
        </button>
        <button className="report-btn report-orange" onClick={() => handleReportClick("annual")}>
          รายงานรายจ่ายประจำปี
        </button>
        <button className="report-btn report-yellow" onClick={() => handleReportClick("issue")}>
          รายงานการเบิก-จ่าย
        </button>
        <button className="report-btn report-red" onClick={() => handleReportClick("lowstock")}>
          รายงานวัสดุใกล้หมดสต็อก
        </button>
      </div>

      {currentReport && (
        <div className="report-search">
          <div className="report-search-row">
            <div className="report-search-group">
              <label>ตั้งแต่</label>
              <div className="report-dropdowns">
                <select value={fromMonth} onChange={(e) => setFromMonth(e.target.value)}>
                  <option>เลือกเดือน</option>
                  {months.map((month) => <option key={month}>{month}</option>)}
                </select>
                <select value={fromYear} onChange={(e) => setFromYear(e.target.value)}>
                  <option>เลือกปี</option>
                  {years.map((year) => <option key={year}>{year}</option>)}
                </select>
              </div>
            </div>

            <div className="report-search-group">
              <label>คลังวัสดุ</label>
              <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
                {warehouses.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div className="report-search-row">
            <div className="report-search-group">
              <label>จนถึง</label>
              <div className="report-dropdowns">
                <select value={toMonth} onChange={(e) => setToMonth(e.target.value)}>
                  <option>เลือกเดือน</option>
                  {months.map((month) => <option key={month}>{month}</option>)}
                </select>
                <select value={toYear} onChange={(e) => setToYear(e.target.value)}>
                  <option>เลือกปี</option>
                  {years.map((year) => <option key={year}>{year}</option>)}
                </select>
              </div>
            </div>

            <div className="report-search-button">
              <button className="report-btn-search" onClick={handleSearch}>ค้นหา</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ แสดงผลแต่ละรายงาน */}
      {showResult && currentReport === "remain" && <ReportMaterialRemain />}
      {showResult && currentReport === "receive" && <ReportReceive />}
      {showResult && currentReport === "annual" && <ReportAnnual />}
      {showResult && currentReport === "issue" && <ReportIssue />}
      {showResult && currentReport === "lowstock" && <ReportLowStock />}
    </div>
  );
}

export default ReportContent;
