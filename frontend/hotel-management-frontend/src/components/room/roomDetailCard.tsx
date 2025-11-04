import { Star, Users, Wifi } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import type { RoomCardProps } from "./roomCard"

// 👉 Export rõ ràng để có thể import { RoomDetailCardProps } từ file khác
export interface RoomDetailCardProps extends RoomCardProps {
  rating?: number
  reviews?: number
  detailedDescription?: string
}

export default function RoomDetailCard({
  id,
  name,
  type,
  description,
  price,
  image,
  status,
  capacity,
  amenities,
  rating,
  reviews,
}: RoomDetailCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Room Image */}
      <div className="relative h-64">
        <img
          src={image || "/placeholder.svg?height=300&width=500"}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              status === "Available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Room Info */}
      <div className="p-6 text-left">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">{name}</h2>
        <p className="text-slate-500 text-sm mb-4">{type}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  rating && i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          {rating && (
            <span className="text-slate-800 text-sm font-medium">
              {rating.toFixed(1)} {reviews ? `(${reviews} reviews)` : ""}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{description}</p>

        {/* Room Details */}
        <div className="flex items-center gap-6 mb-6 text-sm text-slate-700 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-4 h-4 text-blue-600" />
            <span>WiFi</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="text-xs text-slate-500">
              +{amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">${price}</span>
            <p className="text-xs text-slate-500">per night</p>
          </div>

          <div className="flex gap-2">
            <Link to={`/room/${id}`}>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                View Details
              </Button>
            </Link>
            <Link to={`/booking/${id}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
