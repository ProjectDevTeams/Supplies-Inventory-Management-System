import React, { useState } from "react";
import "./Historybar.css";

import AllMaterialTable_History from "./AllMaterialTable_History";
import AddMaterialTable_History from "./AddMaterialTable_History";
import OutMaterialTable_History from "./OutMaterialTable_History";
import BalanceMaterialTable_History from "./BalanceMaterialTable_History";


function Historybar() {
    const [selectedTable, setSelectedTable] = useState(null); // เริ่มต้นไม่แสดงตารางใดๆ
  
    // ฟังก์ชันในการแสดงตารางตามปุ่มที่กด
    const handleButtonClick = (tableName) => {
      setSelectedTable(tableName);
    };
  
    return (
      <div className="history-header">
        <h2 className="history-title">ประวัติเบิก/จ่าย/ปรับยอด</h2>
  
        {/* กลุ่มปุ่ม */}
        <div className="button-container">
          <button className="btn blue" onClick={() => handleButtonClick("all")}>
            ประวัติทั้งหมด
          </button>
          <button className="btn purple" onClick={() => handleButtonClick("add")}>
            รับเข้าวัสดุ
          </button>
          <button className="btn orange" onClick={() => handleButtonClick("out")}>
            เบิกวัสดุ
          </button>
          <button className="btn yellow" onClick={() => handleButtonClick("Balance")}>
            ปรับยอด
          </button>
        </div>
  
        {/* กลุ่มช่องค้นหา */}
        <div className="search-group">
          <div className="warehouse-select">
            <label className="input-label" htmlFor="warehouse">คลัง</label>
            <select name="warehouse">
              <option value="">เลือกคลังวัสดุ</option>
              <option value="inside">วัสดุในคลัง</option>
              <option value="outside">วัสดุนอกคลัง</option>
            </select>
          </div>
  
          <div className="material-select">
            <label className="input-label" htmlFor="material">วัสดุสิ้นเปลือง</label>
            <select name="material">
              <option value="">เลือกวัสดุสิ้นเปลือง</option>
              <option value="scotch">3M Scotch เทปกาวสองหน้า แรงยึดสูงชนิดใส 19 มม.*4ม.</option>
              <option value="elfen">Elfen ลิ้นแฟ้มโลหะสีทอง</option>
              <option value="whiteboard_marker">One Whiteboard Marker สีน้ำเงิน</option>
              <option value="pentel">Pentel ชุดปากกาลบคำผิด</option>
            </select>
          </div>
        </div>
  
        {/* แสดงตารางตามที่เลือก */}
        <div className="his-table-container">
          {selectedTable === "all" && <AllMaterialTable_History />}
          {selectedTable === "add" && <AddMaterialTable_History />}
          {selectedTable === "out" && <OutMaterialTable_History />}
          {selectedTable == "Balance" && <BalanceMaterialTable_History/>}
        </div>
      </div>
    );
  }
  
  export default Historybar;