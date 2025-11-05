"use client"

import { Download } from "lucide-react"
import RevenueChart from "./revenueChart"
import BookingTrendsChart from "./bookingTrendChart"
import OccupancyByRoomChart from "./occupancyByRoomChart"
import AverageStayChart from "./averageStayChart"

export default function ReportsStatistics() {
  const exportPDF = () => {
    alert("PDF export functionality would be implemented with a PDF library like jsPDF")
  }

  const stats = [
    {
      label: "Average Occupancy Rate",
      value: "78.5%",
      trend: "+5.2% from last month",
      color: "text-blue-600",
    },
    {
      label: "Average Stay Duration",
      value: "3.2 days",
      trend: "+0.5 days from last month",
      color: "text-green-600",
    },
    {
      label: "Revenue Per Available Room",
      value: "$187.50",
      trend: "+12% from last month",
      color: "text-purple-600",
    },
    {
      label: "Guest Satisfaction Score",
      value: "4.7/5",
      trend: "+0.2 points from last month",
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports & Statistics</h1>
          <p className="text-slate-600 mt-1">Comprehensive hotel performance analytics</p>
        </div>
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Download size={20} />
          Export PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart />
        <BookingTrendsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OccupancyByRoomChart />
        <AverageStayChart />
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Monthly Performance Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Month</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Bookings</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Revenue</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Occupancy Rate</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Avg Stay</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Guest Score</th>
              </tr>
            </thead>
            <tbody>
              {[
                { month: "January", bookings: 145, revenue: "$28,500", occupancy: "72%", avgStay: "3.1", score: "4.6" },
                {
                  month: "February",
                  bookings: 156,
                  revenue: "$31,200",
                  occupancy: "75%",
                  avgStay: "3.2",
                  score: "4.7",
                },
                { month: "March", bookings: 178, revenue: "$35,600", occupancy: "80%", avgStay: "3.3", score: "4.8" },
                { month: "April", bookings: 192, revenue: "$38,400", occupancy: "82%", avgStay: "3.4", score: "4.9" },
                { month: "May", bookings: 210, revenue: "$42,000", occupancy: "85%", avgStay: "3.5", score: "4.9" },
                { month: "June", bookings: 225, revenue: "$45,000", occupancy: "88%", avgStay: "3.6", score: "5.0" },
              ].map((row, index) => (
                <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-slate-900">{row.month}</td>
                  <td className="px-4 py-3 text-slate-700">{row.bookings}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">{row.revenue}</td>
                  <td className="px-4 py-3 text-blue-600">{row.occupancy}</td>
                  <td className="px-4 py-3 text-slate-700">{row.avgStay} days</td>
                  <td className="px-4 py-3 text-yellow-600">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
