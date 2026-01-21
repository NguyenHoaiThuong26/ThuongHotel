"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartProps {
  data: any[];
}

export default function BookingChart({ data }: ChartProps) {

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
