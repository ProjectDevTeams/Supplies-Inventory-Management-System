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

  // fetch once
  useEffect(() => {
    axios
      .get(`${API_URL}/companies/get_companies.php`)
      .then(r => {
        if (r.data.status === "success")
          setData(
            r.data.data.map(c => ({
              id: String(c.id),
              name: c.name,
              created_at: c.created_at.split(" ")[0],
              updated_at: c.updated_at?.split(" ")[0] || "",
              created_by: c.created_by,       // may be null
            }))
          );
      })
      .catch(console.error);
  }, []);

  // date formatter
  const fmt = d => (d ? d.split("-").reverse().join("-") : "--");

  // filter / sort / paginate
  const { items, total } = useMemo(() => {
    let arr = data.filter(c =>
      (c.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      fmt(c.created_at).includes(search) ||
      fmt(c.updated_at).includes(search)
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
        setSearchTerm={t => {
          setSearch(t);
          setPage(1);
        }}
      />

      <table className="organizations-bar-table">
        <thead>
          <tr>
            <th onClick={() => setSortAsc(a => !a)} style={{ cursor: "pointer" }}>
              ลำดับ {sortAsc ? "▲" : "▼"}
            </th>
            <th>บริษัท/ร้านค้า</th>
            <th>วันที่สร้าง</th>
            <th>วันที่แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="4">ไม่มีข้อมูลที่ตรงกับคำค้นหา</td>
            </tr>
          ) : (
            items.map(c => (
              <tr
                key={c.id}
                className="org-clickable-row"
                onClick={() => setManageId(c.id)}
              >
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>
                  {fmt(c.created_at)}
                  <br />
                  <span className="organizations-bar-subtext">
                    {/* fall‑back to "—" when created_by is null */}
                    {c.created_by || "—"}
                  </span>
                </td>
                <td>{c.updated_at ? fmt(c.updated_at) : "—"}</td>
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
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            ก่อนหน้า
          </button>
          <input
            type="number"
            className="organizations-page-input"
            placeholder={`${page} / ${totalPages}`}
            value={input}
            onFocus={() => setInput("")}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                const v = parseInt(input, 10);
                if (v >= 1 && v <= totalPages) setPage(v);
                e.target.blur();
              }
            }}
          />
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            ถัดไป
          </button>
        </div>
      </div>

      {manageId && (
        <OrganizationsManagePopup
          onClose={() => setManageId(undefined)}
          companyData={data.find(c => c.id === manageId)}
          onDeleteCompany={id => setData(ds => ds.filter(d => d.id !== id))}
          onEditCompany={(id, name) =>
            setData(ds => ds.map(d => (d.id === id ? { ...d, name } : d)))
          }
        />
      )}

      {adding && (
        <OrganizationsAddPopup
          onClose={() => setAdding(false)}
          onAddCompany={nc => {
            const next = String(Math.max(...data.map(d => +d.id)) + 1);
            setData([
              ...data,
              {
                id: next,
                name: nc.name,
                created_at: new Date().toISOString().slice(0, 10),
                updated_at: "",
                created_by: "—",
              },
            ]);
          }}
        />
      )}
    </div>
  );
}
