import React from "react";
import "./Humanbar.css";

function Human() {
  return (
    <div>
      <div className="top-bar">
        <div className="top-title">บุคลากร</div>

        <div className="toolbar">
          <div className="search-container">
            <input type="text" placeholder="ค้นหา" />
            <span className="search-icon">🔍</span>
          </div>

          <div className="button-group">
            <button className="btn success">+ เพิ่มเจ้าหน้าที่</button>
          </div>
        </div>
      </div>

      {/* ตารางวัสดุรวมอยู่ใน component เดียว */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>username</th>
              <th>ชื่อ - สกุล</th>
              <th>กำหนดกลุ่มผู้ใช้งาน</th>
              <th>email</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>020</td>
              <td>pichayanan</td>
              <td>นางสาวพิชญานัน ศรีสุวรรณ</td>
              <td>STI</td>
              <td>pichayanan.s@psu.ac.th</td>
              <td className="status approved">อนุมัติ</td>
            </tr>
            <tr>
              <td>019</td>
              <td>siradaa.th</td>
              <td>นางสาวศิรดา เตาทิพย์</td>
              <td>STI</td>
              <td>siradaa.th@gmail.com</td>
              <td className="status approved">อนุมัติ</td>
            </tr>
            <tr>
              <td>018</td>
              <td>pichayanan</td>
              <td>นางสาววนิยา อรุณทอง</td>
              <td>STI</td>
              <td>warinyafon41@gmail.com</td>
              <td className="status approved">อนุมัติ</td>
            </tr>
            <tr>
              <td>017</td>
              <td>pilantana.s</td>
              <td>นางสาวปิลันธนา สิทธิพันธ์</td>
              <td>STI</td>
              <td>pilantana.s@psu.ac.th</td>
              <td className="status.approved">อนุมัติ</td>
            </tr> 
            <tr>
              <td>016</td>
              <td>piyorot.b</td>
              <td>นางสาวปิยะรส บุญสวัสดิ์</td>
              <td>STI</td>
              <td>piyorot.b@gmail.com</td>
              <td className="status.approved">อนุมัติ</td>
            </tr>
            <tr>
              <td>015</td>
              <td>kathawut.t</td>
              <td>นายกฤาวุธ ทองวงศ์</td>
              <td>STI</td>
              <td>Kathawut.t@psu.ac.th</td>
              <td className="status approved">อนุมัติ</td>
            </tr>
            <tr>
              <td>014</td>
              <td>kanat</td>
              <td>นายคเณศ บุญสวัสดิ์</td>
              <td>STI</td>
              <td>bunyarat056@gmail.com</td>
              <td className="status approved">อนุมัติ</td>
            </tr>
            <tr>
              <td>013</td>
              <td>Preeda.p</td>
              <td>นางสาวปรีดา พวงเพ็ชร์</td>
              <td>STI</td>
              <td>bptk60317@gmail.com</td>
              <td className="status approved">อนุมัติ</td>
            </tr>
            <tr>
              <td>012</td>
              <td>sukrattajit.t</td>
              <td>นายสุรัตจิต มงคลศิริเจริญ</td>
              <td>STI</td>
              <td>sukrattajit.t@psu.ac.th</td>
              <td className="status approved">อนุมัติ</td>
            </tr>
            <tr>
              <td>011</td>
              <td>kulthida.y</td>
              <td>นางสาวกุลธิดา องอาจรณกุล</td>
              <td>STI</td>
              <td>kulthida.y@psu.ac.th</td>
              <td className="status approved">อนุมัติ</td>
            </tr>
          </tbody>
        </table>

        <div className="pagination">
          แสดง 1 ถึง 5 จาก 120 แถว
          <br />
          <span className="disabled">ก่อนหน้า</span>
          <span className="current">1</span>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          ...
          <a href="#">24</a>
          <a href="#">ถัดไป</a>
        </div>
      </div>
    </div>
  );
}

export default Human;
