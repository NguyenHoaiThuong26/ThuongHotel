"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function BookingTrendsChart() {
  const data = [
    { month: "Jan", confirmed: 120, pending: 25, canceled: 8 },
    { month: "Feb", confirmed: 130, pending: 26, canceled: 10 },
    { month: "Mar", confirmed: 150, pending: 28, canceled: 9 },
    { month: "Apr", confirmed: 165, pending: 27, canceled: 7 },
    { month: "May", confirmed: 180, pending: 30, canceled: 6 },
    { month: "Jun", confirmed: 195, pending: 30, canceled: 5 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Booking Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="confirmed" stackId="1" stroke="#10b981" fill="#10b981" name="Confirmed" />
          <Area type="monotone" dataKey="pending" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Pending" />
          <Area type="monotone" dataKey="canceled" stackId="1" stroke="#ef4444" fill="#ef4444" name="Canceled" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
