"use client"

import { Users, Home, Calendar, DollarSign } from "lucide-react"
import StatCard from "./statCard"
import BookingChart from "./bookingChart"
import OccupancyChart from "./occupancyChart"

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Rooms",
      value: "120",
      change: "+5 this month",
      icon: Home,
      bgColor: "bg-blue-500",
    },
    {
      title: "Available Rooms",
      value: "45",
      change: "+12% from yesterday",
      icon: Home,
      bgColor: "bg-green-500",
    },
    {
      title: "Total Bookings",
      value: "287",
      change: "+18 this week",
      icon: Calendar,
      bgColor: "bg-purple-500",
    },
    {
      title: "Revenue This Month",
      value: "$124,850",
      change: "+22% from last month",
      icon: DollarSign,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Total Users",
      value: "1,234",
      change: "+89 new registrations",
      icon: Users,
      bgColor: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here's your hotel performance at a glance.</p>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BookingChart />
        <OccupancyChart />
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { type: "Booking", message: "New booking #BK-001234 from John Doe", time: "2 hours ago" },
            { type: "Room", message: "Room #105 marked as maintenance", time: "4 hours ago" },
            { type: "User", message: "New admin user registered", time: "6 hours ago" },
            { type: "Revenue", message: "Payment received for booking #BK-001220", time: "8 hours ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-start justify-between border-b border-slate-200 pb-3 last:border-0">
              <div>
                <p className="font-medium text-slate-900">{activity.type}</p>
                <p className="text-sm text-slate-600">{activity.message}</p>
              </div>
              <p className="text-xs text-slate-500 whitespace-nowrap ml-4">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
