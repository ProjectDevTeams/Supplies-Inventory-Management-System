import { BrowserRouter, Route, Routes } from "react-router-dom";

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
// import UserStuffPage from "./user_pages/UserStuff/UserStuffPage";
import UserConfirmHisPage from "./user_pages/UserStuff/UserConfirmHisPage";
/////////////////////////

import UserStuffTablePage from "./user_pages/UserStuff/UserStuffTablePage";
import UserFollowTablePage from "./user_pages/UserStuff/UserFollowTablePage";
// import UserHistoryTablePage from "./user_pages/UserStuff/UserHistoryTablePage";
import UserMoreTablePage from "./user_pages/UserStuff/UserMoreTablePage";
import UserMoreDetailPage from "./user_pages/UserStuff/UserMoreDetailPage";
// import UserMoreAddPage from "./user_pages/UserStuff/UserMoreAddPage";



/////////////////////////

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Public Pages */}
        <Route index element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/verification" element={<EmailVerification />} />

        {/* ✅ ทุกหน้าเข้าถึงได้โดยไม่ต้องมีสิทธิ์
        <Route path="/userstuff" element={<UserStuffPage />} /> */}
        <Route path="/user/confirm-status" element={<UserConfirmHisPage />} />        
        <Route path="/consumable" element={<ConsumablePage />} />
        <Route path="/consumable/categorize" element={<CategorizePage />} />
        <Route path="/stuff" element={<StuffPage />} />
        <Route path="/stuff/detail" element={<StuffDetailPage />} />
        <Route path="/stuff/DetailTrack" element={<StuffDetailTrackPage />} />
        <Route path="/stuff/track" element={<StuffTrackPage />} />
        <Route path="/stuff/purchase" element={<StuffPurchasePage />} />
        <Route path="/stuff/DetailPurchase" element={<StuffDetailPurchasePage />} />
        <Route path="/stuff/print-purchase" element={<PrintPurchasePage />} />
        <Route path="/userstuff/follow/print-track" element={<PrintTrackPage />} />
        <Route path="/incoming" element={<IncomingPage />} />
        <Route path="/incoming/detail/:id" element={<IncomingDetailPage />} />
        <Route path="/incoming/add" element={<IncomingAddPage />} />
        <Route path="/adjust" element={<AdjustPage />} />
        <Route path="/adjust/add" element={<AdjustAddPage />} />
        <Route path="/adjust/balance" element={<AdjustBalancePage />} />
        <Route path="/adjust/balance/:id" element={<AdjustBalancePage />} />
        <Route path="/human" element={<HumanPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/setting" element={<SettingPage />} />

        <Route path="/userstuff/stuff" element={<UserStuffTablePage />} />
        <Route path="/userstuff/follow" element={<UserFollowTablePage />} />
        {/* <Route path="/userstuff/history" element={<UserHistoryTablePage />} /> */}

        <Route path="/userstuff/more" element={<UserMoreTablePage />} />
        <Route path="/userstuff/more/detail" element={<UserMoreDetailPage />} />

        {/* <Route path="/userstuff/more/add" element={<UserMoreAddPage />} /> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
