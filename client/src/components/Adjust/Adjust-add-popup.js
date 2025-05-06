import React, { useState } from "react";
import "./Adjust-add-popup.css";

function AdjustAddPopup({ onClose }) {
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedSupply, setSelectedSupply] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [newAmount, setNewAmount] = useState("");

  // Warehouse options from Image 1
  const warehouseOptions = [
    { value: "วัสดุในคลัง", label: "วัสดุในคลัง" },
    { value: "วัสดุนอกคลัง", label: "วัสดุนอกคลัง" }
  ];

  // Supply options from Image 2
  const supplyOptions = [
    { value: "3m_scotch", label: "3M Scotch เทปกาวสองหน้า แรงยึดสูงชนิดใส 19 มม.*4ม." },
    { value: "elfen", label: "Elfen ลิ้นแฟ้มโลหะสีทอง" },
    { value: "whiteboard_marker", label: "One Whiteboard Marker สีน้ำเงิน" },
    { value: "pentel", label: "Pentel ชุดปากกาลูกลื่น" }
  ];

  // Handle save button click
  const handleSave = () => {
    // Add any validation or data saving logic here
    console.log("Saving data:", {
      warehouse: selectedWarehouse,
      supply: selectedSupply,
      currentAmount,
      newAmount
    });
    
    // Close the popup
    onClose();
  };

  return (
    <div className="Adjust-add-popup-overlay">
      <div className="Adjust-add-popup-box">
        <div className="Adjust-add-popup-header">
          <div className="Adjust-add-popup-title">เพิ่มรายการใหม่</div>
          <button className="Adjust-add-popup-close" onClick={onClose}>✕</button>
        </div>

        <div className="Adjust-add-popup-section">
          <label className="Adjust-add-popup-label">คลัง</label>
          <select 
            className="Adjust-add-popup-select"
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
          >
            <option value="">เลือกคลังวัสดุ</option>
            {warehouseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="Adjust-add-popup-section Adjust-add-popup-divider">
          <label className="Adjust-add-popup-label">วัสดุสิ้นเปลือง</label>
          <select 
            className="Adjust-add-popup-select"
            value={selectedSupply}
            onChange={(e) => setSelectedSupply(e.target.value)}
          >
            <option value="">เลือกวัสดุสิ้นเปลือง</option>
            {supplyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="Adjust-add-popup-label">จำนวนปัจจุบัน</label>
          <input 
            className="Adjust-add-popup-input" 
            type="number" 
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
          />

          <label className="Adjust-add-popup-label">เปลี่ยนเป็น</label>
          <input 
            className="Adjust-add-popup-input" 
            type="number" 
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
        </div>

        <div className="Adjust-add-popup-footer">
          <button className="Adjust-add-popup-submit" onClick={handleSave}>บันทึก</button>
        </div>
      </div>
    </div>
  );
}

export default AdjustAddPopup;