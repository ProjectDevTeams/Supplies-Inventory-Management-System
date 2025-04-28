import React, { useState } from "react";
import "./Organizations-table.css";
import OrganizationsManagePopup from "./Organizations-Manage-Popup";
import OrganizationsAddPopup from "./Organizations-Add-Popup";
import Organizationsbar from "./Organizationsbar";

function OrganizationsTable() {
  const [companies, setCompanies] = useState(() => {
    const savedCompanies = localStorage.getItem("companies");
    if (savedCompanies) {
      return JSON.parse(savedCompanies);
    } else {
      return [
        { id: "005", name: "บริษัท แสงออร์ดี สมบูรณ์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)", created: "4 เม.ย. 67" },
        { id: "004", name: "ห้างหุ้นส่วนจำกัด นนทภัณฑ์ สเตชั่นเนอรี่", created: "24 พ.ย. 66" },
        { id: "003", name: "บริษัท โกลบอล 205 (ประเทศไทย) จำกัด", created: "14 พ.ย. 66" },
        { id: "002", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "14 พ.ย. 66" },
        { id: "001", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "13 พ.ย. 66" },
      ];
    }
  });

  const [showManagePopup, setShowManagePopup] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

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
    const nextId = (maxId + 1).toString().padStart(3, '0');

    const companyToSave = {
      ...newCompany,
      id: nextId,
    };

    const updatedCompanies = [companyToSave, ...companies];
    setCompanies(updatedCompanies);
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
  };

  const handleDeleteCompany = (idToDelete) => {
    const updatedCompanies = companies.filter((company) => company.id !== idToDelete);
    setCompanies(updatedCompanies);
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
  };

  const handleEditCompany = (idToEdit, newName) => {
    const updatedCompanies = companies.map((company) => {
      if (company.id === idToEdit) {
        return { ...company, name: newName };
      }
      return company;
    });

    setCompanies(updatedCompanies);
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
  };

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  return (
    <div className="organizations-bar-container">
      <Organizationsbar onAddClick={handleOpenAddPopup} />

      <table className="organizations-bar-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>บริษัท/ร้านค้า</th>
            <th>วันที่สร้าง</th>
            <th>วันที่แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
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

      {/* Pagination */}
      <div className="organizations-bar-pagination">
        <div className="organizations-bar-pagination-info">
          แสดง 1 ถึง {companies.length} จาก {companies.length} แถว
        </div>
        <div className="organizations-bar-pagination-buttons">
          <button disabled>ก่อนหน้า</button>
          <button className="active">1</button>
          <button disabled>ถัดไป</button>
        </div>
      </div>

      {/* Popup จัดการบริษัท */}
      {showManagePopup && selectedCompany && (
        <OrganizationsManagePopup
          onClose={handleCloseManagePopup}
          companyData={selectedCompany}
          onDeleteCompany={handleDeleteCompany}
          onEditCompany={handleEditCompany}
        />
      )}

      {/* Popup เพิ่มบริษัท */}
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
