"use client"

import { useState } from "react"
import { LogOut, Settings } from "lucide-react"

interface ProfileHeaderProps {
  userName?: string
  onLogout?: () => void
}

export default function ProfileHeader({
  userName = "John Doe",
  onLogout,
}: ProfileHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
            {userName.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            <p className="text-sm text-gray-600">{userName}</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Settings size={20} />
            <span>Options</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  onLogout?.()
                  setShowDropdown(false)
                }}
                className="w-full text-left px-4 py-3 flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
