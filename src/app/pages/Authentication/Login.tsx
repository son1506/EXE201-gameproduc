import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: Bạn có thể thêm logic kiểm tra đăng nhập ở đây
    // Sau đó chuyển về trang Home
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-pink-100 to-white">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-pink-600 mb-8 text-center">
          Log in to your account
        </h1>

        <div className="flex justify-center mb-8 space-x-4">
          <Link
            to="/signup"
            className="w-28 py-2 rounded-lg bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition text-center"
          >
            Sign up
          </Link>
          <button
            className="w-28 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
            aria-pressed="true"
          >
            Log in
          </button>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Username or email"
            className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-pink-600 text-white font-bold rounded-md hover:bg-pink-700 transition"
          >
            Log in
          </button>
        </div>

        <p className="mt-6 text-center text-pink-600">
          Not a member?{" "}
          <Link to="/signup" className="underline hover:text-pink-800">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
