import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./Organizations-table.css";
import Organizationsbar from "./Organizationsbar";
import OrganizationsManagePopup from "./Organizations-Manage-Popup";
import OrganizationsAddPopup from "./Organizations-Add-Popup";
import { API_URL } from "../../config";

export default function OrganizationsTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [manageId, setManageId] = useState();
  const [adding, setAdding] = useState(false);
  const perPage = 5;

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/companies/get_companies.php`);
      if (res.data.status === "success") {
        setData(
          res.data.data.map((c) => ({
            id: String(c.id),
            name: c.name,
            created_by: c.created_by,
            created_at: c.created_at.split(" ")[0],
            updated_at: c.updated_at?.split(" ")[0] || "",
          }))
        );
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ฟังก์ชันแปลง 'YYYY-MM-DD' -> 'D MMM YYY' (ไทย)
  const fmtThai = (isoDate) => {
    if (!isoDate) return "—";
    const d = new Date(isoDate);
    return d.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const { items, total } = useMemo(() => {
    let arr = data.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.created_by || "").toString().includes(search) ||
      fmtThai(c.created_at).includes(search) ||
      fmtThai(c.updated_at).includes(search)
    );
    arr.sort((a, b) => (sortAsc ? a.id - b.id : b.id - a.id));
    const total = arr.length;
    const start = (page - 1) * perPage;
    return { items: arr.slice(start, start + perPage), total };
  }, [data, search, sortAsc, page]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="organizations-bar-container">
      <Organizationsbar
        onAddClick={() => setAdding(true)}
        searchTerm={search}
        setSearchTerm={(t) => { setSearch(t); setPage(1); }}
      />

      <div className="organizations-table-description">
        ตารางรายละเอียดบริษัท/ห้าง/ร้าน
      </div>

      <table className="organizations-table">
        <thead>
          <tr>
            <th
              onClick={() => setSortAsc((a) => !a)}
              style={{ cursor: "pointer" }}
            >
              ลำดับ {sortAsc ? "▲" : "▼"}
            </th>
            <th>บริษัท/ร้านค้า</th>
            <th>ผู้สร้าง/ผู้แก้ไข</th>
            <th>วันที่สร้าง</th>
            <th>วันที่แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td className="organizations-no-data" colSpan="6"> ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          ) : (
            items.map((c) => (
              <tr
                key={c.id}
                className="org-clickable-row"
                onClick={() => setManageId(c.id)}
              >
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.created_by || "—"}</td>
                <td>{fmtThai(c.created_at)}</td>
                <td>{c.updated_at ? fmtThai(c.updated_at) : "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="organizations-pagination-wrapper">
        <div className="organizations-pagination-info">
          แสดง {(page - 1) * perPage + 1} ถึง{" "}
          {Math.min(page * perPage, total)} จาก {total} แถว
        </div>
        <div className="organizations-pagination-buttons">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="organizations-page-input"
            placeholder={`${page} / ${totalPages}`}
            value={input}
            onFocus={() => setInput("")}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const v = parseInt(input, 10);
                if (v >= 1 && v <= totalPages) setPage(v);
                e.target.blur();
              }
            }}
          />
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            ถัดไป
          </button>
        </div>
      </div>

      {manageId && (
        <OrganizationsManagePopup
          onClose={() => setManageId(undefined)}
          companyData={data.find((c) => c.id === manageId)}
          onDeleteCompany={() => {
            fetchData();
            setManageId(undefined);
          }}
          onEditCompany={() => {
            fetchData();
            setManageId(undefined);
          }}
        />
      )}

      {adding && (
        <OrganizationsAddPopup
          onClose={() => setAdding(false)}
          onAddCompany={() => {
            fetchData();
            setAdding(false);
          }}
        />
      )}
    </div>
  );
}
