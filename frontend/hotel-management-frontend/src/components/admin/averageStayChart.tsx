"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AverageStayChart() {
  const data = [
    { month: "Jan", avgStay: 3.1, revenue: 28500 },
    { month: "Feb", avgStay: 3.2, revenue: 31200 },
    { month: "Mar", avgStay: 3.3, revenue: 35600 },
    { month: "Apr", avgStay: 3.4, revenue: 38400 },
    { month: "May", avgStay: 3.5, revenue: 42000 },
    { month: "Jun", avgStay: 3.6, revenue: 45000 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Average Stay Duration vs Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="avgStay" name="Avg Stay (days)" />
          <YAxis type="number" dataKey="revenue" name="Revenue ($)" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value) =>
              typeof value === "number" ? (value > 100 ? `$${value}` : `${value.toFixed(1)} days`) : value
            }
          />
          <Scatter name="Performance" data={data} fill="#8b5cf6" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
