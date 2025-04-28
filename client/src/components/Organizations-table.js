import React, { useState } from "react";
import "./Organizations-table.css";
import OrganizationsManagePopup from "./Organizations-Manage-Popup";

function OrganizationsBarTable() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const companies = [
    { id: "005", name: "บริษัท แสงออร์ดี สมบูรณ์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)", created: "4 เม.ย. 67" },
    { id: "004", name: "ห้างหุ้นส่วนจำกัด นนทภัณฑ์ สเตชั่นเนอรี่", created: "24 พ.ย. 66" },
    { id: "003", name: "บริษัท โกลบอล 205 (ประเทศไทย) จำกัด", created: "14 พ.ย. 66" },
    { id: "002", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "14 พ.ย. 66" },
    { id: "001", name: "ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)", created: "13 พ.ย. 66" },
  ];

  const handleCompanyClick = (companyName) => {
    setSelectedCompany(companyName);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedCompany("");
  };

  return (
    <div className="organizations-bar-container">
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
        <div className="organizations-bar-pagination-info">แสดง 1 ถึง 5 จาก 5 แถว</div>
        <div className="organizations-bar-pagination-buttons">
          <button disabled>ก่อนหน้า</button>
          <button className="active">1</button>
          <button>ถัดไป</button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <OrganizationsManagePopup
          onClose={handleClosePopup}
          companyName={selectedCompany}
        />
      )}
    </div>
  );
}

export default OrganizationsBarTable;
