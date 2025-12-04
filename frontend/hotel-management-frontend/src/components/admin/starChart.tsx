"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function RatingChart() {

  // Dữ liệu mẫu (sau này bạn có thể thay bằng API)
  const data = [
    { month: "Jan", star1: 5, star2: 12, star3: 20, star4: 28, star5: 35 },
    { month: "Feb", star1: 3, star2: 10, star3: 18, star4: 22, star5: 40 },
    { month: "Mar", star1: 8, star2: 15, star3: 25, star4: 30, star5: 50 },
    { month: "Apr", star1: 6, star2: 14, star3: 22, star4: 33, star5: 45 },
    { month: "May", star1: 4, star2: 11, star3: 19, star4: 27, star5: 38 },
    { month: "Jun", star1: 7, star2: 13, star3: 23, star4: 35, star5: 55 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Thống kê số sao đánh giá theo tháng</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />

          {/* 5 đường biểu diễn số lượng sao */}
          <Line type="monotone" dataKey="star1" name="1 Sao" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="star2" name="2 Sao" stroke="#f97316" strokeWidth={2} />
          <Line type="monotone" dataKey="star3" name="3 Sao" stroke="#eab308" strokeWidth={2} />
          <Line type="monotone" dataKey="star4" name="4 Sao" stroke="#22c55e" strokeWidth={2} />
          <Line type="monotone" dataKey="star5" name="5 Sao" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
