import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../../components/ui/button"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { name: "Trang chủ", path: "/home" },
    { name: "Phòng", path: "/rooms" },
    { name: "Giới thiệu", path: "/about" },
    { name: "Liên hệ", path: "/contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex
            items-center justify-center border border-teal-300 shadow-md">
            <span className="text-white font-bold text-lg">HT</span>
          </div>
          <span className="text-2xl font-serif font-bold text-slate-900 tracking-wide">
            Thuong Hotel
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                to={item.path}
                className={`text-slate-900 hover:text-teal-500 font-medium tracking-wide transition-all
                  ${location.pathname === item.path ? "text-teal-500 font-semibold" : ""}`}
              >
                {item.name}
              </Link>
              {/* underline */}
              <div className={`absolute left-0 -bottom-1 h-[2px] bg-teal-500 transition-all
                ${location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"}`}>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-4">
          <Link to="/login">
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 font-semibold px-5
                hover:bg-teal-50 hover:scale-105 hover:shadow-md transition-all duration-200"
            >
              Đăng nhập
            </Button>
          </Link>

          <Link to="/register">
            <Button
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-6
                shadow-md hover:shadow-lg hover:scale-105 hover:brightness-105 transition-all duration-200"
            >
              Đăng ký
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-7 h-7 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur-xl shadow-inner">
          <div className="px-6 py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-slate-900 hover:text-teal-500 font-medium transition-all
                  ${location.pathname === item.path ? "text-teal-500 font-semibold" : ""}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-3 pt-4">
              <Link to="/login" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-teal-500 text-teal-500 bg-transparent font-semibold hover:bg-teal-50"
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-md hover:brightness-105"
                >
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
