import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ConsumablePage from "./pages/Consumable/ConsumablePage";
import CategorizePage from "./pages/Consumable/Categorize/CategorizePage";
import StuffPage from "./pages/Stuff/StuffPage";
import StuffTrackPage from './pages/Stuff/StuffTrackPage';
import StuffPurchasePage from './pages/Stuff/StuffPurchasePage';
import StuffDetailPage from './pages/Stuff/StuffDetailPage';
import StuffDetailTrackPage from './pages/Stuff/StuffDetailTrackPage';
import IncomingPage from "./pages/Incoming/IncomingPage";
import AdjustPage from "./pages/Adjust/AdjustPage";
import HumanPage from "./pages/Human/HumanPage";
import OrganizationsPage from "./pages/Organizations/OrganizationsPage";
import ReportPage from "./pages/Report/ReportPage";
import SettingPage from "./pages/Setting/SettingPage";
import UserStuffPage from "./user_pages/UserStuff/UserStuffPage";
import ForgetPassword from "./pages/Forget Password/ForgetPassword";
import ResetPassword from "./pages/Reset Password/ResetPassword";
import IncomingDetailPage from "./pages/Incoming/IncomingDetailPage";
import IncomingAddPage from "./pages/Incoming/IncomingAddPage"
import BalancePage from './pages/Adjust/BalancePage';
import AdjustAddPage from "./pages/Adjust/AdjustAddPage";


import Balance from "./components/Adjust/Balance/Balance";


import UserConfirmHisPage from "./user_pages/UserStuff/UserStuffPage"; 




import EmailVerification from "./pages/Email Verification/Email_Verification";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* หน้าแรก */}
        <Route index element={<HomePage />} />

        {/* หน้าแรก */}
        <Route path="/HomePage" element={<HomePage />} />

        {/* ระบบบัญชี */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* เมนูจัดการวัสดุสิ้นเปลือง */}
        <Route path="/consumable" element={<ConsumablePage />} />
        <Route path="/consumable/categorize" element={<CategorizePage />} />

        {/* เมนูใบเบิก */}
        <Route path="/stuff" element={<StuffPage />} />
        <Route path="/stuff/detail" element={<StuffDetailPage />} />
        <Route path="/stuff/DetailTrack" element={<StuffDetailTrackPage />} />
        <Route path="/stuff" element={<StuffPage />} />
        <Route path="/stuff/track" element={<StuffTrackPage />} />
        <Route path="/stuff/purchase" element={<StuffPurchasePage />} />

        {/* เมนูอื่นๆ */}
        <Route path="/incoming" element={<IncomingPage />} />
        <Route path="/incoming/detail/:id" element={<IncomingDetailPage />} />
        <Route path="/incoming/add" element={<IncomingAddPage />} />
        <Route path="/adjust" element={<AdjustPage />} />
        <Route path="/adjust/add" element={<AdjustAddPage />} />
        <Route path="/adjust/balance" element={<BalancePage />} />
        <Route path="/human" element={<HumanPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/report" element={<ReportPage />} />

        {/* การตั้งค่า */}
        <Route path="/setting" element={<SettingPage />} />

        {/* หน้าผู้ใช้งานทั่วไป */}
        <Route path="/userstuff" element={<UserStuffPage />} />


        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/verification" element={<EmailVerification />} />


        <Route path="/adjust/balance/:id" element={<Balance />} />

        <Route path="/user/confirm-history" element={<UserConfirmHisPage />} />
                                                      


      </Routes>
    </BrowserRouter>
  );
}

export default App;
