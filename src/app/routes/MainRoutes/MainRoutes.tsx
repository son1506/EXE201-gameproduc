import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../../components/NotFound";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import Login from "../../pages/Authentication/Login";
import Home from "../../pages/services/Home";
import UserLayout from "../../layouts/UserLayout";
import SignUp from "../../pages/Authentication/SignUp";
import VerifyRegisterPage from "@/app/pages/Authentication/VerifyPage";
import ForgotPassword from "@/app/pages/Authentication/ForgetPassword/ForgetPassword";
import ResetPassword from "@/app/pages/Authentication/ResetPassword/ResetPassWord";
import ReturnPage from "@/app/pages/services/Payment/ReturnPage";
import PayOSRedirectPage from "@/app/pages/services/Payment/PayOSRedirectPage";
import CancelPage from "@/app/pages/services/Payment/CancelPage";
import RevenuePage from "@/app/pages/Admin/Dashboard/RevenuePage";
import Merchandise from "@/app/pages/services/Merchandise/Merchandise";
import Merchandisedetail from "@/app/pages/services/Merchandise/Merchandisedetail";
import Gameplay from "@/app/pages/services/Gameplay/Gameplay";
import Customize from "@/app/pages/services/Customize/Customize";
import Support from "@/app/pages/services/Support/Support";
import Aboutus from "@/app/pages/services/Aboutus.tsx/Aboutus";
import Contact from "@/app/pages/services/Contact/Contact";
import PaymentDashboard from "../../pages/Admin/Dashboard/Dashboard";
import ProductCRUD from "@/app/pages/Admin/Dashboard/ProductCRUD";
import FeedbackAdmin from "@/app/pages/Admin/Dashboard/Feedbackadmin";




const MainRoutes = () => {
  return (

    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="verify-register" element={<VerifyRegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/merchandise/detail/:productId" element={<Merchandisedetail />} />
        <Route path="/gameplay" element={<Gameplay />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/payos-redirect" element={<PayOSRedirectPage />} />
        <Route path="/return-url" element={<ReturnPage />} />
        <Route path="/cancel-url" element={<CancelPage />} />
      </Route>

      <Route path="" element={<AdminLayout />}>
        <Route path="" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/Product" element={<ProductCRUD />} />
        <Route path="/Feedbackadmin" element={<FeedbackAdmin />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>

  );
};

export default MainRoutes;
