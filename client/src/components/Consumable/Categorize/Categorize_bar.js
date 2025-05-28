import { useNavigate } from "react-router";
import "./Categorize_bar.css";

function Categorizebar({ onAddClick }) {
  const navigate = useNavigate();



  return (
    <div>
      <div className="top-bar-categorize">
        <div className="top-title-categorize">วัสดุสิ้นเปลือง</div>
        <div className="toolbar-categorize">
          <div className="button-group-categorize">
            <button className="btn green-categorize" onClick={onAddClick}>+ เพิ่มรายการ</button>
            <button className="btn dark-categorize" onClick={() => navigate("/consumable")}>กลับหน้าหลัก</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorizebar;
