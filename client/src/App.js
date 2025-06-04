import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Public Pages
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ForgetPassword from "./pages/Forget Password/ForgetPassword";
import ResetPassword from "./pages/Reset Password/ResetPassword";
import EmailVerification from "./pages/Email Verification/Email_Verification";

// Admin/Assistant Pages
import ConsumablePage from "./pages/Consumable/ConsumablePage";
import CategorizePage from "./pages/Consumable/Categorize/CategorizePage";
import StuffPage from "./pages/Stuff/StuffPage";
import StuffTrackPage from './pages/Stuff/StuffTrackPage';
import StuffPurchasePage from './pages/Stuff/StuffPurchasePage';
import StuffDetailPage from './pages/Stuff/StuffDetailPage';
import StuffDetailTrackPage from './pages/Stuff/StuffDetailTrackPage';
import StuffDetailPurchasePage from './pages/Stuff/StuffDetailPurchasePage';
import PrintPurchasePage from "./components/Stuff/PrintPurchase/PrintPurchase";
import PrintTrackPage from "./user_pages/UserStuff/PrintTrackPage";
import IncomingPage from "./pages/Incoming/IncomingPage";
import IncomingDetailPage from "./pages/Incoming/IncomingDetailPage";
import IncomingAddPage from "./pages/Incoming/IncomingAddPage";
import AdjustPage from "./pages/Adjust/AdjustPage";
import AdjustBalancePage from './pages/Adjust/AdjustBalancePage';
import AdjustAddPage from "./pages/Adjust/AdjustAddPage";
import HumanPage from "./pages/Human/HumanPage";
import OrganizationsPage from "./pages/Organizations/OrganizationsPage";
import ReportPage from "./pages/Report/ReportPage";
import SettingPage from "./pages/Setting/SettingPage";

// ผู้ใช้งานทั่วไป
import UserConfirmHisPage from "./user_pages/UserStuff/UserConfirmHisPage";
import UserStuffTablePage from "./user_pages/UserStuff/UserStuffTablePage";
import UserFollowTablePage from "./user_pages/UserStuff/UserFollowTablePage";
import UserMoreTablePage from "./user_pages/UserStuff/UserMoreTablePage";
import UserMoreDetailPage from "./user_pages/UserStuff/UserMoreDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  Public Pages */}
        <Route index element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/verification" element={<EmailVerification />} />

        {/*  Admin/Assistant Pages */}
        <Route path="/consumable" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><ConsumablePage /></ProtectedRoute>} />
        <Route path="/consumable/categorize" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><CategorizePage /></ProtectedRoute>} />
        <Route path="/stuff" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffPage /></ProtectedRoute>} />
        <Route path="/stuff/detail" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffDetailPage /></ProtectedRoute>} />
        <Route path="/stuff/DetailTrack" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffDetailTrackPage /></ProtectedRoute>} />
        <Route path="/stuff/track" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffTrackPage /></ProtectedRoute>} />
        <Route path="/stuff/purchase" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffPurchasePage /></ProtectedRoute>} />
        <Route path="/stuff/DetailPurchase" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><StuffDetailPurchasePage /></ProtectedRoute>} />
        <Route path="/stuff/print-purchase" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><PrintPurchasePage /></ProtectedRoute>} />
        <Route path="/incoming" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><IncomingPage /></ProtectedRoute>} />
        <Route path="/incoming/detail/:id" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><IncomingDetailPage /></ProtectedRoute>} />
        <Route path="/incoming/add" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><IncomingAddPage /></ProtectedRoute>} />
        <Route path="/adjust" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><AdjustPage /></ProtectedRoute>} />
        <Route path="/adjust/add" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><AdjustAddPage /></ProtectedRoute>} />
        <Route path="/adjust/balance" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><AdjustBalancePage /></ProtectedRoute>} />
        <Route path="/adjust/balance/:id" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><AdjustBalancePage /></ProtectedRoute>} />
        <Route path="/human" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><HumanPage /></ProtectedRoute>} />
        <Route path="/organizations" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><OrganizationsPage /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><ReportPage /></ProtectedRoute>} />
        <Route path="/setting" element={<ProtectedRoute allow={["แอดมิน", "ผู้ช่วยแอดมิน"]}><SettingPage /></ProtectedRoute>} />

        {/* User Pages */}
        <Route path="/userstuff/stuff" element={<ProtectedRoute allow={["ผู้ใช้งาน"]}><UserStuffTablePage /></ProtectedRoute>} />
        <Route path="/userstuff/follow" element={<ProtectedRoute allow={["ผู้ใช้งาน"]}><UserFollowTablePage /></ProtectedRoute>} />
        <Route path="/user/confirm-status" element={<ProtectedRoute allow={["ผู้ใช้งาน"]}><UserConfirmHisPage /></ProtectedRoute>} />
        <Route path="/userstuff/more" element={<ProtectedRoute allow={["ผู้ใช้งาน"]}><UserMoreTablePage /></ProtectedRoute>} />
        <Route path="/userstuff/more/detail" element={<ProtectedRoute allow={["ผู้ใช้งาน"]}><UserMoreDetailPage /></ProtectedRoute>} />
        <Route path="/userstuff/follow/print-track" element={<ProtectedRoute allow={["ผู้ใช้งาน"]}><PrintTrackPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
