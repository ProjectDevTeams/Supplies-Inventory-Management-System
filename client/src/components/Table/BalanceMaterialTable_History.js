// OutMaterialTable_History.js
import React from "react";
import "./AddMaterialTable_History.css"; // ยังใช้ CSS เดิม


function BalanceMaterialTable_History() {
  return (
    <div className="history-table-container">
      <table className="history-table">
        <thead>
          <tr>
            <th>ลำดับ</th>  
            <th>วันที่</th>
            <th>จากคลัง</th>
            <th>บริษัท/ร้านค้า</th>
            <th>วันที่ซื้อ</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1455</td>
            <td>19 พ.ย. 66 15:57:11</td>
            <td>วัสดุในคลัง</td>
            <td>ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม</td>
            <td>11 ก.ค. 66</td>
            <td className="status approved">อนุมัติ</td>
          </tr>
          <tr>
            <td>1446</td>
            <td>27 พ.ย. 66 13:30:35</td>
            <td>วัสดุในคลัง</td>
            <td>ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม</td>
            <td>4 ก.ค. 66</td>
            <td className="status approved">อนุมัติ</td>
          </tr>
          <tr>
            <td>1442</td>
            <td>5 มี.ค. 67 09:36:27</td>
            <td>วัสดุในคลัง</td>
            <td>ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม</td>
            <td>1 ม.ค. 66</td>
            <td className="status approved">อนุมัติ</td>
          </tr>
          <tr>
            <td>1441</td>
            <td>6 เม.ย. 67 14:15:10</td>
            <td>วัสดุนอกคลัง</td>
            <td>ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม</td>
            <td>29 มิ.ย. 66</td>
            <td className="status approved">อนุมัติ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BalanceMaterialTable_History;

