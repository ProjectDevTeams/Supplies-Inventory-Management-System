import Navbar from '../../../components/Navbar/Navbar';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Categorize_table from '../../../components/Consumable/Categorize/Categorize_table';
import './CategorizePage.css';

function CategorizePage() {
  return (
    <div className="consumable-categorize-navbar">
      <Navbar />
      <div className="consumable-categorize-sidebar">
        <Sidebar />
        <main className="consumable-categorize-content">
          <Categorize_table />
        </main>
      </div>
    </div>
  );
}

export default CategorizePage;