import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
// import { FaPrint } from "react-icons/fa";
// import { FaPrint } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import Swal from 'sweetalert2';
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
            <tr><td colSpan="8" className="userfollow-no-data">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td></tr>
          ) : (
            currentItems.map((row) => (
              <tr key={row.id} className="userfollow-row">
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
                <td>
                  <Select
                    value={statusOptions.find((opt) => opt.value === row.status_user)}
                    options={statusOptions}
                    styles={colourStyles}
                    isDisabled={true}
                  />
                </td>
                <td className="print-icon">
                  <span
                    style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
                    onClick={() => {
                      console.log("✅ CLICKED PRINT BUTTON");
                      navigate("/userstuff/follow/print-track", {
                        state: {
                          data: {
                            code: "TEST123",
                            date: "2025-05-29",
                            name: "ทดสอบ",
                            department: "แผนก",
                            position: "ตำแหน่ง",
                            phone: "000-000",
                            items: [{ name: "วัสดุ A", qty: 1, unit: "อัน" }]
                          }
                        }
                      });
                    }}
                  >
                    ปริ้น
                  </span>
                </td>



              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserFollowTable;
