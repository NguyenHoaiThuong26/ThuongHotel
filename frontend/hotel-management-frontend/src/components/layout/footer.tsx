import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">LH</span>
              </div>
              <span className="text-xl font-serif font-bold">Luxury Hotels</span>
            </div>
            <p className="text-slate-400">Experience the epitome of luxury hospitality.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#home" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="#rooms" className="hover:text-blue-400 transition">Rooms</a></li>
              <li><a href="#amenities" className="hover:text-blue-400 transition">Amenities</a></li>
              <li><a href="#reviews" className="hover:text-blue-400 transition">Reviews</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/login" className="hover:text-blue-400 transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-blue-400 transition">Register</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition">Booking History</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>123 Luxury Avenue, Paradise City</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@luxuryhotels.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400">© 2025 Luxury Hotels. All rights reserved.</p>
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
