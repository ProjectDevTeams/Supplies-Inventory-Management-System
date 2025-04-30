import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ConsumablePage from "./pages/Consumable/ConsumablePage";
import StuffPage from "./pages/Stuff/StuffPage";
import IncomingPage from "./pages/Incoming/IncomingPage";
import HistoryPage from "./pages/History/HistoryPage";
import AdjustPage from "./pages/Adjust/AdjustPage";
import HumanPage from "./pages/Human/HumanPage";
import OrganizationsPage from "./pages/Organizations/OrganizationsPage";
import ReportPage from "./pages/Report/ReportPage";
import PermissionPage from "./pages/Permission/PermissionPage";
import SettingPage from "./pages/Setting/SettingPage";
import CategorizePage from "./pages/Consumable/Categorize/CategorizePage";
import UnitsCountPage from "./pages/Consumable/UnitsCount/UnitsCountPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/consumable" element={<ConsumablePage />}/>
        <Route path="/stuff" element={<StuffPage />} />
        <Route path="/incoming" element={<IncomingPage />} />
        <Route path="/adjust" element={<AdjustPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/human" element={<HumanPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/permission" element={<PermissionPage />} />
        <Route path="/setting" element={<SettingPage />} />
<<<<<<< Updated upstream
        <Route path="/consumable/categorize" element={<CategorizePage />} />
=======
        <Route path="/categorize" element={<CategorizePage/>} />
        <Route path="/unitscount" element={<UnitsCountPage />} />
        
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;
