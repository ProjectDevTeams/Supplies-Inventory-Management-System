import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import "./Balance.css";

function Balance() {
  const { id } = useParams(); // material_id จาก URL
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const url = `${API_URL}/adjustment_items/get_adjustment_items.php?material_id=${id}`;
        const res = await axios.get(url);
        if (res.data.status === "success") {
          setData(res.data.data);
          setStatus(res.data.data.status || ""); // อ่านสถานะจากฐานข้อมูล
        } else {
          setData(null);
        }
      } catch (err) {
        console.error("❌ โหลดล้มเหลว:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/adjustments/update_adjustments.php`, {
        adjustment_id: data.adjustment_id, // ✅ ส่ง adjustment_id ไม่ใช่ item_id
        status: status,
      });

      alert("✅ บันทึกสถานะเรียบร้อยแล้ว");
      navigate(-1, { state: { reload: true } });
    } catch (err) {
      alert("❌ บันทึกล้มเหลว");
      console.error(err);
    }
  };

  if (loading) return <div className="balance-container">🔄 กำลังโหลด...</div>;
  if (!data) return <div className="balance-container">❌ ไม่พบข้อมูลวัสดุ</div>;

  return (
    <div className="balance-container">
      <h2 className="balance-header">ปรับยอด</h2>

      <div className="balance-box">
        <div className="balance-row">
          <strong>จากคลัง</strong>
          <span>{data.material_stock_type || "-"}</span>
        </div>

        <hr className="balance-divider" />

        <div className="balance-row">
          <strong>วัสดุสิ้นเปลือง</strong>
          <span>{data.material_name || "-"}</span>
        </div>

        <div className="balance-row">
          <strong>จากจำนวน</strong>
          <span>{data.remaining_quantity ?? "-"}</span>
          <strong className="balance-right">เป็นจำนวน</strong>
          <span>{data.quantity ?? "-"}</span>
        </div>

        <div className="balance-row">
          <strong>สถานะ:</strong>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              padding: "0.4rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              minWidth: "150px",
            }}
          >
            <option value="">-- เลือกสถานะ --</option>
            <option value="อนุมัติ">อนุมัติ</option>
            <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
          </select>
        </div>
      </div>

      <div className="balance-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#f79c05",
            color: "white",
            fontSize: "1rem",
            padding: "0.7rem 2rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          กลับ
        </button>

        <button className="balance-back-button" onClick={handleSave}>
          บันทึก
        </button>
      </div>
    </div>
  );
}

export default Balance;
