import React, { useState, useEffect } from "react";
import "./HumanTable.css";
import EditpeoplePopup from '../../components/Human/Editpeople-popup';

const mockIncomingData = [
  { id: "020", username: "pichayanan", fullname: "นางสาวพิชญานัน ศรีสุวรรณ", group: "STI", email: "pichayanan.s@psu.ac.th", status: "อนุมัติ" },
  { id: "019", username: "siradaa.th", fullname: "นางสาวศิรดา เตาทิพย์", group: "STI", email: "siradaa.th@gmail.com", status: "อนุมัติ" },
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

  const initialData = JSON.parse(localStorage.getItem("peopleData")) || mockIncomingData;


  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("peopleData");
    return storedData ? JSON.parse(storedData) : mockIncomingData;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);  // reset หน้า 1 ทุกครั้งที่ search เปลี่ยน
  }, [searchTerm]);

  const filteredData = data.filter(item =>
    item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) // เพิ่มการค้นหาด้วย ID
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setInputPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setInputPage(currentPage + 1);
    }
  };

  const handlePageChange = (e) => {
    setInputPage(Number(e.target.value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const page = Math.min(Math.max(Number(inputPage), 1), totalPages);
      setCurrentPage(page);
    }
  };

  const handleEditClick = (person) => {
    setSelectedPerson(person);
    setShowEditPopup(true);
  };

  const handleSave = (updatedPerson) => {
    const updatedData = data.map(person =>
        person.id === updatedPerson.id ? updatedPerson : person
    );

    
    // setShowEditPopup(false);

    // ปรับปรุงข้อมูลในตาราง
    setData(prevData => {
      return prevData.map(person =>
        person.id === updatedPerson.id ? updatedPerson : person
      );
    });

    setData(updatedData);
    // ปิด popup หลังจากบันทึกข้อมูล
    localStorage.setItem("peopleData", JSON.stringify(updatedData));
    setShowEditPopup(false);
    
    // แสดง Console log เพื่อดูว่ามีการอัปเดตข้อมูลหรือไม่
    // เซฟลง localStorage
    console.log("Updated person:", updatedPerson);
  };

  return (
    <div className="human-table-container">
      <table className="hum-table">
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
          {currentItems.map((item) => (
            <tr key={item.id} onClick={() => handleEditClick(item)}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.fullname}</td>
              <td>{item.group}</td>
              <td>{item.email}</td>
              <td className={`status ${item.status === 'อนุมัติ' ? 'approved' : 
                              item.status === 'รออนุมัติ' ? 'pending' : 
                              'rejected'}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* แสดงข้อความเมื่อไม่พบข้อมูล */}
      {currentItems.length === 0 && (
        <div className="no-data-message">
          ไม่พบข้อมูลที่ตรงกับคำค้นหา "{searchTerm}"
        </div>
      )}

      {/* Pagination */}
      <div className="pagination-wrapper">
        <div className="pagination-info">
          แสดง {filteredData.length === 0 ? 0 : indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>

        <div className="pagination-buttons">
          <button
            className={`btn ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePrevPage}
          >
            ก่อนหน้า
          </button>

          <input
            type="number"
            className="page-input"
            value={inputPage}
            min={1}
            max={totalPages}
            onChange={handlePageChange}
            onKeyDown={handleKeyDown}
          />

          <button
            className={`btn ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={handleNextPage}
          >
            ถัดไป
          </button>
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