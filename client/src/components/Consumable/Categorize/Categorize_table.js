import React from "react";
import "./Categorize_table.css";

function Categorize_table() {
  return (
    <div className="categorize-table-container">
      <table className="categorize-table">
        <thead className="categorize-thead">
          <tr className="categorize-header-row">
            <th className="categorize-th">อันดับ</th>
            <th className="categorize-th">ID</th>
            <th className="categorize-th">หมวดหมู่</th>
            
            {/* ปุ่มแก้ไข/ลบ */}
          </tr>
        </thead>
        <tbody className="categorize-tbody">
          <tr className="categorize-row">
            <td className="categorize-td">1</td>
            <td className="categorize-td">OF</td>
            <td className="categorize-td">
              วัสดุสำนักงาน
              <div className="categorize-actions">
              <button className="categorize-edit-btn"><img className="img-edit-categorize" src="./image/Edit.png"></img></button>
              <button className="categorize-edit-btn"><img className="img-remove-categorize" src="./image/delete.png"></img></button>
              </div>
            </td>
          </tr>
          <tr className="categorize-row">
            <td className="categorize-td">2</td>
            <td className="categorize-td">ST</td>
            <td className="categorize-td">
              วัสดุสำนักงาน
              <div className="categorize-actions">
                <button className="categorize-edit-btn"><img className="img-edit-categorize" src="./image/Edit.png"></img></button>
                <button className="categorize-edit-btn"><img className="img-remove-categorize" src="./image/delete.png"></img></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Categorize_table;
