"use client"

import { useState } from "react"
import DashboardOverview from "../../components/admin/dashboardOverview"
import AdminSidebar from "../../components/admin/adminSidebar"
import RoomManagement from "../../components/admin/roomManagement"
import BookingManagement from "../../components/admin/bookingManagement"
import UserManagement from "../../components/admin/userManagement"
import ReportsStatistics from "../../components/admin/reportsAndStatistics"

export default function AdminDashboard() {
  const [currentSection, setCurrentSection] = useState("overview")

  const renderSection = () => {
    switch (currentSection) {
      case "overview":
        return <DashboardOverview />
      case "rooms":
        return <RoomManagement />
      case "bookings":
        return <BookingManagement />
      case "users":
        return <UserManagement />
      case "reports":
        return <ReportsStatistics />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="flex-1 overflow-auto md:ml-0">
        <div className="p-4 md:p-8">{renderSection()}</div>
      </main>
    </div>
  )
}
