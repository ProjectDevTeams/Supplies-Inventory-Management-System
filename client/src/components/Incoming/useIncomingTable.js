import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const thaiMonths = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.",
  "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
  "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];

function formatThaiDateDMY(dmy) {
  const [dd, mm, yyyy] = dmy.split("-");
  return `${dd.padStart(2, "0")} ${thaiMonths[parseInt(mm, 10) - 1]} ${parseInt(yyyy, 10) + 543}`;
}

function statusClass(status) {
  switch (status) {
    case "รออนุมัติ":
      return "incoming-table-status incoming-table-pending";
    case "อนุมัติ":
      return "incoming-table-status incoming-table-approved";
    case "ไม่อนุมัติ":
      return "incoming-table-status incoming-table-rejected";
    default:
      return "incoming-table-status";
  }
}

export function useIncomingTable(searchTerm = "", itemsPerPage = 5) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/receive_materials/get_receives.php`)
      .then((res) => {
        if (res.data.status === "success") {
          const list = res.data.data.map((item) => ({
            id: item.id,
            company: item.company_name || item.project_name || "-",
            po: item.purchase_order_number || "-",
            created_by: item.created_by || "-",
            created_at: item.created_at.split("-").reverse().join("-"),
            amount: parseFloat(item.total_price) || 0,
            status: item.status || "-",
          }));
          setData(list);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const sortedData = useMemo(
    () =>
      [...data].sort((a, b) => (asc ? a.id - b.id : b.id - a.id)),
    [data, asc]
  );

  const filteredData = useMemo(
    () =>
      sortedData.filter((item) =>
        [item.company, item.po, item.created_by, item.created_at, item.amount, item.status]
          .some((field) =>
            field.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
      ),
    [sortedData, searchTerm]
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setCurrentPage(p);
      setInputPage("");
    }
  };

  return {
    currentItems,
    totalPages,
    currentPage,
    inputPage,
    asc,
    formatThaiDateDMY,
    statusClass,
    setInputPage,
    setAsc,
    goToPage,
  };
}
