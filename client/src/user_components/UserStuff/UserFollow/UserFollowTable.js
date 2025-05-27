import React, { useState, useEffect, useCallback } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Select from "react-select";
import Swal from 'sweetalert2';
import { FaPrint } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import "./UserFollowTable.css";

function UserFollowTable({ searchTerm = "" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const username = user?.username;

      const res = await axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`, {
        params: { username },
      });

      if (res.data.status === "success") {
        const mapped = res.data.data.map((item) => ({
          id: item.id,
          number: item.running_code,
          category: "เบิกวัสดุ",
          items: item.items.length,
          date: formatDateThai(item.created_at),
          status: item.Admin_status,
          status_user: item.User_status,
        }));
        setData(mapped);
      }
    } catch (err) {
      console.error("โหลดข้อมูลผิดพลาด:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const formatDateThai = (dateStr) => {
    const date = new Date(dateStr);
    const monthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`;
  };

  const filteredData = data.filter((row) =>
    row.id.toString().includes(searchTerm) ||
    row.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.items.toString().includes(searchTerm) ||
    row.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleStatusUserChange = async (id, newStatus) => {
    const item = data.find((i) => i.id === id);
    if (!item) return;

    if (item.status === "ไม่อนุมัติ" || item.status === "รออนุมัติ" || item.status_user === "รับของเรียบร้อยแล้ว") {
      Swal.fire({ icon: "warning", title: "ไม่สามารถเปลี่ยนสถานะได้" });
      return;
    }

    const confirm = await Swal.fire({
      icon: "question",
      title: "ยืนยันการเปลี่ยนสถานะ",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    });
    if (!confirm.isConfirmed) return;

    await axios.put(`${API_URL}/stuff_materials/update_stuff_materials.php`, {
      id,
      User_status: newStatus,
    });

    setData((prev) => prev.map((row) => (row.id === id ? { ...row, status_user: newStatus } : row)));
  };

  const handleExportExcel = async (row) => {
    const workbook = new ExcelJS.Workbook();
    const response = await fetch("/image/template.xlsx");
    const buffer = await response.arrayBuffer();
    await workbook.xlsx.load(buffer);
    const ws = workbook.getWorksheet(1);

    ws.mergeCells("B2:I2");
    const titleCell = ws.getCell("B2");
    titleCell.value = "ใบเบิกวัสดุ";
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    titleCell.font = { name: "TH SarabunPSK", size: 22, bold: true };

    if (ws.getCell("B3").value === "ใบเบิกวัสดุ") ws.getCell("B3").value = "";

    const excelData = {
      code: row.number,
      date: "23 พ.ค. 67",
      name: "นางสาวเพลิงดาว วิริยา",
      department: "STI",
      position: "เจ้าหน้าที่",
      phone: "0123456789",
      usage: "ใช้ในฝ่าย",
      items: [
        { name: "แฟ้มเอกสาร", qty: 2, unit: "เล่ม" },
        { name: "ปากกา", qty: 10, unit: "ด้าม" },
      ],
      sign_name: "สมชาย ขอยืม",
      head_name: "หัวหน้า หน่วยงาน",
      receiver_name: "ฝ่ายพัสดุ",
      giver_name: "เจ้าหน้าที่พัสดุ",
      approver_name: "ผู้สั่งจ่าย",
    };

    ws.getCell("I4").value = excelData.code;
    ws.getCell("I5").value = excelData.date;
    ws.getCell("D6").value = excelData.name;
    ws.getCell("D7").value = excelData.department;
    ws.getCell("I6").value = excelData.position;
    ws.getCell("I7").value = excelData.phone;
    ws.getCell("E8").value = `${excelData.items.length}`;
    ws.getCell("I8").value = excelData.usage;
    ws.getCell("I8").alignment = { horizontal: "center" };

    excelData.items.forEach((item, idx) => {
      const rowIdx = 12 + idx;
      ws.getCell(`B${rowIdx}`).value = idx + 1;
      ws.getCell(`C${rowIdx}`).value = item.name;
      ws.getCell(`H${rowIdx}`).value = item.qty;
      ws.getCell(`I${rowIdx}`).value = item.unit;

      ["B", "C", "H", "I"].forEach((col) => {
        ws.getCell(`${col}${rowIdx}`).font = { name: "TH SarabunPSK", size: 14 };
        ws.getCell(`${col}${rowIdx}`).alignment = {
          horizontal: col === "C" ? "left" : "center",
          vertical: "middle",
          ...(col === "C" ? { indent: 2 } : {}),
        };
      });
    });

    [
      "C22", "C23", "C24", "C26", "C27", "C28",
      "G22", "G23", "G24", "G26", "G27", "G28",
      "G30", "G31", "G32"
    ].forEach((cell) => {
      ws.getCell(cell).font = { name: "TH SarabunPSK", size: 14 };
    });

    ws.getCell("C22").value = excelData.sign_name;
    ws.getCell("C23").value = excelData.sign_name;
    ws.getCell("C24").value = excelData.date;
    ws.getCell("C26").value = excelData.head_name;
    ws.getCell("C27").value = excelData.head_name;
    ws.getCell("C28").value = excelData.date;
    ws.getCell("G22").value = excelData.receiver_name;
    ws.getCell("G23").value = excelData.receiver_name;
    ws.getCell("G24").value = excelData.date;
    ws.getCell("G26").value = excelData.giver_name;
    ws.getCell("G27").value = excelData.giver_name;
    ws.getCell("G28").value = excelData.date;
    ws.getCell("G30").value = excelData.approver_name;
    ws.getCell("G31").value = excelData.approver_name;
    ws.getCell("G32").value = excelData.date;

    const fileBuffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([fileBuffer]), `ใบเบิก_${excelData.code}.xlsx`);
  };

  const statusOptions = [
    { value: "รอรับของ", label: "รอรับของ", color: "#1e398d" },
    { value: "รับของเรียบร้อยแล้ว", label: "รับของเรียบร้อยแล้ว", color: "#009244" },
  ];

  const colourStyles = {
    option: (styles, { data }) => ({ ...styles, color: data.color, backgroundColor: "#fff", fontWeight: "bold" }),
    singleValue: (styles, { data }) => ({ ...styles, color: data.color, fontWeight: "bold" }),
  };

  if (loading) return <div className="userfollow-loading">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="userfollow-table-container">
      <table className="user-follow-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>เลขที่ใบเบิก</th>
            <th>ประเภท</th>
            <th>จำนวนรายการ</th>
            <th>วันที่สร้าง</th>
            <th>สถานะ</th>
            <th>สถานะผู้ใช้</th>
            <th>ปริ้น</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr><td colSpan="8" className="userfollow-no-data">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td></tr>
          ) : (
            currentItems.map((row) => (
              <tr key={row.id} className="userfollow-row">
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.id}</td>
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.number}</td>
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.category}</td>
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.items}</td>
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.date}</td>
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>
                  <span className={
                    row.status === "อนุมัติ" ? "status-approved" :
                      row.status === "รออนุมัติ" ? "status-pending" :
                        row.status === "รอดำเนินการ" ? "status-processing" :
                          row.status === "ไม่อนุมัติ" ? "status-cancelled" : ""
                  }>
                    {row.status}
                  </span>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Select
                    value={statusOptions.find((opt) => opt.value === row.status_user)}
                    onChange={(selected) => handleStatusUserChange(row.id, selected.value)}
                    options={statusOptions}
                    styles={colourStyles}
                    isDisabled={
                      row.status === "ไม่อนุมัติ" ||
                      row.status === "รออนุมัติ" ||
                      row.status_user === "รับของเรียบร้อยแล้ว"
                    }
                  />
                </td>
                <td className="print-icon" onClick={(e) => { e.stopPropagation(); handleExportExcel(row); }}>
                  <FaPrint />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="userfollow-pagination">
        <div className="userfollow-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="userfollow-pagination-buttons">
          <button className="btn" disabled={currentPage === 1} onClick={handlePrev}>ก่อนหน้า</button>
          <input
            type="text"
            className="org-page-input"
            placeholder={`${currentPage} / ${totalPages}`}
            value={inputPage}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = parseInt(inputPage, 10);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                }
                setInputPage("");
                e.target.blur();
              }
            }}
          />
          <button className="btn" disabled={currentPage === totalPages} onClick={handleNext}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default UserFollowTable;
