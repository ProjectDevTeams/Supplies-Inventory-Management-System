import React from "react";
import "./Organizationsbar-table.css";

function OrganizationsBarTable() {
  return (
    <div className="org-container">
      <table className="org-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>บริษัท/ร้านค้า</th>
            <th>วันที่สร้าง</th>
            <th>วันที่แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>005</td>
            <td>
              <span className="highlight">
                บริษัท แสงออร์ดี สมบูรณ์ เทรดดิ้ง จำกัด (สำนักงานใหญ่)
              </span>
            </td>
            <td>
              4 เม.ย. 67<br />
              <span className="subtext">
                ฝ่ายเวชภัณฑ์งานบ้าน วิทยาลัยพยาบาล
              </span>
            </td>
            <td>---</td>
          </tr>
          <tr>
            <td>004</td>
            <td>ห้างหุ้นส่วนจำกัด นนทภัณฑ์ สเตชั่นเนอรี่</td>
            <td>
              24 พ.ย. 66<br />
              <span className="subtext">
                ฝ่ายเวชภัณฑ์งานบ้าน วิทยาลัยพยาบาล
              </span>
            </td>
            <td>---</td>
          </tr>
          <tr>
            <td>003</td>
            <td>บริษัท โกลบอล 205 (ประเทศไทย) จำกัด</td>
            <td>
              14 พ.ย. 66<br />
              <span className="subtext">
                ฝ่ายเวชภัณฑ์งานบ้าน วิทยาลัยพยาบาล
              </span>
            </td>
            <td>---</td>
          </tr>
          <tr>
            <td>002</td>
            <td>ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)</td>
            <td>
              14 พ.ย. 66<br />
              <span className="subtext">
                ฝ่ายเวชภัณฑ์งานบ้าน วิทยาลัยพยาบาล
              </span>
            </td>
            <td>---</td>
          </tr>
          <tr>
            <td>001</td>
            <td>ห้างหุ้นส่วนจำกัด นนทวัสดุอุตสาหกรรม (2021)</td>
            <td>
              13 พ.ย. 66<br />
              <span className="subtext">
                ฝ่ายเวชภัณฑ์งานบ้าน วิทยาลัยพยาบาล
              </span>
            </td>
            <td>---</td>
          </tr>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">แสดง 1 ถึง 5 จาก 5 แถว</div>
        <div className="pagination-buttons">
          <button disabled>ก่อนหน้า</button>
          <button className="active">1</button>
          <button>ถัดไป</button>
        </div>
      </div>
    </div>
  );
}

export default OrganizationsBarTable;
