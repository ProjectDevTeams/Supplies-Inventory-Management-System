import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { FaPrint } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import Swal from 'sweetalert2';
import "./UserFollowTable.css";

function UserFollowTable({ searchTerm = "" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const [inputPage, setInputPage] = useState("");
  useEffect(() => {
    setInputPage("");
  }, [currentPage]);
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
          date: item.created_at,
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
    formatDateThai(row.date).includes(searchTerm) ||
    row.status.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  // const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleStatusUserChange = async (id, newStatus) => {
    const item = data.find((i) => i.id === id);
    if (!item) return;

    if (item.status !== "อนุมัติ") {
      Swal.fire({ icon: "warning", title: "ไม่สามารถเปลี่ยนสถานะได้ (ต้องเป็น อนุมัติ)" });
      return;
    }

    if (item.status_user === "รับของเรียบร้อยแล้ว" && newStatus === "รอรับของ") {
      Swal.fire({ icon: "warning", title: "ไม่สามารถเปลี่ยนสถานะกลับเป็น รอรับของ ได้" });
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
      User_status: newStatus
    });

    setData((prev) => prev.map((row) => (row.id === id ? { ...row, status_user: newStatus } : row)));
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
    <div className="user-follow-table-container">
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
            <tr>
              <td colSpan="8" className="userfollow-no-data">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          ) : (
            currentItems.map((row) => (
              <tr
                key={row.id}
                className="userfollow-row"
                onClick={() => {
                  console.log("➡️ ไปหน้า UserConfirmHisPage, id:", row.id);
                  navigate("/user/confirm-status", { state: { id: row.id } });
                }}
                style={{ cursor: "pointer" }}
              >
                <td>{row.id}</td>
                <td>{row.number}</td>
                <td>{row.category}</td>
                <td>{row.items}</td>
                <td>{formatDateThai(row.date)}</td>
                <td>
                  <span className={
                    row.status === "อนุมัติ" ? "status-approved" :
                      row.status === "รออนุมัติ" ? "status-pending" :
                        row.status === "ไม่อนุมัติ" ? "status-cancelled" : ""
                  }>
                    {row.status}
                  </span>
                </td>
                <td
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                >
                  <Select
                    value={
                      row.status === "รออนุมัติ"
                        ? statusOptions.find((opt) => opt.value === "รอรับของ")
                        : statusOptions.find((opt) => opt.value === row.status_user)
                    }
                    options={statusOptions}
                    styles={colourStyles}
                    isDisabled={row.status !== "อนุมัติ" || row.status === "รออนุมัติ"}
                    onChange={(selectedOption) =>
                      handleStatusUserChange(row.id, selectedOption.value)
                    }
                    isSearchable={false}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onWheel={(e) => e.stopPropagation()}
                  />
                </td>

                <td className="print-icon">
                  <span
                    style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("✅ CLICKED PRINT BUTTON, ส่ง id:", row.id);
                      navigate("/userstuff/follow/print-track", {
                        state: { id: row.id }
                      });
                    }}
                  >
                    <FaPrint />
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="user-follow-table-pagination-wrapper">
        <div className="user-follow-table-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>
        <div className="user-follow-table-pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="user-follow-table-page-input"
            min={1}
            max={totalPages}
            value={inputPage}
            placeholder={`${currentPage} / ${totalPages}`}
            onFocus={() => setInputPage("")}
            onChange={e => setInputPage(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                const v = parseInt(inputPage, 10);
                if (v >= 1 && v <= totalPages) {
                  setCurrentPage(v);
                }
                e.target.blur();
              }
            }}
          />

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserFollowTable;
