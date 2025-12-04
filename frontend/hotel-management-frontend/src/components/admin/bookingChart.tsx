"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function BookingChart() {
  const data = [
    { month: "Jan", bookings: 400, revenue: 24000 },
    { month: "Feb", bookings: 320, revenue: 19200 },
    { month: "Mar", bookings: 500, revenue: 30000 },
    { month: "Apr", bookings: 470, revenue: 28200 },
    { month: "May", bookings: 600, revenue: 36000 },
    { month: "Jun", bookings: 720, revenue: 43200 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Xu hướng đặt phòng
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="bookings" fill="#3b82f6" name="Số lượt đặt phòng" />
          <Bar dataKey="revenue" fill="#10b981" name="Doanh thu ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
