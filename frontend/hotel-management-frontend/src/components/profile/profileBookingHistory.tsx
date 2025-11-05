"use client"

import { useState } from "react"
import { Calendar, Eye, X } from "lucide-react"

interface Booking {
  id: string
  roomName: string
  checkInDate: string
  checkOutDate: string
  status: "confirmed" | "pending" | "canceled"
  price: number
}

interface BookingHistorySectionProps {
  bookings?: Booking[]
}

const mockBookings: Booking[] = [
  {
    id: "BK001",
    roomName: "Deluxe Suite Ocean View",
    checkInDate: "2024-01-15",
    checkOutDate: "2024-01-18",
    status: "confirmed",
    price: 450,
  },
  {
    id: "BK002",
    roomName: "Presidential Suite",
    checkInDate: "2024-02-20",
    checkOutDate: "2024-02-25",
    status: "pending",
    price: 1200,
  },
  {
    id: "BK003",
    roomName: "Family Villa Resort",
    checkInDate: "2023-12-01",
    checkOutDate: "2023-12-07",
    status: "canceled",
    price: 600,
  },
]

export default function BookingHistorySection({ bookings = mockBookings }: BookingHistorySectionProps) {
  const [cancelingId, setCancelingId] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCancelBooking = (id: string) => {
    setCancelingId(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar size={24} className="text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Booking History</h2>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No bookings found</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{booking.roomName}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Booking ID: {booking.id}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${booking.price}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(booking.status)}`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    {booking.status !== "canceled" && (
                      <div className="relative">
                        <button
                          onClick={() => setCancelingId(cancelingId === booking.id ? null : booking.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Cancel Booking"
                        >
                          <X size={18} />
                        </button>

                        {cancelingId === booking.id && (
                          <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-3 w-48">
                            <p className="text-sm font-medium text-gray-900 mb-3">Cancel this booking?</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium"
                              >
                                Yes, Cancel
                              </button>
                              <button
                                onClick={() => setCancelingId(null)}
                                className="flex-1 px-3 py-1 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium"
                              >
                                Keep
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
