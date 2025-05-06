import React from "react";
import "./AddMaterialTable_History.css";

function AddMaterialTable_History() {
  return (
    <div className="history-add-table-container">
      <table className="history-add-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>ซื้อมาจำนวน</th>
            <th>ราคา</th>
            <th>รวมเงิน</th>
            <th>จำนวนคงเหลือ</th>
            <th>มูลค่าคงเหลือ</th>
            <th>โดย</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>27 พ.ย. 66 13:30:35</td>
            <td>5</td>
            <td>17.50</td>
            <td>87.50</td>
            <td>8</td>
            <td>140.00</td>
            <td className="history-add-left-align">
              ฝ่ายโครงสร้างพื้นฐานด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddMaterialTable_History;
