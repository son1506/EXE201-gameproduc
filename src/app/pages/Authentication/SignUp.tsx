import { Button, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAccount } from "../../modules/Authentication/registerAccount";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      message.warning("Vui lòng nhập email.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    try {
      setLoading(true);
      await registerAccount(email);
      setIsEmailSent(true);
      message.success("Email xác thực đã được gửi thành công!");
    } catch (error) {
      console.error("Đăng ký lỗi:", error);
      message.error("Có lỗi xảy ra khi gửi email xác thực.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister(e);
    }
  };

  // Success state - giống như ResetPassword
  if (isEmailSent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-pink-100 to-white">
        <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Email đã được gửi!
              </h1>
              <p className="text-gray-600 mb-6">
                Chúng tôi đã gửi email xác thực đến địa chỉ email của bạn. 
                Vui lòng kiểm tra hộp thư và nhấn vào liên kết trong email để xác thực tài khoản.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Không nhận được email? Hãy kiểm tra thư mục spam hoặc thử lại.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsEmailSent(false);
                  setEmail("");
                }}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition"
              >
                Gửi lại email
              </button>
              
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition"
              >
                Quay lại đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form state - như cũ nhưng có loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg relative">
        {/* Nút quay lại */}
        <button
          onClick={handleGoBack}
          className="absolute left-4 top-4 text-pink-600 hover:text-pink-800 font-medium text-sm"
        >
          ← Go Back
        </button>

        <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center mt-8">Enter your email</h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
            disabled={loading}
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang gửi..." : "Send Verification Email"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-pink-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="underline hover:text-pink-800 font-semibold"
            >
              Sign in now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}