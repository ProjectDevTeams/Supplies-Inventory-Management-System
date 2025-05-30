import { useState, useEffect } from "react";
import axios from "axios";
import "./StuffBasket_Popup.css";
import { API_URL } from "../../config";
import Swal from "sweetalert2";

const StuffBasket_Popup = ({
  basketItems = [],
  setBasketItems = () => {},
  onClose,
  onCancel,
  onSuccess,
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
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelSuccess, setShowCancelSuccess] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserFullName(user.full_name);
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    if (!showCancelSuccess) return;
    const timeout = setTimeout(() => {
      Swal.fire({
        title: "ยกเลิกเรียบร้อย",
        text: "รายการทั้งหมดถูกล้างออกแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });
      setShowCancelSuccess(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [showCancelSuccess]);

  const handleCancel = () => {
    Swal.fire({
      title: "ยืนยันการยกเลิก",
      text: "หากคุณยกเลิก รายการที่เลือกไว้จะถูกล้างทั้งหมด",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ยกเลิก",
      cancelButtonText: "กลับไป",
    }).then((result) => {
      if (result.isConfirmed) {
        onClose();
        onCancel();
        
        setShowCancelSuccess(true);
      }
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    const qty = Number(newQuantity);
    const updated = basketItems.map((item) =>
      item.id === id ? { ...item, quantity: isNaN(qty) ? 0 : qty } : item
    );
    setBasketItems(updated);
  };

  const handleRemoveItem = (id) => {
    const updated = basketItems.filter((item) => item.id !== id);
    setBasketItems(updated);
  };

  const handleConfirm = async () => {
    if (isSubmitting) return;

    // ตรวจสอบความถูกต้องก่อนส่ง
    if (basketItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีรายการวัสดุ",
        text: "กรุณาเลือกวัสดุอย่างน้อย 1 รายการก่อน",
      });
      return;
    }

    if (basketItems.some((item) => item.quantity === 0)) {
      Swal.fire({
        icon: "warning",
        title: "มีรายการที่จำนวนเป็น 0",
        text: "กรุณาปรับจำนวนให้มากกว่า 0 หรือใช้ปุ่มลบเพื่อลบรายการนั้นออก",
      });
      return;
    }

    if (!purpose.trim() || !supervisor.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }

    // ✅ ถ้าทุกอย่างครบ เริ่มส่งข้อมูล
    setIsSubmitting(true);

    const payload = {
      created_by: userId,
      reason: purpose,
      total_amount: parseFloat(totalPrice.toFixed(2)),
      Admin_status: "รออนุมัติ",
      User_status: "รอรับของ",
      supervisor_name: supervisor,
      items: basketItems.map((item) => ({
        material_id: item.id,
        quantity: item.quantity,
        total_price: parseFloat((item.quantity * item.price).toFixed(2)),
      })),
    };

    try {
      const res = await axios.post(
        `${API_URL}/stuff_materials/add_stuff_materials.php`,
        payload
      );
      if (res.data.status === "success") {
        onSuccess?.();
        setBasketItems([]);
        onClose();
        setTimeout(() => {
          Swal.fire({
            title: "สำเร็จ",
            text: `เพิ่มใบเบิกสำเร็จ (รหัส: ${res.data.running_code})`,
            icon: "success",
            confirmButtonText: "ตกลง",
          });
        }, 200);
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: res.data.message,
          icon: "error",
          confirmButtonText: "ปิด",
        });
      }
    } catch (error) {
      console.error("API error:", error);
      Swal.fire({
        title: "เชื่อมต่อไม่สำเร็จ",
        text: "ไม่สามารถเชื่อมต่อ API ได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  
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
            {/* <div>
              <label>สังกัด</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="กรอกชื่อสังกัด"
              />
            </div> */}
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
              />
            </div>
            <div>
              <label>หัวหน้างาน</label>
              <input
                type="text"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                placeholder="ชื่อหัวหน้างาน"
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
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <div className="stuff-basket-qty-wrapper">
                          <input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, e.target.value)
                            }
                            className="stuff-basket-qty-input"
                          />
                          <span>{item.unit}</span>
                        </div>
                      </td>
                      <td style={{ paddingRight: "12px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span className="value">
                            {(item.quantity * item.price).toFixed(2)} บาท
                          </span>
                          <button
                            className="stuff-basket-delete-btn"
                            onClick={() => handleRemoveItem(item.id)}
                            title="ลบรายการ"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="stuff-basket-total-row">
                    <td colSpan="2">
                      <strong>รวม</strong>
                    </td>
                    <td>
                      <strong>{totalQty} หน่วย</strong>
                    </td>
                    <td>
                      <strong>{totalPrice.toFixed(2)} บาท</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="stuff-basket-popup-footer">
          <button
            className="stuff-basket-popup-cancel-btn"
            onClick={handleCancel}
          >
            ยกเลิกรายการ
          </button>
          <button
            className="stuff-basket-popup-confirm-btn"
            onClick={handleConfirm}
          >
            ยืนยันรายการ
          </button>
        </div>
      </div>
    </div>
  );
};

export default StuffBasket_Popup;
