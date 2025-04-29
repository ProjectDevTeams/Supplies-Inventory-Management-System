import React, { useState, useEffect } from "react";
import "./Organizations-table.css";
import OrganizationsManagePopup from "./Organizations-Manage-Popup";
import OrganizationsAddPopup from "./Organizations-Add-Popup";
import Organizationsbar from "./Organizationsbar";

function OrganizationsTable() {
  const [companies, setCompanies] = useState(() => {
    const savedCompanies = localStorage.getItem("companies");
    return savedCompanies ? JSON.parse(savedCompanies) : [
      { id: "1", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "13 พ.ย. 66" },
      { id: "2", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "14 พ.ย. 66" },
      { id: "3", name: "บริษัท โกลบอล 205 (ประเทศไทย) จำกัด", created: "14 พ.ย. 66" },
      { id: "4", name: "ห้างหุ้นส่วนจำกัด นนทภัณฑ์ สเตชั่นเนอรี่", created: "24 พ.ย. 66" },
      { id: "5", name: "บริษัท แสงออร์ดี สมบูรณ์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)", created: "4 เม.ย. 67" },
    ];
  });

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [showManagePopup, setShowManagePopup] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleCompanyClick = (companyId) => {
    setSelectedCompanyId(companyId);
    setShowManagePopup(true);
  };

  const handleCloseManagePopup = () => {
    setSelectedCompanyId(null);
    setShowManagePopup(false);
  };

  const handleOpenAddPopup = () => {
    setShowAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  const handleAddCompany = (newCompany) => {
    const maxId = Math.max(...companies.map(c => parseInt(c.id)));
    const nextId = maxId + 1;
    const companyToSave = { ...newCompany, id: nextId.toString() };
    const updatedCompanies = [...companies, companyToSave];
    setCompanies(updatedCompanies);
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    setCurrentPage(Math.ceil(updatedCompanies.length / itemsPerPage));
  };

  const handleDeleteCompany = (idToDelete) => {
    const updatedCompanies = companies.filter(company => company.id !== idToDelete);
    setCompanies(updatedCompanies);
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
  };

  const handleEditCompany = (idToEdit, newName) => {
    const updatedCompanies = companies.map(company =>
      company.id === idToEdit ? { ...company, name: newName } : company
    );
    setCompanies(updatedCompanies);
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
  };

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  const sortedCompanies = [...companies].sort((a, b) => {
    return sortOrder === "asc"
      ? parseInt(a.id) - parseInt(b.id)
      : parseInt(b.id) - parseInt(a.id);
  });

  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const displayedCompanies = sortedCompanies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleSortClick = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
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
          {displayedCompanies.map(company => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>
                <span className="organizations-bar-highlight-clickable" onClick={() => handleCompanyClick(company.id)}>
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

      <div className="organizations-bar-pagination">
        <div className="organizations-bar-pagination-info">
          แสดง {(currentPage - 1) * itemsPerPage + 1} ถึง {Math.min(currentPage * itemsPerPage, companies.length)} จาก {companies.length} แถว
        </div>
        <div className="organizations-bar-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            ก่อนหน้า
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => {
            const isFirst = page === 1;
            const isLast = page === totalPages;
            const isNearCurrent = Math.abs(page - currentPage) <= 1;

            if (isFirst || isLast || isNearCurrent) {
              return (
                <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            } else if (
              page === currentPage - 2 ||
              page === currentPage + 2
            ) {
              return <span key={page} style={{ padding: "0 0.5em" }}>...</span>;
            }

            return null;
          })}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            ถัดไป
          </button>
        </div>
      </div>

      {showManagePopup && selectedCompany && (
        <OrganizationsManagePopup
          onClose={handleCloseManagePopup}
          companyData={selectedCompany}
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
