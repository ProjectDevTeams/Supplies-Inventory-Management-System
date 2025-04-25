import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConsumablePage from "./pages/ConsumablePage";
import StuffPage from "./pages/StuffPage";
import HistoryPage from "./pages/HistoryPage";
import HumanPage from "./pages/HumanPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import ReportPage from "./pages/ReportPage"
import PermissionPage from "./pages/PermissionPage"
import SettingPage from "./pages/SettingPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/consumable" element={<ConsumablePage />} />
        <Route path="/stuff" element={<StuffPage />} />
        {/* <Route path="/incoming" element={<IncomingPage />} /> */}
        {/* <Route path="/adjust" element={<AdjustPage />} /> */}
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/human" element={<HumanPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/permission" element={<PermissionPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
