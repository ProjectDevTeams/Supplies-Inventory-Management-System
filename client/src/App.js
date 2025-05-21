import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ForgetPassword from "./pages/Forget Password/ForgetPassword";
import ResetPassword from "./pages/Reset Password/ResetPassword";
import EmailVerification from "./pages/Email Verification/Email_Verification";

// Protected Pages
import ConsumablePage from "./pages/Consumable/ConsumablePage";
import CategorizePage from "./pages/Consumable/Categorize/CategorizePage";
import StuffPage from "./pages/Stuff/StuffPage";
import StuffTrackPage from './pages/Stuff/StuffTrackPage';
import StuffPurchasePage from './pages/Stuff/StuffPurchasePage';
import StuffDetailPage from './pages/Stuff/StuffDetailPage';
import StuffDetailTrackPage from './pages/Stuff/StuffDetailTrackPage';
import StuffDetailPurchasePage from './pages/Stuff/StuffDetailPurchasePage';
import PrintPurchasePage from './pages/Stuff/PrintPurchasePage';
import IncomingPage from "./pages/Incoming/IncomingPage";
import IncomingDetailPage from "./pages/Incoming/IncomingDetailPage";
import IncomingAddPage from "./pages/Incoming/IncomingAddPage";
import AdjustPage from "./pages/Adjust/AdjustPage";
import BalancePage from './pages/Adjust/BalancePage';
import AdjustAddPage from "./pages/Adjust/AdjustAddPage";
import Balance from "./components/Adjust/Balance/Balance";
import HumanPage from "./pages/Human/HumanPage";
import OrganizationsPage from "./pages/Organizations/OrganizationsPage";
import ReportPage from "./pages/Report/ReportPage";
import SettingPage from "./pages/Setting/SettingPage";
import UserStuffPage from "./user_pages/UserStuff/UserStuffPage";
import UserConfirmHisPage from "./user_pages/UserStuff/UserConfirmHisPage";

// ✅ ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route index element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
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
        <Route path="/stuff/DetailPurchase" element={<StuffDetailPurchasePage />} />
        <Route path="/stuff/print-purchase" element={<PrintPurchasePage />} />


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

        {/* ✅ Admin & Assistant Only */}
        <Route path="/consumable" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><ConsumablePage /></ProtectedRoute>} />
        <Route path="/consumable/categorize" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><CategorizePage /></ProtectedRoute>} />
        <Route path="/stuff" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffPage /></ProtectedRoute>} />
        <Route path="/stuff/detail" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffDetailPage /></ProtectedRoute>} />
        <Route path="/stuff/DetailTrack" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffDetailTrackPage /></ProtectedRoute>} />
        <Route path="/stuff/track" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffTrackPage /></ProtectedRoute>} />
        <Route path="/stuff/purchase" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffPurchasePage /></ProtectedRoute>} />
        <Route path="/stuff/DetailPurchase" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffDetailPurchasePage /></ProtectedRoute>} />
        <Route path="/incoming" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><IncomingPage /></ProtectedRoute>} />
        <Route path="/incoming/detail/:id" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><IncomingDetailPage /></ProtectedRoute>} />
        <Route path="/incoming/add" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><IncomingAddPage /></ProtectedRoute>} />
        <Route path="/adjust" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><AdjustPage /></ProtectedRoute>} />
        <Route path="/adjust/add" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><AdjustAddPage /></ProtectedRoute>} />
        <Route path="/adjust/balance" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><BalancePage /></ProtectedRoute>} />
        <Route path="/adjust/balance/:id" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><Balance /></ProtectedRoute>} />
        <Route path="/human" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><HumanPage /></ProtectedRoute>} />
        <Route path="/organizations" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><OrganizationsPage /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute allow={["แอดมิน"]}><ReportPage /></ProtectedRoute>} />
        <Route path="/setting" element={<ProtectedRoute allow={["แอดมิน"]}><SettingPage /></ProtectedRoute>} />

        {/* ✅ สำหรับผู้ใช้งานทั่วไป */}
        <Route path="/userstuff" element={<ProtectedRoute allow={["ผู้ใช้งาน", "แอดมิน", "ผู้ช่วยแอดมิน"]}><UserStuffPage /></ProtectedRoute>} />
        <Route path="/user/confirm-history" element={<ProtectedRoute allow={["ผู้ใช้งาน", "แอดมิน", "ผู้ช่วยแอดมิน"]}><UserConfirmHisPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
