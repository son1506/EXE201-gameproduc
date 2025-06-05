import { MailOutlined, ClockCircleOutlined } from "@ant-design/icons";
import logopage from "../../assets/Logo_page.png";

export default function Footer() {
  return (
    <footer className="bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* E&M Soft Section */}
          <div>
            <h3 className="text-gray-700 font-medium mb-4">E&M Soft</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              A revolutionary gaming experience where dreams become reality.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-gray-700 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-500 hover:text-teal-500 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/gameplay" className="text-gray-500 hover:text-teal-500 text-sm">
                  Gameplay
                </a>
              </li>
              <li>
                <a href="/news" className="text-gray-500 hover:text-teal-500 text-sm">
                  News
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-500 hover:text-teal-500 text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-gray-700 font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-500 hover:text-teal-500 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-500 hover:text-teal-500 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-500 hover:text-teal-500 text-sm">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-gray-700 font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-500 text-sm">
                <MailOutlined className="mr-2" />
                <span>support@Anox's Dream.com</span>
              </li>
              <li className="flex items-center text-gray-500 text-sm">
                <ClockCircleOutlined className="mr-2" />
                <span>24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo Section */}
        <div className="mt-12 flex flex-col items-center">
          <img
            src={logopage}
            alt="Sweeties Dogma Logo"
            className="h-[200px] w-auto object-contain mb-4"
          />

          <div className="mt-4 text-sm text-gray-400">
            © 2025 Sweeties Dogma. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
