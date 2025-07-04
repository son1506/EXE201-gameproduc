// src/pages/VerifyRegisterPage.jsx
import { Button, Input, message } from "antd";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import verifyRegisterAccount from "../../modules/Authentication/verifyRegister";

export default function VerifyRegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get("verificationToken") || "";

  const [formData, setFormData] = useState({
    accountName: "",
    accountPassword: "",
    verificationToken,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const { accountName, accountPassword, verificationToken } = formData;

    if (!accountName || !accountPassword) {
      message.warning("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!verificationToken) {
      message.warning("Verification token is missing.");
      return;
    }

    try {
      await verifyRegisterAccount(accountName, accountPassword, verificationToken);

      // ✅ Lưu thông tin đăng nhập
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("accountName", accountName);

      message.success("Xác minh thành công. Bạn đã được đăng nhập.");
      navigate("/"); // hoặc navigate("/dashboard") nếu có
    } catch (error) {
      console.error("Xác minh lỗi:", error);
      message.error(error.message || "Có lỗi xảy ra khi xác minh đăng ký.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center">Verify Your Account</h1>
        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            name="accountName"
            placeholder="Account Name"
            value={formData.accountName}
            onChange={handleChange}
            className="w-full h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Input.Password
            name="accountPassword"
            placeholder="Password"
            value={formData.accountPassword}
            onChange={handleChange}
            className="w-full h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center"
          >
            Sign Up Account
          </Button>
        </form>
      </div>
    </div>
  );
}
