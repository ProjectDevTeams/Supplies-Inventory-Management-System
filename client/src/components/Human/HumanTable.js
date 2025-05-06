import React, { useState, useEffect } from "react";
import "./HumanTable.css";
import EditpeoplePopup from '../../components/Human/Editpeople-popup';

const mockIncomingData = [
  { id: "020", username: "pichayanan", fullname: "นางสาวพิชญานัน ศรีสุวรรณ", group: "STI", email: "pichayanan.s@psu.ac.th", status: "อนุมัติ" },
  { id: "019", username: "siradaa.th", fullname: "นางสาวศิรดา เตาทิย์", group: "STI", email: "siradaa.th@gmail.com", status: "อนุมัติ" },
  { id: "018", username: "pichayanan", fullname: "นางสาววนิยา อรุณทอง", group: "STI", email: "warinyafon41@gmail.com", status: "อนุมัติ" },
  { id: "017", username: "pilantana.s", fullname: "นางสาวปิลันธนา สิทธิพันธ์", group: "STI", email: "pilantana.s@psu.ac.th", status: "อนุมัติ" },
  { id: "016", username: "piyorot.b", fullname: "นางสาวปิยะรส บุญสวัสดิ์", group: "STI", email: "piyorot.b@gmail.com", status: "อนุมัติ" },
  { id: "015", username: "kathawut.t", fullname: "นายกฤาวุธ ทองวงศ์", group: "STI", email: "Kathawut.t@psu.ac.th", status: "อนุมัติ" },
  { id: "014", username: "kanat", fullname: "นายคเณศ บุญสวัสดิ์", group: "STI", email: "bunyarat056@gmail.com", status: "อนุมัติ" },
  { id: "013", username: "Preeda.p", fullname: "นางสาวปรีดา พวงเพ็ชร์", group: "STI", email: "bptk60317@gmail.com", status: "อนุมัติ" },
  { id: "012", username: "sukrattajit.t", fullname: "นายสุรัตจิต มงคลศิริเจริญ", group: "STI", email: "sukrattajit.t@psu.ac.th", status: "อนุมัติ" },
  { id: "011", username: "kulthida.y", fullname: "นางสาวกุลธิดา องอาจรณกุล", group: "STI", email: "kulthida.y@psu.ac.th", status: "อนุมัติ" },
];

function HumanTable({ searchTerm }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("peopleData");
    return storedData ? JSON.parse(storedData) : mockIncomingData;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [sortAsc, setSortAsc] = useState(true); // ✅ เพิ่มการเรียงลำดับ
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  // ✅ กรอง + เรียงลำดับข้อมูล
  const filteredData = data.filter(item =>
    item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) =>
    sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditClick = (person) => {
    setSelectedPerson(person);
    setShowEditPopup(true);
  };

  const handleSave = (updatedPerson) => {
    const updatedData = data.map(person =>
      person.id === updatedPerson.id ? updatedPerson : person
    );
    setData(updatedData);
    localStorage.setItem("peopleData", JSON.stringify(updatedData));
    setShowEditPopup(false);
  };

  return (
    <div className="human-table-container">
      <table className="hum-table">
        <thead>
          <tr>
            {/* ✅ เพิ่ม sort แบบคลิกได้ */}
            <th onClick={() => setSortAsc(prev => !prev)} style={{ cursor: 'pointer' }}>
              ลำดับ {sortAsc ? '▲' : '▼'}
            </th>
            <th>username</th>
            <th>ชื่อ - สกุล</th>
            <th>กำหนดกลุ่มผู้ใช้งาน</th>
            <th>email</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} onClick={() => handleEditClick(item)}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.fullname}</td>
              <td>{item.group}</td>
              <td>{item.email}</td>
              <td className={`status ${item.status === 'อนุมัติ' ? 'approved' : item.status === 'รออนุมัติ' ? 'pending' : 'rejected'}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentItems.length === 0 && (
        <div className="no-data-message">
          ไม่พบข้อมูลที่ตรงกับคำค้นหา "{searchTerm}"
        </div>
      )}

      <div className="human-pagination-wrapper">
        <div className="human-pagination-info">
          แสดง {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, sortedData.length)} จาก {sortedData.length} แถว
        </div>
        <div className="human-pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>ก่อนหน้า</button>

          <input
            type="number"
            className="human-page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            placeholder={`${currentPage} / ${totalPages}`}
            onFocus={() => setInputPage("")}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = parseInt(inputPage.trim(), 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
                e.target.blur();
              }
            }}
          />

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>ถัดไป</button>
        </div>
      </div>

      {showEditPopup && (
        <EditpeoplePopup
          person={selectedPerson}
          onClose={() => setShowEditPopup(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default HumanTable;