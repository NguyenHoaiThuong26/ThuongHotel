import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../../components/ui/button"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Rooms", path: "/rooms" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">LH</span>
          </div>
          <span className="text-xl font-serif font-bold text-slate-900">Luxury Hotels</span>
        </Link>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-slate-600 hover:text-blue-600 transition ${
                location.pathname === item.path ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Buttons (Login / Register / Profile) */}
        <div className="hidden md:flex gap-4">
          {/* Sau này nếu có user login, có thể thay 2 nút này bằng Avatar/Profile */}
          <Link to="/login">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-inner">
          <div className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-slate-600 hover:text-blue-600 ${
                  location.pathname === item.path ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-2 pt-4">
              <Link to="/login" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 bg-transparent"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button className="w-full bg-blue-600">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
