import { useState, useEffect } from "react";
import axios from "axios";
import "./StuffBasket_Popup.css";
import { API_URL } from "../../config";
import Swal from "sweetalert2";

// ✅ Popup สำหรับยืนยันรายการเบิกวัสดุ

const StuffBasket_Popup = ({
  basketItems = [], // รายการวัสดุที่เลือกไว้
  setBasketItems = () => {}, // ฟังก์ชันสำหรับอัปเดต basketItems
  onClose, // ฟังก์ชันปิด popup
  onCancel, // ฟังก์ชันยกเลิก
  onSuccess, // ฟังก์ชัน callback เมื่อลงข้อมูลสำเร็จ
}) => {
  // ✅ รวมจำนวนและมูลค่าทั้งหมดของรายการที่เลือก
  const totalQty = basketItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = basketItems.reduce(
    (sum, i) => sum + (i.quantity * i.price || 0),
    0
  );

  // ✅ สถานะของช่องกรอกข้อมูล
  const [purpose, setPurpose] = useState(""); // เพื่อใช้ในงาน/กิจกรรม
  const [supervisor, setSupervisor] = useState(""); // ชื่อหัวหน้างาน
  const [userFullName, setUserFullName] = useState(""); // ชื่อผู้ใช้ (จาก localStorage)
  const [department, setDepartment] = useState(""); // ชื่อสังกัด
  const [userId, setUserId] = useState(null); // ID ผู้ใช้

  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelSuccess, setShowCancelSuccess] = useState(false);

  // ✅ ดึงข้อมูลผู้ใช้จาก localStorage เมื่อ component โหลดครั้งแรก
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
      onClose();        // ✅ ปิด popup
      onCancel();       // ✅ ล้างข้อมูล
      setShowCancelSuccess(true); // ✅ รอแจ้งเตือน
    }
  });
};



  // ✅ ส่งข้อมูลไปยัง API เมื่อผู้ใช้กดปุ่ม "ยืนยัน"
  const handleConfirm = async () => {
    if (isSubmitting) return; // ป้องกันกดซ้ำ

    setIsSubmitting(true); // 🔒 ล็อกไว้ไม่ให้ส่งซ้ำ

    const payload = {
      created_by: userId,
      reason: purpose,
      total_amount: parseFloat(totalPrice.toFixed(2)),
      Admin_status: "รออนุมัติ",
      User_status: "รอรับของ",
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
        setBasketItems([]); // ✅ ล้าง basketItems
        onClose(); // ✅ ปิด popup React ก่อน

        setTimeout(() => {
          Swal.fire({
            title: "สำเร็จ",
            text: `เพิ่มใบเบิกสำเร็จ (รหัส: ${res.data.running_code})`,
            icon: "success",
            confirmButtonText: "ตกลง",
          });
        }, 200); // ✅ รอ popup ปิดก่อนค่อยแจ้งเตือน
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
      setIsSubmitting(false); // ✅ ปลดล็อก
    }
  };

  return (
    <div className="stuff-basket-popup-overlay">
      <div className="stuff-basket-popup">
        {/* ✅ ส่วนหัว popup */}
        <div className="stuff-basket-popup-header">
          <span className="stuff-basket-popup-title">ยืนยันรายการ</span>
          <button className="stuff-basket-popup-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* ✅ ส่วนฟอร์มข้อมูล */}
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

          {/* ✅ ตารางรายการวัสดุที่เลือก */}
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
                        {item.quantity} {item.unit}
                      </td>
                      <td>{(item.quantity * item.price).toFixed(2)} บาท</td>
                    </tr>
                  ))}
                  {/* ✅ แถวรวม */}
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

        {/* ✅ ปุ่มยืนยันและยกเลิก */}
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
