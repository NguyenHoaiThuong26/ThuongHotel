import { Users, Wifi } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Link } from 'react-router-dom'

export interface RoomCardProps {
  id: number
  name: string
  description: string
  price: number
  image: string
  status: "Available" | "Booked"
  type: string
  capacity: number
  amenities: string[]
  rating?: number
  reviews?: number
  gallery?: string[]
  detailedDescription?: string
}

export default function RoomCard({
  id,
  name,
  description,
  price,
  image,
  status,
  type,
  capacity,
  amenities,
}: RoomCardProps) {
  const statusColor = status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/placeholder.svg?height=200&width=400"}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>{status}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2 text-left">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900">{name}</h3>
            <p className="text-sm text-slate-500 mt-1">{type}</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2 text-left">{description}</p>

        {/* Room Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{capacity} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-4 h-4" />
            <span>WiFi</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {amenities.slice(0, 2).map((amenity, idx) => (
            <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {amenities.length > 2 && <span className="text-xs text-slate-500">+{amenities.length - 2} more</span>}
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">${price}</span>
            <p className="text-xs text-slate-500">per night</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4 w-full sm:w-auto">
          <Link to={`/room/${id}`} className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent text-sm font-medium rounded-lg">
              View Details
            </Button>
          </Link>
          <Link to={`/booking/${id}`} className="flex-1 sm:flex-none">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-lg">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
