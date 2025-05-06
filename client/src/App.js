import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ConsumablePage from "./pages/Consumable/ConsumablePage";
import CategorizePage from "./pages/Consumable/Categorize/CategorizePage";
import UnitsCountPage from "./pages/Consumable/UnitsCount/UnitsCountPage";
import StuffPage from "./pages/Stuff/StuffPage";
import DetailPage from "./pages/Stuff/DetailPage";
import IncomingPage from "./pages/Incoming/IncomingPage";
import HistoryPage from "./pages/History/HistoryPage";
import AdjustPage from "./pages/Adjust/AdjustPage";
import HumanPage from "./pages/Human/HumanPage";
import OrganizationsPage from "./pages/Organizations/OrganizationsPage";
import ReportPage from "./pages/Report/ReportPage";
import PermissionPage from "./pages/Permission/PermissionPage";
import PermissionAddPage from "./pages/Permission/PermissionAdd/PermissionAddPage";
import PermissionEditPage from "./pages/Permission/PermissionEdit/PermissionEditPage";
import SettingPage from "./pages/Setting/SettingPage";
import UserStuffPage from "./user_pages/UserStuff/UserStuffPage";
import ForgetPassword from "./pages/Forget Password/ForgetPassword";
import ResetPassword from "./pages/Reset Password/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* หน้าแรก */}
        <Route index element={<HomePage />} />

        {/* ระบบบัญชี */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* เมนูจัดการวัสดุสิ้นเปลือง */}
        <Route path="/consumable" element={<ConsumablePage />} />
        <Route path="/consumable/categorize" element={<CategorizePage />} />
        <Route path="/consumable/unitscount" element={<UnitsCountPage />} />

        {/* เมนูใบเบิก */}
        <Route path="/stuff" element={<StuffPage />} />
        <Route path="/stuff/detail" element={<DetailPage />} />

        {/* เมนูอื่นๆ */}
        <Route path="/incoming" element={<IncomingPage />} />
        <Route path="/adjust" element={<AdjustPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/human" element={<HumanPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/report" element={<ReportPage />} />

        {/* สิทธิ์ */}
        <Route path="/permission" element={<PermissionPage />} />
        <Route path="/permission/add" element={<PermissionAddPage />} />
        <Route path="/permission/edit/:id" element={<PermissionEditPage />} />

        {/* การตั้งค่า */}
        <Route path="/setting" element={<SettingPage />} />

        {/* หน้าผู้ใช้งานทั่วไป */}
        <Route path="/userstuff" element={<UserStuffPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
