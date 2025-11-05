"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function RevenueChart() {
  const data = [
    { month: "Jan", revenue: 28500, target: 30000 },
    { month: "Feb", revenue: 31200, target: 30000 },
    { month: "Mar", revenue: 35600, target: 32000 },
    { month: "Apr", revenue: 38400, target: 35000 },
    { month: "May", revenue: 42000, target: 40000 },
    { month: "Jun", revenue: 45000, target: 45000 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Revenue Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number | string) => `$${value}`} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Actual Revenue" />
          <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
