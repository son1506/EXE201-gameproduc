// src/components/Header.jsx
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logopage from "../../assets/Logo_page.png";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    const storedName = localStorage.getItem("accountName");
    setIsLoggedIn(status === "true");
    setAccountName(storedName || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accountName");
    setIsLoggedIn(false);
    setAccountName("");
    message.success("Logout successful");
    navigate("/");
  };

  return (
    <header className="bg-pink-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <img src={logopage} alt="Logo" className="h-[100px] w-auto object-contain" />
            </a>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/customize" className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors">Customize</a>
            <a href="/gameplay" className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors">Gameplay</a>
            <a href="/merchandise" className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors">Merchandise</a>
            <a href="/support" className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors">Support</a>
            <a href="/about" className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors">About Us</a>
            <a href="/contact" className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors">Contact</a>
          </nav>

          {/* Auth Links */}
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                {/* <span className="text-sm text-gray-600">Hi, <strong>{accountName}</strong></span> */}
                <a
                  href="#logout"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  className="text-teal-500 hover:text-teal-600 font-medium text-sm cursor-pointer"
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="text-teal-500 hover:text-teal-600 font-medium text-sm">
                  Log in
                </a>
                <a href="/signup" className="text-teal-500 hover:text-teal-600 font-medium text-sm">
                  Sign up
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              type="text"
              className="text-teal-500"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}
