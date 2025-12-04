import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { User, ChevronDown } from "lucide-react"

export type Role = "GUEST" | "USER" | "ADMIN"

interface NavbarProps {
  role: Role
  userName?: string
  onLogout?: () => void
}

export default function Navbar({ role, userName, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  const userMenu = [
    { name: "Trang chủ", path: "/home" },
    { name: "Phòng", path: "/rooms" },
    { name: "Giới thiệu", path: "/about" },
    { name: "Liên hệ", path: "/contact" },
  ]

  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Quản lý phòng", path: "/admin/rooms" },
    { name: "Quản lý đặt phòng", path: "/admin/bookings" },
    { name: "Người dùng", path: "/admin/users" },
    { name: "Cài đặt", path: "/admin/settings" },
  ]

  const menuItems = role === "ADMIN" ? adminMenu : userMenu

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to={role === "ADMIN" ? "/admin/dashboard" : "/home"} className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border 
            ${role === "ADMIN"
                ? "bg-gradient-to-br from-rose-500 to-red-600 border-red-300"
                : "bg-gradient-to-br from-teal-400 to-blue-500 border-teal-300"
              }`}
          >
            <span className="text-white font-bold text-lg">
              {role === "ADMIN" ? "AD" : "HT"}
            </span>
          </div>
          <span className="text-2xl font-serif font-bold text-slate-900 tracking-wide">
            {role === "ADMIN" ? "Admin Panel" : "Thuong Hotel"}
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                to={item.path}
                className={`text-slate-900 hover:${role === "ADMIN" ? "text-red-500" : "text-teal-500"}
                  font-medium transition-all
                  ${location.pathname === item.path
                    ? role === "ADMIN"
                      ? "text-red-500 font-semibold"
                      : "text-teal-500 font-semibold"
                    : ""}`}
              >
                {item.name}
              </Link>

              <div
                className={`absolute left-0 -bottom-1 h-[2px] transition-all
                  ${
                    location.pathname === item.path
                      ? role === "ADMIN"
                        ? "bg-red-500 w-full"
                        : "bg-teal-500 w-full"
                      : "w-0 group-hover:w-full " + (role === "ADMIN" ? "bg-red-500" : "bg-teal-500")
                  }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {role === "GUEST" && (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-teal-500 text-teal-500 font-semibold px-5 hover:bg-teal-50"
                >
                  Đăng nhập
                </Button>
              </Link>

              <Link to="/register">
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-6">
                  Đăng ký
                </Button>
              </Link>
            </>
          )}

          {/* USER + ADMIN → menu + icon */}
          {role !== "GUEST" && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                <User className="w-5 h-5 text-slate-700" />
                <span className="font-medium text-slate-800">{userName}</span>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border">
                  {role === "USER" && (
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Tài khoản của tôi
                    </Link>
                  )}

                  {role === "ADMIN" && (
                    <Link to="/admin/settings" className="block px-4 py-2 hover:bg-gray-100">
                      Cài đặt Admin
                    </Link>
                  )}

                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-7 h-7 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-inner">
          <div className="px-6 py-4 space-y-4">

            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-slate-900 hover:${role === "ADMIN" ? "text-red-500" : "text-teal-500"}
                  font-medium`}
              >
                {item.name}
              </Link>
            ))}

            {role === "GUEST" ? (
              <div className="flex gap-3 pt-4">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full border-teal-500 text-teal-500">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            ) : (
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-red-600 bg-red-50 rounded"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
