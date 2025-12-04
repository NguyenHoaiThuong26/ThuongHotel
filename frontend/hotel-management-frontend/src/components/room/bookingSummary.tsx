"use client"

import { Link } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { ArrowLeft, Star } from "lucide-react"

interface BookingSummaryProps {
  room: {
    id: number
    name: string
    type: string
    price: number
    image: string
    amenities: string[]
    rating: number
    reviews: number
  }
}

export default function BookingSummary({ room }: BookingSummaryProps) {
  return (
    <div className="bg-slate-50 rounded-lg p-6 sticky top-24 space-y-6">
      {/* Ảnh phòng */}
      <div className="aspect-video rounded-lg overflow-hidden bg-slate-200">
        <img
          src={room.image || "/placeholder.svg?height=200&width=300"}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tên và loại phòng */}
      <div>
        <h3 className="text-2xl font-serif font-bold text-slate-900">{room.name}</h3>
        <p className="text-slate-600 mt-1">{room.type}</p>
      </div>

      {/* Đánh giá */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(room.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
              }`}
            />
          ))}
        </div>
        <span className="font-semibold text-slate-900">{room.rating}</span>
        <span className="text-sm text-slate-600">({room.reviews} đánh giá)</span>
      </div>

      {/* Giá */}
      <div className="border-t border-slate-200 pt-4">
        <p className="text-sm text-slate-600 mb-1">Giá mỗi đêm</p>
        <p className="text-3xl font-bold text-teal-600">${room.price}</p>
      </div>

      {/* Tiện ích chính */}
      <div className="border-t border-slate-200 pt-4">
        <h4 className="font-semibold text-slate-900 mb-3">Tiện ích chính</h4>
        <div className="space-y-2">
          {room.amenities.slice(0, 5).map((amenity, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-teal-600 rounded-full"></div>
              <span className="text-sm text-slate-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nút quay lại */}
      <Link to={`/room/${room.id}`}>
        <Button
          variant="outline"
          className="w-full h-10 mt-4 border-teal-500 text-teal-500 hover:bg-teal-50 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại chi tiết
        </Button>
      </Link>

    </div>
  )
}
