// HistoryChangeTable.js
import React from "react";
import "./AddMaterialTable_History.css"; // ใช้ CSS เดิมได้เลย

function AllMaterialTable_History() {
  return (
    <div className="history-table-container">
      <table className="history-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>รายการ</th>
            <th>เปลี่ยนแปลง</th>
            <th>คงเหลือ</th>
            <th>โดย</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>23 พ.ย. 66 15:57:11</td>
            <td>ยอดยกมา</td>
            <td>+3</td>
            <td>3</td>
            <td className="left-align">
              ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม
            </td>
          </tr>
          <tr>
            <td>27 พ.ย. 66 13:30:35</td>
            <td>รับเข้าวัสดุ</td>
            <td>+5</td>
            <td>8</td>
            <td className="left-align">
              ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม
            </td>
          </tr>
          <tr>
            <td>5 มี.ค. 67 09:36:27</td>
            <td>เบิกวัสดุ</td>
            <td>-7</td>
            <td>1</td>
            <td className="left-align">
              ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AllMaterialTable_History;
