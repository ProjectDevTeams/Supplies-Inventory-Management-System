import React, { useState } from "react";
import "./Organizations-table.css";
import OrganizationsManagePopup from "./Organizations-Manage-Popup";
import OrganizationsAddPopup from "./Organizations-Add-Popup";
import Organizationsbar from "./Organizationsbar"; // ต้อง import มา

function OrganizationsTable() {
  const [companies, setCompanies] = useState([
    { id: "005", name: "บริษัท แสงออร์ดี สมบูรณ์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)", created: "4 เม.ย. 67" },
    { id: "004", name: "ห้างหุ้นส่วนจำกัด นนทภัณฑ์ สเตชั่นเนอรี่", created: "24 พ.ย. 66" },
    { id: "003", name: "บริษัท โกลบอล 205 (ประเทศไทย) จำกัด", created: "14 พ.ย. 66" },
    { id: "002", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "14 พ.ย. 66" },
    { id: "001", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "13 พ.ย. 66" },
  ]);

  const [showManagePopup, setShowManagePopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const handleCompanyClick = (companyName) => {
    setSelectedCompany(companyName);
    setShowManagePopup(true);
  };

  const handleCloseManagePopup = () => {
    setSelectedCompany(null);
    setShowManagePopup(false);
  };

  const handleOpenAddPopup = () => {
    setShowAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  const handleAddCompany = (newCompany) => {
    console.log("ข้อมูลร้านค้าที่เพิ่มใหม่:", newCompany);

    setCompanies(prevCompanies => [newCompany, ...prevCompanies]);
  };

  return (
    <div className="organizations-bar-container">

      {/* วาง Organizationsbar และส่งฟังก์ชันไป */}
      <Organizationsbar onAddClick={handleOpenAddPopup} />

      {/* ตารางข้อมูล */}
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
                  onClick={() => handleCompanyClick(company.name)}
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
          companyName={selectedCompany}
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
