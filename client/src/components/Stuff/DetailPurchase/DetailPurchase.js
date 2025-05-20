// File: DetailPurchase.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config';
import './DetailPurchase.css';

export default function DetailPurchase() {
    const location = useLocation();
    const id = location.state?.id;
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`${API_URL}/stuff_material_items/get_stuff_material_items.php?id=${id}`);
                if (res.data.status === "success") {
                    setData(res.data.data);
                }
            } catch (error) {
                console.error("โหลดข้อมูลล้มเหลว:", error);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    if (!data) return <div className="detail-purchase-container">กำลังโหลดข้อมูล...</div>;

    const total = data.items.reduce((sum, i) => sum + parseFloat(i.total_price), 0).toFixed(2);

    return (
        <div className="detail-purchase-container">
            <h1 className="detail-purchase-header">ใบขอจัดซื้อวัสดุ</h1>
            <div className="detail-purchase-box">
                <h2 className="detail-purchase-title">รายละเอียดการขอจัดซื้อเพิ่มเติม</h2>
                <div className="detail-purchase-grid">
                    <p><b>คลังวัสดุ</b></p><p>{data.stock_type} วัสดุในคลัง</p>
                    <p><b>หน่วยงาน</b></p><p>{data.department}</p>
                    <p><b>ชื่อ</b></p><p>{data.name}</p>
                    <p><b>วัสดุสิ้นเปลือง</b></p><p>{data.items[0]?.name || '-'}</p>
                    <p><b>จำนวนขอจัดซื้อเพิ่มเติม</b></p><p>{data.items[0]?.quantity || 0}</p>
                    <p><b>หมายเหตุ</b></p><p>{data.reason}</p>
                    <p><b>สถานะ</b></p>

                    <div className="detail-Purchase">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`detail-purchase-select ${status}`}
                        >
                            <option value="">สถานะ:</option>
                            <option value="approved">อนุมัติ</option>
                            <option value="rejected">ไม่อนุมัติ</option>
                        </select>
                    </div>

                    <p><b>รูป</b></p>
                </div>

                <h3 className="detail-track-subtitle">รายการวัสดุ</h3>
                <table className="detail-track-table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รายการ</th>
                            <th>จำนวน/หน่วยนับ</th>
                            <th>มูลค่า</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((row, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{row.name}</td>
                                <td>{row.quantity} {row.unit}</td>
                                <td>{parseFloat(row.total_price).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3"><b>รวม</b></td>
                            <td>{total}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="detail-purchase-actions">
                    <button className="btn-back" onClick={() => window.history.back()}>
                        กลับ
                    </button>
                </div>
            </div>
        </div>
    );
}
