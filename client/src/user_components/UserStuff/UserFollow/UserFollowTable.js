import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaPrint } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import "./UserFollowTable.css";

function UserFollowTable({ searchTerm = "" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/stuff_materials/get_stuff_materials.php`
        );
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
    };
    fetchData();
  }, []);

  // แปลงวันที่ไทย
  const formatDateThai = (dateStr) => {
    const date = new Date(dateStr);
    const monthNames = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date
      .getFullYear()
      .toString()
      .slice(-2)}`;
  };

  const handleStatusUserChange = async (id, newStatus) => {
    const item = data.find((i) => i.id === id);
    if (!item) return;

    if (item.status === "ไม่อนุมัติ") {
      Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเปลี่ยนสถานะได้",
        text: "รายการนี้ถูกไม่อนุมัติแล้ว",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (item.status === "รออนุมัติ") {
      Swal.fire({
        icon: "warning",
        title: "ยังไม่สามารถเปลี่ยนสถานะได้",
        text: "ต้องรอให้รายการได้รับการอนุมัติก่อน",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (item.status_user === "รับของเรียบร้อย") {
      Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเปลี่ยนสถานะกลับได้",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (newStatus === "รับของเรียบร้อย") {
      const result = await Swal.fire({
        title: "ยืนยันการเปลี่ยนสถานะ",
        text: "คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนเป็น 'รับของเรียบร้อย'? หากยืนยันแล้วจะไม่สามารถย้อนกลับได้",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });
      if (!result.isConfirmed) return;
    }

    await axios.put(`${API_URL}/stuff_materials/update_stuff_materials.php`, {
      id,
      status_user: newStatus,
    });

    setData((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, status_user: newStatus } : row
      )
    );
  };

  const statusOptions = [
    { value: "รอรับของ", label: "รอรับของ", color: "#1e398d" },
    { value: "รับของเรียบร้อย", label: "รับของเรียบร้อย", color: "#009244" },
  ];

  const colourStyles = {
    option: (styles, { data, isFocused, isSelected }) => ({
      ...styles,
      color: data.color,
      backgroundColor: isFocused ? "#f0f0f0" : "white",
      fontWeight: isSelected ? "bold" : "bold",
      cursor: "pointer",
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: data.color,
      fontWeight: "bold",
    }),
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

  const userfollowTotalPages = Math.ceil(
    filteredData.length / userfollowItemsPerPage
  );
  const userfollowIndexOfLastItem =
    userfollowCurrentPage * userfollowItemsPerPage;
  const userfollowIndexOfFirstItem =
    userfollowIndexOfLastItem - userfollowItemsPerPage;
  const userfollowCurrentItems = filteredData.slice(
    userfollowIndexOfFirstItem,
    userfollowIndexOfLastItem
  );

  const handleUserfollowPrev = () => {
    if (userfollowCurrentPage > 1) {
      setUserfollowCurrentPage(userfollowCurrentPage - 1);
      setUserfollowInputPage(userfollowCurrentPage - 1);
    }
  };

  const handleUserfollowNext = () => {
    if (userfollowCurrentPage < userfollowTotalPages) {
      setUserfollowCurrentPage(userfollowCurrentPage + 1);
      setUserfollowInputPage(userfollowCurrentPage + 1);
    }
  };

  const handleUserfollowChange = (e) => {
    setUserfollowInputPage(e.target.value);
  };

  const handleUserfollowKeyDown = (e) => {
    if (e.key === "Enter") {
      const page = Math.max(
        1,
        Math.min(userfollowTotalPages, Number(userfollowInputPage))
      );
      setUserfollowCurrentPage(page);
      setUserfollowInputPage(page);
    }
  };

  if (loading)
    return <div className="userfollow-loading">กำลังโหลดข้อมูล...</div>;

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
              <td colSpan="8" className="userfollow-no-data">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            userfollowCurrentItems.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.number}</td>
                <td>{row.category}</td>
                <td>{row.items}</td>
                <td>{row.date}</td>
                <td
                  className={
                    row.status === "อนุมัติ"
                      ? "status-approved"
                      : row.status === "รออนุมัติ"
                      ? "status-pending"
                      : row.status === "รอดำเนินการ"
                      ? "status-processing"
                      : row.status === "ไม่อนุมัติ"
                      ? "status-cancelled"
                      : ""
                  }
                >
                  {row.status}
                </td>
                <td>
                  <Select
                    value={
                      row.status === "ไม่อนุมัติ"
                        ? { value: "ยกเลิก", label: "ยกเลิก", color: "#dc3545" }
                        : row.status === "รออนุมัติ"
                        ? {
                            value: "รอรับของ",
                            label: "รอรับของ",
                            color: "#1e398d;",
                          }
                        : statusOptions.find(
                            (opt) => opt.value === row.status_user
                          )
                    }
                    onChange={(selectedOption) =>
                      handleStatusUserChange(row.id, selectedOption.value)
                    }
                    options={statusOptions}
                    styles={colourStyles}
                    isDisabled={
                      row.status === "ไม่อนุมัติ" ||
                      row.status === "รออนุมัติ" ||
                      row.status_user === "รับของเรียบร้อย"
                    }
                    className="custom-status-dropdown"
                  />
                </td>
                <td
                  className="print-icon"
                  onClick={() =>
                    navigate("/user/confirm-status", { state: { id: row.id } })
                  }
                >
                  <FaPrint />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="userfollow-pagination">
        <div className="userfollow-pagination-info">
          แสดง {userfollowIndexOfFirstItem + 1} ถึง{" "}
          {Math.min(userfollowIndexOfLastItem, filteredData.length)} จาก{" "}
          {filteredData.length} แถว
        </div>
        <div className="userfollow-pagination-buttons">
          <button
            className="btn"
            disabled={userfollowCurrentPage === 1}
            onClick={handleUserfollowPrev}
          >
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="org-page-input"
            placeholder={`${userfollowCurrentPage} / ${userfollowTotalPages}`}
            value={userfollowInputPage}
            onFocus={() => setUserfollowInputPage("")}
            onChange={handleUserfollowChange}
            onKeyDown={handleUserfollowKeyDown}
          />
          <button
            className="btn"
            disabled={userfollowCurrentPage === userfollowTotalPages}
            onClick={handleUserfollowNext}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserFollowTable;
