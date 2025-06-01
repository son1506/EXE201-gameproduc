import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import resetPassword from "../../../modules/Authentication/resetPassword";
import { message } from "antd";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!token.trim()) {
      message.error("Vui lòng nhập mã token.");
      return;
    }

    if (!newPassword.trim()) {
      message.error("Vui lòng nhập mật khẩu mới.");
      return;
    }

    if (newPassword.length < 6) {
      message.error("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(token, newPassword);
      // Chuyển về trang login sau khi đặt lại mật khẩu thành công
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-pink-100 to-white">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-pink-600 mb-4">
            Đặt lại mật khẩu
          </h1>
          <p className="text-gray-600">
            Nhập mã token từ email và mật khẩu mới của bạn để hoàn tất việc đặt lại mật khẩu.
          </p>
        </div>

        <div className="space-y-6">
          {/* Token Field */}
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
              Mã token <span className="text-red-500">*</span>
            </label>
            <input
              id="token"
              type="text"
              placeholder="Nhập mã token từ email"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* New Password Field */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              disabled={isLoading}
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                ❌ Mật khẩu xác nhận không khớp
              </p>
            )}
            {confirmPassword && newPassword === confirmPassword && newPassword.length >= 6 && (
              <p className="text-sm text-green-600 mt-1">
                ✓ Mật khẩu khớp
              </p>
            )}
          </div>

          {/* Reset Password Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-3 font-bold rounded-md transition ${
              isLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-pink-600 text-white hover:bg-pink-700"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang đặt lại mật khẩu...
              </div>
            ) : (
              "Đặt lại mật khẩu"
            )}
          </button>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-pink-600">
            Chưa có mã token?{" "}
            <Link to="/forgot-password" className="underline hover:text-pink-800 font-semibold">
              Gửi lại email
            </Link>
          </p>
          <p className="text-pink-600">
            Nhớ mật khẩu rồi?{" "}
            <Link to="/login" className="underline hover:text-pink-800 font-semibold">
              Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;