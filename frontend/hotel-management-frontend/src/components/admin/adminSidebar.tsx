"use client"

import { useState } from "react"
import { LogOut, BarChart3, Users, Book, Home, Settings, Menu, X } from "lucide-react"

interface AdminSidebarProps {
  currentSection: string
  onSectionChange: (section: string) => void
}

export default function AdminSidebar({ currentSection, onSectionChange }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: Home },
    { id: "rooms", label: "Room Management", icon: BarChart3 },
    { id: "bookings", label: "Booking Management", icon: Book },
    { id: "users", label: "User Management", icon: Users },
    { id: "reports", label: "Reports & Statistics", icon: BarChart3 },
  ]

  const handleLogout = () => {
    // Logout logic here
    window.location.href = "/login"
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-blue-600 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-slate-900 text-white w-64 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-blue-400">Luxury Hotels</h1>
          <p className="text-xs text-slate-400 mt-1">Admin Dashboard</p>
        </div>

        {/* Navigation menu */}
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                        ? "bg-blue-600 text-white"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"

                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 bg-slate-900 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
