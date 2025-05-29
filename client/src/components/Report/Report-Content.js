import React, { useState, useEffect } from "react";
import "./Report-Content.css";
import ReportMaterialRemain from "./Report-MaterialRemain";
import ReportReceive from "./Report-Receive";
import ReportIssue from "./Report-Issue";
import ReportAdjust from "./Report-Adjust";
import ReportLowStock from "./Report-LowStock";
import axios from "axios";
import { API_URL } from "../../config";

function isDateRangeValid(fromMonth, fromYear, toMonth, toYear) {
  if (!(fromMonth && fromYear && toMonth && toYear)) return true;
  const idx = name => [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ].indexOf(name) + 1;
  const f = new Date(`${parseInt(fromYear) - 543}-${idx(fromMonth)}-01`);
  const t = new Date(`${parseInt(toYear) - 543}-${idx(toMonth)}-01`);
  return f <= t;
}

export default function ReportContent() {
  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม",
    "สิงหาคม", "กันยายน", "ตุลาคม",
    "พฤศจิกายน", "ธันวาคม"
  ];
  const currentBuddhistYear = new Date().getFullYear() + 543;
  const years = [];
  for (let y = 2565; y <= currentBuddhistYear; y++) years.push(String(y));
  const warehouses = ["ทั้งหมด", "วัสดุในคลัง", "วัสดุนอกคลัง"];

  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [warehouse, setWarehouse] = useState("ทั้งหมด");
  const [showResult, setShowResult] = useState(false);
  const [currentReport, setCurrentReport] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [lowStockCount, setLowStockCount] = useState(0);

  // ✅ โหลดจำนวนวัสดุใกล้หมดสต็อกทันทีที่เข้า
  useEffect(() => {
    const fetchLowStockCount = async () => {
      try {
        const res = await axios.get(`${API_URL}/materials/get_materials.php`);
        if (res.data.status === "success") {
          const filtered = res.data.data.filter(item =>
            item.status === "วัสดุใกล้หมดสต็อก"
          );
          setLowStockCount(filtered.length);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลวัสดุใกล้หมดสต็อก:", error);
      }
    };
    fetchLowStockCount();
  }, []);

  const handleSearch = () => {
    if (!isDateRangeValid(fromMonth, fromYear, toMonth, toYear)) {
      alert("ช่วงวันที่ไม่ถูกต้อง: 'ตั้งแต่' ต้องไม่เกิน 'จนถึง'");
      return;
    }
    setShowResult(true);
    setTriggerSearch(true);
  };

  const handleClear = () => {
    setFromMonth("");
    setFromYear("");
    setToMonth("");
    setToYear("");
    setWarehouse("ทั้งหมด");
    setShowResult(false);
    setTriggerSearch(false);
  };

  const handleReportClick = reportType => {
    setCurrentReport(reportType);
    setShowResult(false);
    setTriggerSearch(false);
  };

  const reportNames = {
    remain: "รายงานยอดคงเหลือวัสดุ",
    receive: "รายงานการรับเข้าวัสดุ",
    issue: "รายงานการเบิกวัสดุ",
    adjust: "รายงานการปรับยอด",
    lowstock: "รายงานวัสดุใกล้หมดสต็อก"
  };

  return (
    <div className="report-bar-container">
      <div className="report-bar">
        <div className="report-title">
          รายงาน{currentReport ? ` / ${reportNames[currentReport]}` : ""}
        </div>

        <div className="report-controls">
          <button className="report-btn report-blue" onClick={() => handleReportClick("remain")}>รายงานยอดคงเหลือวัสดุ</button>
          <button className="report-btn report-yellow" onClick={() => handleReportClick("issue")}>รายงานการเบิกวัสดุ</button>
          <button className="report-btn report-purple" onClick={() => handleReportClick("receive")}>รายงานการรับเข้าวัสดุ</button>
          <button className="report-btn report-green" onClick={() => handleReportClick("adjust")}>รายงานการปรับยอด</button>
          <button className="report-btn report-red" onClick={() => handleReportClick("lowstock")}>
            รายงานวัสดุใกล้หมดสต็อก จำนวน {lowStockCount.toLocaleString()} รายการ
          </button>
        </div>

        {currentReport && (
          <div className="report-search">
            {currentReport !== "lowstock" && (
              <>
                <div className="report-search-row">
                  <div className="report-search-group">
                    <label>ตั้งแต่</label>
                    <div className="report-dropdowns">
                      <select value={fromMonth} onChange={e => setFromMonth(e.target.value)}>
                        <option>เลือกเดือน</option>
                        {months.map(m => <option key={m}>{m}</option>)}
                      </select>
                      <select value={fromYear} onChange={e => setFromYear(e.target.value)}>
                        <option>เลือกปี</option>
                        {years.map(y => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="report-search-row">
                  <div className="report-search-group">
                    <label>จนถึง</label>
                    <div className="report-dropdowns">
                      <select value={toMonth} onChange={e => setToMonth(e.target.value)}>
                        <option>เลือกเดือน</option>
                        {months.map(m => <option key={m}>{m}</option>)}
                      </select>
                      <select value={toYear} onChange={e => setToYear(e.target.value)}>
                        <option>เลือกปี</option>
                        {years.map(y => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="report-search-row">
              {currentReport !== "issue" && (
                <div className="report-search-group">
                  <label>คลังวัสดุ</label>
                  <select value={warehouse} onChange={e => setWarehouse(e.target.value)}>
                    {warehouses.map(w => <option key={w}>{w}</option>)}
                  </select>
                </div>
              )}
              <div className="report-search-button">
                <button className="report-btn-search" onClick={handleSearch}>ค้นหา</button>
                <button className="report-btn-clear" onClick={handleClear}>ล้าง</button>
              </div>
            </div>
          </div>
        )}

        {showResult && currentReport === "remain" && (
          <ReportMaterialRemain
            warehouse={warehouse}
            fromMonth={fromMonth}
            fromYear={fromYear}
            toMonth={toMonth}
            toYear={toYear}
            triggerSearch={triggerSearch}
            onSearchHandled={() => setTriggerSearch(false)}
          />
        )}
        {showResult && currentReport === "receive" && (
          <ReportReceive
            warehouse={warehouse}
            fromMonth={fromMonth}
            fromYear={fromYear}
            toMonth={toMonth}
            toYear={toYear}
          />
        )}
        {showResult && currentReport === "issue" && (
          <ReportIssue
            warehouse={warehouse}
            fromMonth={fromMonth}
            fromYear={fromYear}
            toMonth={toMonth}
            toYear={toYear}
          />
        )}
        {showResult && currentReport === "adjust" && (
          <ReportAdjust
            warehouse={warehouse}
            fromMonth={fromMonth}
            fromYear={fromYear}
            toMonth={toMonth}
            toYear={toYear}
          />
        )}
        {showResult && currentReport === "lowstock" && (
          <ReportLowStock
            warehouse={warehouse}
            setLowStockCount={setLowStockCount}
          />
        )}
      </div>
    </div>
  );
}
