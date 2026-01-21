"use client"

import { Home, Calendar, DollarSign, Users } from "lucide-react"
import StatCard from "./statCard"
import BookingChart from "./bookingChart"
import OccupancyChart from "./occupancyChart"
import ReviewStats from "./reviewStats"
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../configuration/configuration"

export default function DashboardOverview() {
  // Default to current month/year view? 
  // Let's typically show last 30 days or current Month.
  const today = new Date().toISOString().split('T')[0];
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(lastMonth);
  const [endDate, setEndDate] = useState(today);

  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0, // Still need fetch Rooms for this? Or separate API?
    // The new Stats API gives Revenue/Bookings.
    // We still need Rooms count for Occupancy.
    bookedRooms: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeBookings: 0
  });

  const [bookingChartData, setBookingChartData] = useState<any[]>([]);
  const [occupancyData, setOccupancyData] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]); // Refetch when dates change

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      // 1. Fetch Stats API
      const statsRes = await fetch(`${API_BASE_URL}/statistics?startDate=${startDate}&endDate=${endDate}`, { headers });
      const statsData = await statsRes.json();
      const s = statsData.result;

      // 2. Fetch Rooms (for total/available real-time snapshot) - Independent of Date Range usually
      const roomsRes = await fetch(`${API_BASE_URL}/rooms`, { headers });
      const roomsData = await roomsRes.json();
      const rooms = roomsData.result || [];
      const totalRooms = rooms.length;
      const availableRooms = rooms.filter((r: any) => r.status === 'AVAILABLE').length;

      // Update Stats State
      setStats({
        totalRooms,
        availableRooms,
        bookedRooms: totalRooms - availableRooms, // Real-time
        totalBookings: s ? s.totalBookingRequest : 0, // From Range
        totalRevenue: s ? s.totalRevenue : 0, // From Range
        activeBookings: s ? s.activeBookings : 0 // From Range (Active in that period? The logic in Service: Booked/CheckedIn)
      });

      // Update Charts
      if (s && s.revenueTrend) {
        const chartData = s.revenueTrend.map((m: any) => ({
          month: m.month,
          bookings: m.bookings,
          revenue: m.revenue
        }));
        setBookingChartData(chartData);
      }

      setOccupancyData([
        { name: "Còn trống", value: availableRooms },
        { name: "Đang sử dụng", value: totalRooms - availableRooms },
        { name: "Bảo trì/Khác", value: 0 }, // TODO
      ]);

      // Recent Activity - Can't get from Stats API?
      // Maybe we still need to fetch Bookings for Recent Activity table?
      // Or add `recentBookings` to StatsResponse.
      // For now, let's keep fetching bookings for Recent Activity, but limited?
      // Or just fetch all bookings like before? The user wanted "Correct Stats", maybe unrelated to Recent Activity.
      // I will fetch bookings separately for Recent Activity list, but maybe lighter query?
      // Let's reuse /bookings endpoint but just take top 5.

      const bookingsRes = await fetch(`${API_BASE_URL}/bookings`, { headers });
      const bookingsData = await bookingsRes.json();
      const bookings = bookingsData.result || [];
      const sortedBookings = bookings.sort((a: any, b: any) =>
        new Date(b.createdAt || b.checkIn).getTime() - new Date(a.createdAt || a.checkIn).getTime()
      ).slice(0, 5);

      setRecentActivity(sortedBookings.map((b: any) => ({
        type: "Đặt phòng",
        message: `${b.guestName || "Khách"} đặt phòng ${b.roomNumber} (${b.roomType})`,
        time: new Date(b.createdAt || b.checkIn).toLocaleDateString()
      })));

    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const statCards = [
    {
      title: "Tổng số phòng",
      value: stats.totalRooms.toString(),
      change: "Phòng hiện có",
      icon: Home,
      bgColor: "bg-blue-500",
    },
    {
      title: "Phòng trống",
      value: stats.availableRooms.toString(),
      change: "Có sẵn ngay bây giờ",
      icon: Home,
      bgColor: "bg-green-500",
    },
    {
      title: "Đã đặt / Active",
      value: stats.activeBookings.toString(),
      change: "Trong khoảng thời gian này", // Updated label
      icon: Calendar,
      bgColor: "bg-red-500",
    },
    {
      title: "Doanh thu",
      value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue),
      change: "Trong khoảng thời gian này",
      icon: DollarSign,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Lượt đặt",
      value: stats.totalBookings.toString(),
      change: "Trong khoảng thời gian này",
      icon: Users,
      bgColor: "bg-purple-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tổng quan Dashboard</h1>
          <p className="text-slate-600 mt-2">Hiệu suất và Thống kê theo thời gian.</p>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow border border-slate-200">
          <div className="flex flex-col">
            <label className="text-[10px] text-slate-500 font-semibold px-1">Từ ngày</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-sm border-none focus:ring-0 p-1 text-slate-700"
            />
          </div>
          <span className="text-slate-400">-</span>
          <div className="flex flex-col">
            <label className="text-[10px] text-slate-500 font-semibold px-1">Đến ngày</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-sm border-none focus:ring-0 p-1 text-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BookingChart data={bookingChartData} />
        <OccupancyChart data={occupancyData} />
      </div>

      {/* Review Stats */}
      <ReviewStats />

      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Hoạt động gần đây</h2>
        <div className="space-y-4">
          {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b border-slate-200 pb-3 last:border-0"
            >
              <div>
                <p className="font-medium text-slate-900">{activity.type}</p>
                <p className="text-sm text-slate-600">{activity.message}</p>
              </div>
              <p className="text-xs text-slate-500 whitespace-nowrap ml-4">{activity.time}</p>
            </div>
          )) : (
            <p className="text-slate-500">Chưa có hoạt động nào gần đây.</p>
          )}
        </div>
      </div>
    </div>
  )
}
