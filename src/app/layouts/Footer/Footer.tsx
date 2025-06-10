import { Heart, Mail, MapPin } from "lucide-react"
import logopage from "../../assets/Logo_page.png";
export default function Footer() {
  const navigationLinks = [
    { title: "Customize", href: "#" },
    { title: "Gameplay", href: "#" },
    { title: "Merchs", href: "#" },
  ]

  const companyLinks = [
    { title: "About Us", href: "#" },
    { title: "Contact Us", href: "#" },
    { title: "Support", href: "#" },
  ]

  const socialLinks = [
    { title: "TikTok", href: "#" },
    { title: "YouTube", href: "#" },
    { title: "Facebook", href: "#" },
  ]

  return (
    <footer className="bg-gradient-to-br from-pink-300 via-pink-400 to-rose-400/75 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
        <div className="absolute top-12 right-8 w-6 h-6 bg-white rounded-full"></div>
        <div className="absolute bottom-8 left-12 w-4 h-4 bg-white rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={logopage}
                alt="Sweeties Dodging Logo"
                className="h-24 w-24 object-contain mb-4 drop-shadow-lg"
              />
              <h3 className="text-xl font-pixel font-bold text-white mb-2">Sweeties Dodging</h3>
              <p className="text-sm text-white/90 text-center md:text-left leading-relaxed">
                The sweetest dodging game that will keep you entertained for hours!
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-pixel font-bold text-white mb-4 flex items-center justify-center md:justify-start">
              <Heart className="w-4 h-4 mr-2" />
              Game
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/90 hover:text-white font-pixel text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-pixel font-bold text-white mb-4 flex items-center justify-center md:justify-start">
              <MapPin className="w-4 h-4 mr-2" />
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/90 hover:text-white font-pixel text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-pixel font-bold text-white mb-4 flex items-center justify-center md:justify-start">
              <Mail className="w-4 h-4 mr-2" />
              Connect
            </h4>
            <ul className="space-y-3 mb-4">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/90 hover:text-white font-pixel text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/80 font-pixel text-center md:text-left">
              © 2025 Sweeties Dodging. All rights reserved. Made with 💖
            </p>

            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-white/80 hover:text-white font-pixel transition-colors">
                Privacy Policy
              </a>
              <span className="text-white/40">•</span>
              <a href="#" className="text-xs text-white/80 hover:text-white font-pixel transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
