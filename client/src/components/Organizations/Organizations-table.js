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
          { id: "2", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "14 พ.ย. 66" },
          { id: "3", name: "บริษัท โกลบอล 205 (ประเทศไทย) จำกัด", created: "14 พ.ย. 66" },
          { id: "4", name: "ห้างหุ้นส่วนจำกัด นนทภัณฑ์ สเตชั่นเนอรี่", created: "24 พ.ย. 66" },
          { id: "5", name: "บริษัท แสงออร์ดี สมบูรณ์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)", created: "4 เม.ย. 67" },
        ];
  });

  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [showManagePopup, setShowManagePopup] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const sortedCompanies = [...companies].sort((a, b) => {
    return sortOrder === "asc"
      ? parseInt(a.id) - parseInt(b.id)
      : parseInt(b.id) - parseInt(a.id);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedCompanies = sortedCompanies.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleCompanyClick = (companyId) => {
    setSelectedCompanyId(companyId);
    setShowManagePopup(true);
  };

  const handleCloseManagePopup = () => {
    setSelectedCompanyId(null);
    setShowManagePopup(false);
  };

  const handleOpenAddPopup = () => setShowAddPopup(true);
  const handleCloseAddPopup = () => setShowAddPopup(false);

  const handleAddCompany = (newCompany) => {
    const maxId = Math.max(...companies.map((c) => parseInt(c.id)));
    const nextId = maxId + 1;
    const companyToSave = { ...newCompany, id: nextId.toString() };
    const updated = [...companies, companyToSave];
    setCompanies(updated);
    localStorage.setItem("companies", JSON.stringify(updated));
    setCurrentPage(Math.ceil(updated.length / itemsPerPage));
  };

  const handleDeleteCompany = (id) => {
    const updated = companies.filter((c) => c.id !== id);
    setCompanies(updated);
    localStorage.setItem("companies", JSON.stringify(updated));
  };

  const handleEditCompany = (id, newName) => {
    const updated = companies.map((c) =>
      c.id === id ? { ...c, name: newName } : c
    );
    setCompanies(updated);
    localStorage.setItem("companies", JSON.stringify(updated));
  };

  const handleSortClick = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="organizations-bar-container">
      <Organizationsbar onAddClick={handleOpenAddPopup} />

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
          {displayedCompanies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>
                <span
                  className="organizations-bar-highlight-clickable"
                  onClick={() => handleCompanyClick(company.id)}
                >
                  {company.name}
                </span>
              </td>
              <td>
                {company.created}
                <br />
                <span className="organizations-bar-subtext">
                  ฝ่ายเวชภัณฑ์งานบ้าน วิทยาลัยพยาบาล
                </span>
              </td>
              <td>---</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="organizations-pagination-wrapper">
        <div className="organizations-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, companies.length)} จาก {companies.length} แถว
        </div>
        <div className="organizations-pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="org-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = parseInt(inputPage.trim(), 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
                e.target.blur(); // ✅ บังคับให้หลุด focus → placeholder จะแสดง
              }
            }}            
            placeholder={`${currentPage} / ${totalPages}`}
          />
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ถัดไป
          </button>
        </div>
      </div>

      {showManagePopup && selectedCompanyId && (
        <OrganizationsManagePopup
          onClose={handleCloseManagePopup}
          companyData={companies.find((c) => c.id === selectedCompanyId)}
          onDeleteCompany={handleDeleteCompany}
          onEditCompany={handleEditCompany}
        />
      )}

      {showAddPopup && (
        <OrganizationsAddPopup
          onClose={handleCloseAddPopup}
          onAddCompany={handleAddCompany}
        />
      )}
    </div>
  );
}

export default OrganizationsTable;