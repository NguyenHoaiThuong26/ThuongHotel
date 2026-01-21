"use client"

import { useState } from "react"
import { LogOut, BarChart3, Users, Book, Home, Menu, X } from "lucide-react"
import { hasRoleSync } from "../../utils/auth"

interface AdminSidebarProps {
  currentSection: string
  onSectionChange: (section: string) => void
  userRoles?: string[]
}

export default function AdminSidebar({ currentSection, onSectionChange, userRoles = [] }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  const isStaffOnly = hasRoleSync(userRoles, "STAFF") && !hasRoleSync(userRoles, "ADMIN")
  const isReceptionist = hasRoleSync(userRoles, "RECEPTIONIST") && !hasRoleSync(userRoles, "ADMIN")

  const allMenuItems = [
    { id: "overview", label: "Tổng quan Dashboard", icon: Home },
    { id: "room-types", label: "Quản lý loại phòng", icon: Book },
    { id: "rooms", label: "Quản lý phòng", icon: BarChart3 },
    { id: "bookings", label: "Quản lý đặt phòng", icon: Book },
    { id: "users", label: "Quản lý người dùng", icon: Users },
    { id: "profile", label: "Thông tin tài khoản", icon: Users },
    { id: "checkin", label: "Quét mã Check-in", icon: BarChart3 },
  ]

  let menuItems = allMenuItems

  if (isStaffOnly) {
    menuItems = allMenuItems.filter(item => item.id === "rooms" || item.id === "bookings" || item.id === "profile")
  } else if (isReceptionist) {
    menuItems = allMenuItems.filter(item => item.id === "rooms" || item.id === "bookings" || item.id === "checkin" || item.id === "profile")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <>
      {/* Nút bật/tắt cho mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-teal-600 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-slate-900 text-white w-64 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-teal-400">Luxury Hotels</h1>
          <p className="text-xs text-slate-400 mt-1">Bảng điều khiển quản trị</p>
        </div>

        {/* Menu điều hướng */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                  ? "bg-teal-600 text-white"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Nút đăng xuất */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 bg-slate-900 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Overlay cho mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
