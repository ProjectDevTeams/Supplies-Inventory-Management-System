import React from "react";
import'./Pagination.css'

function Pagination() {


  return (
    <div className="pagination">
        <strong className="pagination-info">แสดง 1 ถึง 5 จาก 120 แถว</strong>
        <div className="pagination-buttons">
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
    
  );
}

export default Pagination;
