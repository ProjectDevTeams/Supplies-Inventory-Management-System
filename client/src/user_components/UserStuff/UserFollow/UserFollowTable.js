import React, { useState, useEffect, useCallback } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FaPrint } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import "./UserFollowTable.css";

function UserFollowTable({ searchTerm = "" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const username = user?.username;

      const res = await axios.get(`${API_URL}/stuff_materials/get_stuff_materials.php`, {
        params: { username }
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
    const monthNames = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`;
  };

  const handleExportExcel = async (row) => {
    const workbook = new ExcelJS.Workbook();
    const response = await fetch("/image/template.xlsx");
    const buffer = await response.arrayBuffer();
    await workbook.xlsx.load(buffer);
    const ws = workbook.getWorksheet(1);

    // ใส่หัวข้อ "ใบเบิกวัสดุ" แบบจัดกลาง และใช้ฟอนต์ TH SarabunPSK ขนาด 22 ตัวหนา
    ws.mergeCells("B2:I2");
    const titleCell = ws.getCell("B2");
    titleCell.value = "ใบเบิกวัสดุ";
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    titleCell.font = { name: "TH SarabunPSK", size: 22, bold: true };

    // ลบข้อความซ้ำใน B3 ถ้ามี
    if (ws.getCell("B3").value === "ใบเบิกวัสดุ") {
      ws.getCell("B3").value = "";
    }

    // ใส่ usage: "ใช้ในฝ่าย" จัดกลางในเซลล์ I8
    ws.getCell("I8").value = "ใช้ในฝ่าย";
    ws.getCell("I8").alignment = { horizontal: "center", vertical: "middle" };


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

    excelData.items.forEach((item, idx) => {
      const rowIdx = 12 + idx;
      ws.getCell(`B${rowIdx}`).value = idx + 1;
      ws.getCell(`C${rowIdx}`).value = item.name;
      ws.getCell(`H${rowIdx}`).value = item.qty;
      ws.getCell(`I${rowIdx}`).value = item.unit;

      ["B", "H", "I"].forEach((col) => {
        ws.getCell(`${col}${rowIdx}`).alignment = {
          horizontal: "center",
          vertical: "middle",
        };
      });

      ws.getCell(`C${rowIdx}`).alignment = {
        horizontal: "left",
        vertical: "middle",
        indent: 2, // ประมาณห่าง 1 ซม.
      };
    }); // ✅ ปิด forEach ตรงนี้ให้ถูก

    // แล้วค่อย export ข้างนอก
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

    // ✅ ย้ายมานอก loop
    const fileBuffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([fileBuffer]), `ใบเบิก_${excelData.code}.xlsx`);
  };

  const [userfollowCurrentPage, setUserfollowCurrentPage] = useState(1);
  const [userfollowItemsPerPage] = useState(5);
  const [userfollowInputPage, setUserfollowInputPage] = useState(1);

  const filteredData = data.filter(
    (row) =>
      row.id.toString().includes(searchTerm) ||
      row.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.items.toString().includes(searchTerm) ||
      row.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userfollowTotalPages = Math.ceil(filteredData.length / userfollowItemsPerPage);
  const userfollowIndexOfLastItem = userfollowCurrentPage * userfollowItemsPerPage;
  const userfollowIndexOfFirstItem = userfollowIndexOfLastItem - userfollowItemsPerPage;
  const userfollowCurrentItems = filteredData.slice(userfollowIndexOfFirstItem, userfollowIndexOfLastItem);

  const handleUserfollowPrev = () => {
    setUserfollowCurrentPage((prev) => Math.max(prev - 1, 1));
    setUserfollowInputPage((prev) => Math.max(prev - 1, 1));
  };

  const handleUserfollowNext = () => {
    setUserfollowCurrentPage((prev) => Math.min(prev + 1, userfollowTotalPages));
    setUserfollowInputPage((prev) => Math.min(prev + 1, userfollowTotalPages));
  };

  const handleUserfollowChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      const num = parseInt(val, 10);
      if (num <= userfollowTotalPages || isNaN(num)) {
        setUserfollowInputPage(val);
      }
    }
  };

  const handleUserfollowKeyDown = (e) => {
    if (e.key === "Enter") {
      const val = parseInt(userfollowInputPage.toString().trim(), 10);
      if (!isNaN(val)) {
        const safePage = Math.min(Math.max(val, 1), userfollowTotalPages);
        setUserfollowCurrentPage(safePage);
        setUserfollowInputPage("");
      }
      e.target.blur();
    }
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
          {userfollowCurrentItems.length === 0 ? (
            <tr>
              <td colSpan="8" className="userfollow-no-data">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          ) : (
            userfollowCurrentItems.map((row) => (
              <tr key={row.id} className="userfollow-row">
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.id}</td>
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.number}</td>
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.category}</td>
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.items}</td>
                <td onClick={() => navigate("/user/confirm-status", { state: { id: row.id } })}>{row.date}</td>
                <td className={
                  row.status === "อนุมัติ" ? "status-approved"
                    : row.status === "รออนุมัติ" ? "status-pending"
                      : row.status === "รอดำเนินการ" ? "status-processing"
                        : row.status === "ไม่อนุมัติ" ? "status-cancelled" : ""
                }>
                  {row.status}
                </td>
                <td>
                  {row.status_user}
                </td>
                <td className="print-icon" onClick={(e) => {
                  e.stopPropagation();
                  handleExportExcel(row);
                }}>
                  <FaPrint />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="userfollow-pagination">
        <div className="userfollow-pagination-info">
          แสดง {userfollowIndexOfFirstItem + 1} ถึง {Math.min(userfollowIndexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="userfollow-pagination-buttons">
          <button className="btn" disabled={userfollowCurrentPage === 1} onClick={handleUserfollowPrev}>ก่อนหน้า</button>
          <input
            type="number"
            className="org-page-input"
            min={1}
            max={userfollowTotalPages}
            value={userfollowInputPage}
            placeholder={`${userfollowCurrentPage} / ${userfollowTotalPages}`}
            onFocus={() => setUserfollowInputPage("")}
            onChange={handleUserfollowChange}
            onKeyDown={handleUserfollowKeyDown}
          />
          <button className="btn" disabled={userfollowCurrentPage === userfollowTotalPages} onClick={handleUserfollowNext}>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default UserFollowTable;
