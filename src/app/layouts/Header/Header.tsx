
import { Button } from "antd"

export default function Header() {
  return (
    <header className="bg-pink-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="text-2xl font-bold text-pink-500">
                SWEETIES
                <div className="text-sm font-medium">DOGMA</div>
              </div>
            </a>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/customize" 
              className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              Customize
            </a>
            <a 
              href="/gameplay" 
              className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              Gameplay
            </a>
            <a 
              href="/merchandise" 
              className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              Merchandise
            </a>
            <a 
              href="/support" 
              className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              Support
            </a>
            <a 
              href="/about" 
              className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              About Us
            </a>
            <a 
              href="/contact" 
              className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Auth Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="/login" 
              className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              Log in
            </a>
            <a 
              href="/signup" 
              className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              Sign up
            </a>
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
  )
}