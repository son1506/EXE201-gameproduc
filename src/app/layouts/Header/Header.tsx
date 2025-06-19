import { Button, message } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X, User, LogOut } from "lucide-react"
import logopage from "../../assets/Logo_page.png";

export default function Header() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accountName, setAccountName] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn")
    const storedName = localStorage.getItem("accountName")
    setIsLoggedIn(status === "true")
    setAccountName(storedName || "")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("accountName")
    setIsLoggedIn(false)
    setAccountName("")
    message.success("Logout successful")
    navigate("/")
  }

  const navigationItems = [
    { name: "Customize", href: "/customize" },
    { name: "Gameplay", href: "/gameplay" },
    { name: "Merchandise", href: "/merchandise" },
    { name: "Support", href: "/support" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-gradient-to-r from-pink-50 to-rose-50 border-b-4 border-pink-200 shadow-lg fixed top-0 left-0 right-0 z-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 left-10 w-6 h-6 bg-pink-300 rounded-full"></div>
        <div className="absolute top-8 right-20 w-4 h-4 bg-rose-300 rounded-full"></div>
        <div className="absolute bottom-2 left-1/3 w-3 h-3 bg-pink-400 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-3 group">
              <img
                src={logopage}
                alt="Sweeties Dodging Logo"
                className="h-14 w-14 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-pixel font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  SWEETIES
                </h1>
                <p className="text-sm font-pixel text-pink-400 -mt-1">DODGING</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-pixel text-sm font-bold hover:from-pink-500 hover:to-rose-500 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth Links */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/50 rounded-full">
                  <User className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-pixel text-pink-600 font-bold">{accountName}</span>
                </div>
                <a
                  href="#logout"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLogout()
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-white rounded-full font-pixel text-sm font-bold hover:from-teal-500 hover:to-cyan-500 transform hover:scale-105 transition-all duration-200 shadow-md cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-white rounded-full font-pixel text-sm font-bold hover:from-teal-500 hover:to-cyan-500 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-full font-pixel text-sm font-bold hover:from-emerald-500 hover:to-teal-500 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Sign up
                </a>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                type="text"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full bg-pink-100 text-pink-500 hover:bg-pink-200 border-none shadow-none"
                icon={isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-pink-200 shadow-lg z-50">
            <div className="px-4 py-6 space-y-3">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-pink-400 to-rose-400 text-white font-pixel text-sm font-bold text-center hover:from-pink-500 hover:to-rose-500 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              {!isLoggedIn && (
                <div className="pt-4 border-t border-pink-200 space-y-2">
                  <a
                    href="/login"
                    className="block px-4 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-pixel text-sm font-bold text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log in
                  </a>
                  <a
                    href="/signup"
                    className="block px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-pixel text-sm font-bold text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}