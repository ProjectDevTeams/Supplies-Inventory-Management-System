import React, { useState, useEffect } from "react";
import "./HumanTable.css";
import EditpeoplePopup from '../../components/Human/Editpeople-popup';
import axios from "axios";
import { API_URL } from "../../config";

function HumanTable({ searchTerm }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${API_URL}/users/get_users.php`)
      .then((res) => {
        const response = res.data;
        const finalData = Array.isArray(response) ? response : response.data;
        setData(finalData);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

  const filteredData = data.filter(item =>
    item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.id).includes(searchTerm)
  );

  const sortedData = [...filteredData].sort((a, b) =>
    sortAsc
      ? String(a.id).localeCompare(String(b.id))
      : String(b.id).localeCompare(String(a.id))
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
    setShowEditPopup(false);
  };

  return (
    <div className="human-table-container">
      <table className="hum-table">
        <thead>
          <tr>
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
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="6" className="human-no-data-message">
                ไม่มีข้อมูลที่ตรงกับคำค้นหา
              </td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id} onClick={() => handleEditClick(item)}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.full_name}</td>
                <td>{item.position}</td>
                <td>{item.email}</td>
                <td className={`status ${item.approval_status === 'อนุมัติ' ? 'approved' : item.approval_status === 'รออนุมัติ' ? 'pending' : 'rejected'}`}>
                  {item.approval_status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
