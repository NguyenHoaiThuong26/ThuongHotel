"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Star } from "lucide-react"
import { API_BASE_URL } from "../../configuration/configuration"

interface ReviewStatsData {
    averageRating: number
    totalReviews: number
    starCounts: Record<number, number>
}

export default function ReviewStats() {
    const [stats, setStats] = useState<ReviewStatsData | null>(null)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_BASE_URL}/reviews/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await response.json()
            if (data.result) {
                setStats(data.result)
            }
        } catch (error) {
            console.error("Error fetching review stats", error)
        }
    }

    if (!stats) return null

    // Prepare data for distribution chart
    const distributionData = [5, 4, 3, 2, 1].map(star => ({
        name: `${star} Sao`,
        count: stats.starCounts[star] || 0
    }))

    const COLORS = ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold text-slate-800 mb-6 w-full text-left">Tổng quan đánh giá</h3>

                <div className="flex items-center gap-8">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-slate-900 mb-2">{stats.averageRating.toFixed(1)}</div>
                        <div className="flex gap-1 justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={24}
                                    className={`${star <= Math.round(stats.averageRating) ? "fill-yellow-400 text-yellow-400" : "fill-slate-100 text-slate-200"}`}
                                />
                            ))}
                        </div>
                        <p className="text-slate-500 font-medium">{stats.totalReviews} đánh giá</p>
                    </div>

                    <div className="h-32 w-px bg-slate-200 mx-4 hidden md:block"></div>

                    <div className="space-y-2 min-w-[200px]">
                        {distributionData.map((item, index) => {
                            const percentage = stats.totalReviews > 0 ? (item.count / stats.totalReviews) * 100 : 0
                            return (
                                <div key={item.name} className="flex items-center gap-3 text-sm">
                                    <span className="font-medium text-slate-600 w-12">{item.name}</span>
                                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: COLORS[index]
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-slate-400 w-8 text-right">{item.count}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Distribution Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Phân bố đánh giá</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={distributionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={50} tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                                {distributionData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
