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
  const statusColor =
    status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 h-full flex flex-col">

      {/* Hình ảnh */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/placeholder.svg?height=200&width=400"}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
            {status === "Available" ? "Còn trống" : "Đã đặt"}
          </span>
        </div>
      </div>

      {/* Nội dung */}
      <div className="p-5 text-left flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
        <p className="text-sm text-slate-500 mt-1">{type}</p>

        <p className="text-slate-600 text-sm my-3 line-clamp-2">{description}</p>

        {/* Thông tin phòng */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{capacity} khách</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-4 h-4" />
            <span>WiFi</span>
          </div>
        </div>

        {/* Tiện nghi */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {amenities.slice(0, 2).map((amenity, idx) => (
            <span
              key={idx}
              className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 2 && (
            <span className="text-xs text-slate-500">+{amenities.length - 2} tiện nghi khác</span>
          )}
        </div>

        {/* Giá + nút (đẩy xuống đáy card) */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold text-teal-600">${price}</span>
              <p className="text-xs text-slate-500">mỗi đêm</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={`/room/${id}`} className="w-full">
              <Button
                variant="outline"
                className="w-full border-teal-500 text-teal-500 hover:bg-teal-50 bg-transparent text-sm font-medium rounded-lg"
              >
                Xem chi tiết
              </Button>
            </Link>

            <Link to={`/booking/${id}`} className="w-full">
              <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-md hover:brightness-105">
                Đặt ngay
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}
