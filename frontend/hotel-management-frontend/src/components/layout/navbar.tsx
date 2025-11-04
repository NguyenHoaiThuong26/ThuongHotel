import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">LH</span>
          </div>
          <span className="text-xl font-serif font-bold text-slate-900">Luxury Hotels</span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-slate-600 hover:text-blue-600 transition">Home</a>
          <a href="#rooms" className="text-slate-600 hover:text-blue-600 transition">Rooms</a>
          <a href="#amenities" className="text-slate-600 hover:text-blue-600 transition">Amenities</a>
          <a href="#reviews" className="text-slate-600 hover:text-blue-600 transition">Reviews</a>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-4">
          <Link to="/login">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 py-4 space-y-3">
            <a href="#home" className="block text-slate-600 hover:text-blue-600">Home</a>
            <a href="#rooms" className="block text-slate-600 hover:text-blue-600">Rooms</a>
            <a href="#amenities" className="block text-slate-600 hover:text-blue-600">Amenities</a>
            <a href="#reviews" className="block text-slate-600 hover:text-blue-600">Reviews</a>
            <div className="flex gap-2 pt-4">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 bg-transparent">Login</Button>
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
