import React, { useState } from "react";
import { Link } from "react-router-dom";
import forgotPassword from "../../../modules/Authentication/forgotPassWord";
import { message } from "antd";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      message.error("Please enter email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      setIsEmailSent(true);
      message.success("Reset token has been sent to your email!");
    } catch (error) {
      console.error("Forgot password error:", error);
      message.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

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
                Email has been sent!
              </h1>
              <p className="text-gray-600 mb-6">
                We have sent a password reset token to your email address. 
                Please check your inbox and click the link in the email to reset your password.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Didn't receive email? Check spam folder or try again.
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
                Resend email
              </button>
              
              <Link
                to="/login"
                className="block w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition text-center"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-pink-100 to-white">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-pink-600 mb-4">
            Forgot password?
          </h1>
          <p className="text-gray-600">
            Don't worry! Enter your email address and we will send you a reset token.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 rounded-md border border-pink-300 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

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
                Sending...
              </div>
            ) : (
              "Send reset token"
            )}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-pink-600">
            Remember your password?{" "}
            <Link to="/login" className="underline hover:text-pink-800 font-semibold">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;