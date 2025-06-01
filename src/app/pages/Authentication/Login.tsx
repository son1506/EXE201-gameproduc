import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginAccount from "../../modules/Authentication/loginAccount"; // Ensure this path is correct
import Cookies from "js-cookie";
import { message } from "antd";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Move handleLogin inside the component
  const handleLogin = async () => {
    try {
      const result = await loginAccount(email, password);

      // Assuming the response contains a token
      if (result.token) {
        Cookies.set("__atok", result.token);
      }

      navigate("/");
      message.success("Login successful"); // Fix the message text
    } catch (error) {
      // Since the error is handled in loginAccount, you might still want to show a failure message
      message.error("Login failed. Please try again.");
    }
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
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          
          {/* Forgot Password Link */}
          <div className="text-right">
            <Link 
              to="/forgot-password" 
              className="text-sm text-pink-600 hover:text-pink-800 hover:underline transition"
            >
              Forgot your password?
            </Link>
          </div>

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