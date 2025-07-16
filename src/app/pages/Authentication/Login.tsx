import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginAccount from "../../modules/Authentication/loginAccount";
import { message } from "antd";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      message.warning("Please enter both email and password!");
      return;
    }

    try {
      setLoading(true);
      const result = await loginAccount(email, password);

      if (result.success) {
        // Save token and information to localStorage
        localStorage.setItem("token", result.result); // result.result contains JWT token
        localStorage.setItem("authToken", result.result); // Backup with different key
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("accountName", email); // Save email as accountName to sync with Header
        
        message.success("Login successful!");
        // Ensure localStorage is updated before navigate
        setTimeout(() => navigate("/"), 0); // Small delay to ensure state is updated
      } else {
        message.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // go back to previous page
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-pink-100 to-white">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md relative">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="absolute left-4 top-4 text-pink-600 hover:text-pink-800 font-medium text-sm"
        >
          ← Go Back
        </button>

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
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "..." : "Log in"}
          </button>
        </div>

        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
            disabled={loading}
          />
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
            disabled={loading}
            className="w-full py-3 bg-pink-600 text-white font-bold rounded-md hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
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