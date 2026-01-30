import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* GRID CHÍNH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo + Giới thiệu */}
          <div>
            <div className="flex gap-2 mb-4 items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex justify-center items-center border border-teal-300 shadow-md">
                <span className="text-white font-bold text-lg">HT</span>
              </div>
              <span className="text-2xl font-serif font-bold text-white">Thuong Hotel</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs text-left">
              Trải nghiệm dịch vụ khách sạn sang trọng, thoải mái và chuyên nghiệp.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/home" className="hover:text-teal-500 transition block">Trang chủ</Link></li>
              <li><Link to="/all-rooms" className="hover:text-teal-500 transition block">Phòng</Link></li>
              <li><Link to="/my-bookings" className="hover:text-teal-500 transition block">Lịch sử đặt phòng</Link></li>
              <li><Link to="/about" className="hover:text-teal-500 transition block">Giới thiệu</Link></li>
              <li><Link to="/contact" className="hover:text-teal-500 transition block">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Tài khoản */}
          <div>
            <h4 className="font-semibold text-white mb-4">Tài khoản</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/login" className="hover:text-teal-500 transition block">Đăng nhập</Link></li>
              <li><Link to="/register" className="hover:text-teal-500 transition block">Đăng ký</Link></li>
              <li><Link to="/my-bookings" className="hover:text-teal-500 transition block">Lịch sử đặt phòng</Link></li>
              <li><Link to="/profile" className="hover:text-teal-500 transition block">Hồ sơ người dùng</Link></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-teal-500 flex-shrink-0" />
                <span>Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-teal-500 flex-shrink-0" />
                <span>0938 998 972</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-teal-500 flex-shrink-0" />
                <span>gnouht26@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Chân trang */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-slate-400 text-sm">© 2025 Thuong Hotel. Bảo lưu mọi quyền.</p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-teal-500 transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-teal-500 transition"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-teal-500 transition"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
