import { useState, useEffect } from "react";
import "./StuffBasket_Popup.css";

const StuffBasket_Popup = ({
  basketItems = [],
  onClose,
  onConfirm,
  onCancel,
}) => {
  const totalQty = basketItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = basketItems.reduce(
    (sum, i) => sum + (i.quantity * i.price || 0),
    0
  );

  const [purpose, setPurpose] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [department, setDepartment] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.full_name) {
      setUserFullName(user.full_name);
    }
  }, []);

  return (
    <div className="stuff-basket-popup-overlay">
      <div className="stuff-basket-popup">
        <div className="stuff-basket-popup-header">
          <span className="stuff-basket-popup-title">ยืนยันรายการ</span>
          <button className="stuff-basket-popup-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="stuff-basket-popup-body">
          <div className="stuff-basket-popup-info-grid">
            <div>
              <label>ชื่อ</label>
              <input type="text" value={userFullName} readOnly />
            </div>
            <div>
              <label>สังกัด</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="กรอกชื่อสังกัด"
                autoComplete="off"
              />
            </div>
            <div>
              <label>เบิกจำนวน</label>
              <input
                type="text"
                value={`${basketItems.length} รายการ`}
                readOnly
              />
            </div>
            <div>
              <label>คลัง</label>
              <input type="text" value="วัสดุในคลัง" readOnly />
            </div>
            <div>
              <label>เพื่อใช้ในงาน/กิจกรรม</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="ระบุงานหรือกิจกรรม"
                autoComplete="off"
              />
            </div>
            <div>
              <label>หัวหน้างาน</label>
              <input
                type="text"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                placeholder="ชื่อหัวหน้างาน"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="stuff-basket-popup-table-section">
            <h3>รายการวัสดุ</h3>
            <div className="stuff-basket-popup-table-scroll">
              <table className="stuff-basket-popup-material-table">
                <thead>
                  <tr>
                    <th>ลำดับ</th>
                    <th>รายการ</th>
                    <th>จำนวน/หน่วยนับ</th>
                    <th>มูลค่า</th>
                  </tr>
                </thead>
                <tbody>
                  {basketItems.map((item, index) => (
                    <tr key={item.code || item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        {item.quantity} {item.unit}
                      </td>
                      <td>{(item.quantity * item.price).toFixed(2)} บาท</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2">รวม</td>
                    <td>{totalQty} หน่วย</td>
                    <td>{totalPrice.toFixed(2)} บาท</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="stuff-basket-popup-footer">
          <button className="stuff-basket-popup-cancel-btn" onClick={onCancel}>
            ยกเลิก
          </button>
          <button
            className="stuff-basket-popup-confirm-btn"
            onClick={() => onConfirm({ basketItems, purpose, supervisor })}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default StuffBasket_Popup;
