import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import './DetailFollow.css';

const mockData = {
  code: "003-02/2568",
  date: "2025-02-12 14:20:10",
  name: "นางสาวเพลิงดาว วิริยา",
  department: "STI",
  usage: "ใช้ในฝ่าย",
  stock: "วัสดุในคลัง",
  items: [
    { name: "Pentax ใบมีดตัดเตอร์ใหญ่ L150", qty: 2, unit: "กล่อง", price: 22.0 }
  ],
  status: "",
  receiveStatus: ""
};

// ✅ mock สถานะอนาคตเปลี่ยนเป็น API ได้
const approvalStatusText = "อนุมัติแล้ว (ฝ่ายบริการโครงสร้างพื้นฐานด้านวิทยาศาสตร์ฯ 07 ก.พ. 68 11:38:45)";
const receiveStatusText = "รับของแล้ว (นางสาวปรีดา พวงเพ็ชร์ 07 ก.พ. 68 11:45:25)";

export default function DetailFo() {

  const total = mockData.items.reduce((sum, i) => sum + i.qty * i.price, 0).toFixed(2);

  return (
    <div className="stuff-navbar">
      <Navbar />
      <div className="stuff-sidebar">
        <Sidebar />
        <main className="stuff-content">
          <h1 className="detailFo-header">ใบเบิกวัสดุ</h1>
          <div className="detailFo-box">
            <h2 className="detailFo-title">ใบเบิกวัสดุ</h2>
            <div className="detailFo-grid">
              <p><b>เลขที่/ปีงบประมาณ</b></p><p>{mockData.code}</p>
              <p><b>วันที่</b></p><p>{mockData.date}</p>
              <p><b>ชื่อ</b></p><p>{mockData.name}</p>
              <p><b>สังกัด</b></p><p>{mockData.department}</p>
              <p><b>เบิกจำนวน</b></p><p>{mockData.items.length} รายการ</p>
              <p><b>คลัง</b></p><p>{mockData.stock}</p>
              <p><b>เพื่อใช้ในงาน/กิจกรรม</b></p><p>{mockData.usage}</p>
            </div>

            <h3 className="detailFo-subtitle">รายการวัสดุ</h3>
            <table className="detailFo-table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รายการ</th>
                  <th>จำนวน/หน่วยนับ</th>
                  <th>มูลค่า</th>
                </tr>
              </thead>
              <tbody>
                {mockData.items.map((row, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.qty} {row.unit}</td>
                    <td>{(row.qty * row.price).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3"><b>รวม</b></td>
                  <td>{total}</td>
                </tr>
              </tbody>
            </table>

            {/* ✅ สถานะอนุมัติและรับของแบบ mock */}
            <div className="detailFo-status-text">
              <p>
                <b>สถานะการอนุมัติ :</b>{" "}
                <span className="approved">{approvalStatusText}</span>
              </p>
              <p>
                <b>สถานะการรับของ :</b>{" "}
                <span className="received">{receiveStatusText}</span>
              </p>
            </div>

            <div className="detailFo-button-container">
              <button className="btn-back" onClick={() => window.history.back()}>กลับ</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
