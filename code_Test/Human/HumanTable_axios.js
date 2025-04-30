import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HumanTable.css";
import EditpeoplePopup from '../../components/Human/Editpeople-popup';

function HumanTable({ searchTerm }) {
  const [data, setData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = () => {
    axios.get("http://localhost/backend/users/list_users.php")
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = data.filter((item) =>
    item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditClick = (person) => {
    setSelectedPerson(person);
    setShowEditPopup(true);
  };

  const handleSave = (updatedPerson) => {
    if (!updatedPerson || !updatedPerson.id) {
      // ถ้าข้อมูลเป็น undefined เช่นหลังลบ ให้รีโหลดใหม่
      fetchData();
      return;
    }

    const updatedData = data.map(person =>
      person.id === updatedPerson.id ? updatedPerson : person
    );
    setData(updatedData);
    setShowEditPopup(false);
  };

  return (
    <div className="table-container">
      <table className="hum-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>username</th>
            <th>ชื่อ - สกุล</th>
            <th>กลุ่ม</th>
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
              <td className="status approved">{item.status || "อนุมัติ"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentItems.length === 0 && (
        <div className="no-data-message">
          ไม่พบข้อมูลที่ตรงกับคำค้นหา "{searchTerm}"
        </div>
      )}

      <div className="pagination-wrapper">
        <div className="pagination-info">
          แสดง {filteredData.length === 0 ? 0 : indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredData.length)} จาก {filteredData.length} แถว
        </div>

        <div className="pagination-buttons">
          <button className="btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>ก่อนหน้า</button>
          <input type="number" className="page-input" value={inputPage} onChange={(e) => setInputPage(Number(e.target.value))} onKeyDown={(e) => {
            if (e.key === "Enter") {
              const page = Math.max(1, Math.min(Number(inputPage), totalPages));
              setCurrentPage(page);
            }
          }} />
          <button className="btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>ถัดไป</button>
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
