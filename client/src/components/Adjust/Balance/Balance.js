import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import "./Balance.css";

function Balance() {
  const { id } = useParams(); // รับ material_id จาก URL
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const url = `${API_URL}/adjustment_items/get_adjustment_items.php?material_id=${id}`;
        const res = await axios.get(url);
        console.log("📥 ได้ข้อมูล:", res.data);

        if (res.data.status === "success") {
          setData(res.data.data);
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
      </div>

      <div className="balance-actions">
        <button className="balance-back-button" onClick={() => navigate(-1)}>
          กลับ
        </button>
      </div>
    </div>
    
  );
}

export default Balance;
