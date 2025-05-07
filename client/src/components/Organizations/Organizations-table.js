import React, { useState, useEffect } from "react";
import "./Organizations-table.css";
import OrganizationsManagePopup from "./Organizations-Manage-Popup";
import OrganizationsAddPopup from "./Organizations-Add-Popup";
import Organizationsbar from "./Organizationsbar";

function OrganizationsTable() {
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem("companies");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "1", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "13 พ.ย. 66" },
          { id: "2", name: "บริษัท โกลบอล 205 (ประเทศไทย) จำกัด", created: "14 พ.ย. 66" },
          { id: "3", name: "บริษัท แสงออร์ดี สมบูรณ์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)", created: "4 เม.ย. 67" },
          { id: "4", name: "ห้างหุ้นส่วนจำกัด นนทภัณฑ์ สเตชั่นเนอรี่", created: "24 พ.ย. 66" },
          { id: "5", name: "บริษัท แสงออร์ดี สมบูรณ์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)", created: "4 เม.ย. 67" }
        ];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [showManagePopup, setShowManagePopup] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCompanies = [...filteredCompanies].sort((a, b) =>
    sortOrder === "asc" ? parseInt(a.id) - parseInt(b.id) : parseInt(b.id) - parseInt(a.id)
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedCompanies = sortedCompanies.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    setInputPage(""); // เคลียร์เมื่อเปลี่ยนหน้า
  }, [currentPage]);
  
  const handleCompanyClick = (id) => {
    setSelectedCompanyId(id);
    setShowManagePopup(true);
  };

  const handleAddCompany = (newCompany) => {
    const maxId = Math.max(...companies.map((c) => parseInt(c.id)));
    const nextId = maxId + 1;
    const companyToSave = { ...newCompany, id: nextId.toString() };
    const updated = [...companies, companyToSave];
    setCompanies(updated);
    localStorage.setItem("companies", JSON.stringify(updated));
    setCurrentPage(Math.ceil(updated.length / itemsPerPage));
  };

  const handleEditCompany = (id, newName) => {
    const updated = companies.map((c) => c.id === id ? { ...c, name: newName } : c);
    setCompanies(updated);
    localStorage.setItem("companies", JSON.stringify(updated));
  };

  const handleDeleteCompany = (id) => {
    const updated = companies.filter((c) => c.id !== id);
    setCompanies(updated);
    localStorage.setItem("companies", JSON.stringify(updated));
  };

  const handleSortClick = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="organizations-bar-container">
      <Organizationsbar
        onAddClick={() => setShowAddPopup(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <table className="organizations-bar-table">
        <thead>
          <tr>
            <th>
              <span onClick={handleSortClick} style={{ cursor: "pointer" }}>
                ลำดับ {sortOrder === "asc" ? "▲" : "▼"}
              </span>
            </th>
            <th>บริษัท/ร้านค้า</th>
            <th>วันที่สร้าง</th>
            <th>วันที่แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {displayedCompanies.length === 0 ? (
            <tr>
              <td colSpan="4" className="organizations-no-data-message">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            displayedCompanies.map((company) => (
              <tr
                key={company.id}
                onClick={() => handleCompanyClick(company.id)}
                className="org-clickable-row"
              >
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.created}</td>
                <td>—</td>
              </tr>
            ))
          )}
        </tbody>
      </table>


      <div className="organizations-pagination-wrapper">
        <div className="organizations-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedCompanies.length)} จาก {sortedCompanies.length} แถว
        </div>
        <div className="organizations-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>ก่อนหน้า</button>
          <input
            type="number"
            className="organizations-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            placeholder={`${currentPage} / ${totalPages}`}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = parseInt(inputPage.trim(), 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
                e.target.blur();
              }
            }}
          />
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>ถัดไป</button>
        </div>
      </div>

      {showManagePopup && selectedCompanyId && (
        <OrganizationsManagePopup
          onClose={() => setShowManagePopup(false)}
          companyData={companies.find((c) => c.id === selectedCompanyId)}
          onDeleteCompany={handleDeleteCompany}
          onEditCompany={handleEditCompany}
        />
      )}

      {showAddPopup && (
        <OrganizationsAddPopup
          onClose={() => setShowAddPopup(false)}
          onAddCompany={handleAddCompany}
        />
      )}
    </div>
  );
}

export default OrganizationsTable;
