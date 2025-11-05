import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* GRID CHÍNH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo + Intro */}
          <div>
            <div className="flex gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex justify-center">
                <span className="text-white font-bold text-sm">LH</span>
              </div>
              <span className="text-xl font-serif font-bold">Luxury Hotels</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs text-left">
              Experience the epitome of luxury hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#home" className="hover:text-blue-400 transition block">Home</a></li>
              <li><a href="#rooms" className="hover:text-blue-400 transition block">Rooms</a></li>
              <li><a href="#amenities" className="hover:text-blue-400 transition block">Amenities</a></li>
              <li><a href="#reviews" className="hover:text-blue-400 transition block">Reviews</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/login" className="hover:text-blue-400 transition block">Login</Link></li>
              <li><Link to="/register" className="hover:text-blue-400 transition block">Register</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition block">Booking History</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>123 Luxury Avenue, Paradise City</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>info@luxuryhotels.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-slate-400 text-sm">© 2025 Luxury Hotels. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-blue-400 transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-blue-400 transition"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-blue-400 transition"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
