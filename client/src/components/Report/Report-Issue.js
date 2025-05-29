import React, { useState, useEffect } from "react";
import "./Report-Issue.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import { API_URL } from "../../config";

const thaiMonths = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

export default function ReportIssue({ warehouse, fromMonth, fromYear, toMonth, toYear }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 10;

  const monthNameToNumber = name => {
    const full = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
    return full.indexOf(name) + 1;
  };

  const formatToThaiDate = dateStr => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2,"0");
    const m = d.getMonth();
    const year = d.getFullYear() + 543;
    return `${day} ${thaiMonths[m]} ${year}`;
  };

  useEffect(() => {
    axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`).then(res => {
      if (res.data.status === "success" && Array.isArray(res.data.data)) {
        const fromDate = fromMonth && fromYear
          ? new Date(`${parseInt(fromYear)-543}-${monthNameToNumber(fromMonth)}-01`)
          : null;
        const toDate = toMonth && toYear
          ? new Date(`${parseInt(toYear)-543}-${monthNameToNumber(toMonth)}-31`)
          : null;
        const filtered = res.data.data.filter(item => {
          const createdAt = new Date(item.created_at);
          const okWare = warehouse==="ทั้งหมด"||item.stock_type===warehouse;
          const okFrom = !fromDate||createdAt>=fromDate;
          const okTo = !toDate||createdAt<=toDate;
          return okWare&&okFrom&&okTo;
        });
        const flat = filtered.flatMap(item =>
          (item.items||[]).map(mat => ({
            code: item.running_code,
            created_by: item.created_by,
            name: mat.name,
            quantity: mat.quantity,
            price: mat.total_price,
            date: formatToThaiDate(item.created_at)
          }))
        );
        setData(flat);
      }
    });
  }, [warehouse,fromMonth,fromYear,toMonth,toYear]);

  const totalPages = Math.ceil(data.length/itemsPerPage);
  const idxLast = currentPage*itemsPerPage;
  const idxFirst = idxLast-itemsPerPage;
  const shown = data.slice(idxFirst,idxLast);

  useEffect(() => { setInputPage(""); },[currentPage]);

  const exportToExcel = () => {
    const header = [["ลำดับ","เลขที่","ชื่อผู้ขอเบิก","ชื่อวัสดุ","จำนวน","มูลค่า","วันที่เบิกวัสดุ"]];
    const rows = data.map((it,i)=>[
      i+1,it.code,it.created_by,it.name,it.quantity,Math.round(it.price),it.date
    ]);
    const ws = XLSX.utils.aoa_to_sheet([...header,...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"รายงานการเบิกวัสดุ");
    const buf = XLSX.write(wb,{bookType:"xlsx",type:"array"});
    saveAs(new Blob([buf],{type:"application/octet-stream"}),"รายงานการเบิกวัสดุ.xlsx");
  };

  return (
    <div className="report-issue-container">
      <div className="report-issue-export-wrapper">
        <button onClick={exportToExcel} className="report-issue-export-btn">
          <img src="/image/excel-icon.png" alt="Export" className="excel-icon"/>
          <span>Export Excel</span>
        </button>
      </div>
      <table className="report-issue-table">
        <thead>
          <tr>
            <th>ลำดับ</th><th>เลขที่</th><th>ชื่อผู้ขอเบิก</th>
            <th>ชื่อวัสดุ</th><th>จำนวน</th><th>มูลค่า</th><th>วันที่เบิกวัสดุ</th>
          </tr>
        </thead>
        <tbody>{shown.map((item,i)=>(
          <tr key={i}>
            <td>{idxFirst+i+1}</td>
            <td>{item.code}</td>
            <td>{item.created_by}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price.toLocaleString()}</td>
            <td>{item.date}</td>
          </tr>
        ))}</tbody>
      </table>
      <div className="report-issue-pagination-wrapper">
        <div className="report-issue-pagination-info">
          แสดง {idxFirst+1} ถึง {Math.min(idxLast,data.length)} จาก {data.length} แถว
        </div>
        <div className="report-issue-pagination-buttons">
          <button disabled={currentPage===1} onClick={()=>setCurrentPage(currentPage-1)}>ก่อนหน้า</button>
          <input
            type="number"
            className="report-issue-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            onFocus={()=>setInputPage("")}
            onChange={e=>setInputPage(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"){const v=parseInt(inputPage,10);if(v>=1&&v<=totalPages)setCurrentPage(v);e.target.blur();}}}
            placeholder={`${currentPage} / ${totalPages}`}
          />
          <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(currentPage+1)}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}
