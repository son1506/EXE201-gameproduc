
import { Button, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import navigate
import { registerAccount } from "../../modules/Authentication/registerAccount"; // API gọi email

export default function SignUp() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email) {
      message.warning("Vui lòng nhập email.");
      return;
    }

    try {
      await registerAccount(email); // Gửi email
      message.success("Email xác thực đã được gửi. Vui lòng kiểm tra hộp thư.");
      navigate("/verify-register"); // 👈 chuyển trang sau khi gửi email thành công
    } catch (error) {
      console.error("Đăng ký lỗi:", error);
      message.error("Có lỗi xảy ra khi gửi email xác thực.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center">Enter your email</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center"
          >
            Send Verification Email
          </Button>
        </form>

      </div>
    </div>
  );
}
