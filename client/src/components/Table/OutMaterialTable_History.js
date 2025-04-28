// OutMaterialTable_History.js
import React from "react";
import "./AddMaterialTable_History.css"; // ยังใช้ CSS เดิม

function OutMaterialTable_History() {
  return (
    <div className="history-table-container">
      <table className="history-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>จำนวนเบิก</th>
            <th>ราคารวม</th>
            <th>จำนวนคงเหลือ</th>
            <th>มูลค่าคงเหลือ</th>
            <th>โดย</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5 มี.ค. 67 09:36:27</td>
            <td>7</td>
            <td>122.50</td>
            <td>1</td>
            <td>17.50</td>
            <td className="left-align">
              ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม
            </td>
            <td className="status approved">อนุมัติ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OutMaterialTable_History;
