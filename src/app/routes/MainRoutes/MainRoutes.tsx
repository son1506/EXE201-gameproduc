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
const MainRoutes = () => {
  return (

    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="verify-register" element={<VerifyRegisterPage />} />

      <Route path="" element={<AdminLayout />}>
        <Route path="" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>

  );
};

export default MainRoutes;
