import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { ComponentUpdateSuccessAlert } from "../SweetAlert/ComponentSweetAlert";
import "./Adjust-Balance.css";

function AdjustBalance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdjustment = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/adjustment_items/get_adjustment_items.php?adjustment_id=${id}`
        );
        if (res.data.status === "success") {
          const data = res.data.data;
          setStatus(data.status || "");
          setItems(data.items || []);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("❌ โหลดล้มเหลว:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdjustment();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/adjustments/update_adjustments.php`, {
        adjustment_id: id,
        status: status,
      });
      ComponentUpdateSuccessAlert();
      navigate(-1, { state: { reload: true } });
    } catch (err) {
      alert("❌ บันทึกล้มเหลว");
      console.error(err);
    }
  };

  if (loading) return <div className="balance-container">🔄 กำลังโหลด...</div>;
  if (items.length === 0) return <div className="balance-container">❌ ไม่พบข้อมูล</div>;

  return (
    <div className="balance-container">
      <h2 className="balance-header">ปรับยอด</h2>

      <div className="balance-items-wrapper">
        {items.map((item, index) => (
          <div key={index} className="balance-card">
            <div className="balance-row">
              <strong>วัสดุสิ้นเปลือง:</strong>
              <span>{item.material_name}</span>
            </div>
            <div className="balance-row">
              <strong>จากคลัง:</strong>
              <span>{item.material_stock_type}</span>
            </div>
            <div className="balance-row">
              <strong>จากจำนวน:</strong>
              <span>{item.old_quantity ?? "-"}</span>
            </div>
            <div className="balance-row">
              <strong>เป็นจำนวน:</strong>
              <span>{item.quantity ?? "-"}</span>
            </div>
            <div className="balance-row">
              <strong>ส่วนต่าง:</strong>
              <span>{item.difference ?? "-"}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="balance-actions">
        <div className="balance-status-wrapper">
          <strong>สถานะ:</strong>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="balance-select"
          >
            <option value="">-- เลือกสถานะ --</option>
            <option value="อนุมัติ">อนุมัติ</option>
            <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
          </select>
        </div>

        <button className="balance-back-button-orange" onClick={() => navigate(-1)}>
          กลับ
        </button>
        <button className="balance-back-button" onClick={handleSave}>
          บันทึก
        </button>
      </div>
    </div>
  );
}

export default AdjustBalance;
