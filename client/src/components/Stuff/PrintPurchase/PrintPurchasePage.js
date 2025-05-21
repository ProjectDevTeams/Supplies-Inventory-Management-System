import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config';
import './PrintPurchasePage.css';

export default function PrintPurchasePage() {
    const location = useLocation();
    const id = location.state?.id;
    const [data, setData] = useState(null);
    const [hasPrinted, setHasPrinted] = useState(false);

    const formatThaiDate = (dateString) => {
        const date = new Date(dateString);
        const thMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
            "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        return `${date.getDate()} ${thMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
    };

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`${API_URL}/purchase_extras_items/get_purchase_extras_items.php?id=${id}`);
                if (res.data.status === 'success') {
                    setData(res.data.data);
                }
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", err);
            }
        };
        if (id) fetchDetail();
    }, [id]);

    // พิมพ์ครั้งเดียวเมื่อ data พร้อม และยังไม่เคยพิมพ์
    useEffect(() => {
        if (data && !hasPrinted) {
            setHasPrinted(true);
            setTimeout(() => window.print(), 500);
        }
    }, [data, hasPrinted]);

    if (!data) return <div className="printpurchase-wrapper">กำลังโหลดข้อมูล...</div>;

    return (
        <div className="printpurchase-wrapper">
            <div className="printpurchase-header">
                <img src="/image/logo.png" alt="logo" className="printpurchase-logo" />
                <div className="printpurchase-date">วันที่: {formatThaiDate(data.created_date)}</div>
            </div>

            <h2 className="printpurchase-title">รายละเอียดการขอจัดซื้อเพิ่มเติม</h2>

            <div className="printpurchase-info-grid">
                <div><strong>คลังวัสดุ</strong><div>{data.items?.[0]?.stock_type || '-'}</div></div>
                <div><strong>หน่วยงาน</strong><div>{data.department || '-'}</div></div>
                <div><strong>ชื่อ</strong><div>{data.full_name || '-'}</div></div>
                <div><strong>หมายเหตุ</strong><div>{data.reason || '-'}</div></div>
                <div><strong>สถานะ</strong><div>{data.approval_status || '-'}</div></div>
                <div><strong>รูป</strong><div>-</div></div>
            </div>

            <h3 className="printpurchase-subtitle">รายการวัสดุ</h3>
            <table className="printpurchase-table">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>รายการ</th>
                        <th>จำนวน/หน่วยนับ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items?.map((item, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{item.material_name}</td>
                            <td>{item.quantity} {item.unit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="printpurchase-signature">
                <div className="printpurchase-sign-box">
                    <div>( ..................................................... )</div>
                    <div>(ผู้ขอจัดซื้อ)</div>
                </div>
                <div className="printpurchase-sign-box">
                    <div>( ..................................................... )</div>
                    <div>(ผู้อนุมัติ)</div>
                </div>
            </div>
        </div>
    );
}
