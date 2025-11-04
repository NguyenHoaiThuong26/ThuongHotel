
import { useState } from "react"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import BookingForm, { type BookingFormData } from "../../components/room/bookingForm"
import BookingSummary from "../../components/room/bookingSummary"
import BookingConfirmationModal from "../../components/room/bookingConfirmation"

const ROOMS_DATA = [
  {
    id: 1,
    name: "Deluxe Room",
    type: "Standard",
    price: 149,
    image: "/luxury-hotel-deluxe-suite.jpg",
    amenities: ["AC", "WiFi", "TV", "Mini Bar"],
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Ocean View Suite",
    type: "Suite",
    price: 249,
    image: "/luxury-hotel-ocean-view.jpg",
    amenities: ["AC", "WiFi", "TV", "Jacuzzi", "Terrace"],
    rating: 4.8,
    reviews: 256,
  },
  {
    id: 3,
    name: "Presidential Suite",
    type: "Luxury",
    price: 599,
    image: "/luxury-hotel-presidential-suite.jpg",
    amenities: ["AC", "WiFi", "TV", "Spa", "Chef Kitchen", "Butler Service"],
    rating: 5.0,
    reviews: 89,
  },
  {
    id: 4,
    name: "Garden Room",
    type: "Standard",
    price: 129,
    image: "/luxury-hotel-garden-view.jpg",
    amenities: ["AC", "WiFi", "TV", "Garden Access"],
    rating: 4.3,
    reviews: 95,
  },
  {
    id: 5,
    name: "Business Executive",
    type: "Standard",
    price: 179,
    image: "/business-hotel-room.jpg",
    amenities: ["AC", "WiFi", "TV", "Work Desk", "High-Speed Internet"],
    rating: 4.6,
    reviews: 142,
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    type: "Suite",
    price: 349,
    image: "/romantic-hotel-suite.jpg",
    amenities: ["AC", "WiFi", "Spa Tub", "Rose Petals", "Champagne"],
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 7,
    name: "Family Villa",
    type: "Villa",
    price: 449,
    image: "/family-villa-resort.jpg",
    amenities: ["AC", "WiFi", "TV", "Pool", "Kitchenette", "Living Area"],
    rating: 4.7,
    reviews: 176,
  },
  {
    id: 8,
    name: "Penthouse",
    type: "Luxury",
    price: 799,
    image: "/penthouse-luxury-room.jpg",
    amenities: ["AC", "WiFi", "Rooftop Access", "Skybar", "Private Elevator"],
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 9,
    name: "Riverside Cottage",
    type: "Standard",
    price: 189,
    image: "/riverside-cottage-hotel.jpg",
    amenities: ["AC", "WiFi", "Porch", "Nature Trail Access"],
    rating: 4.4,
    reviews: 118,
  },
  {
    id: 10,
    name: "Grand Ballroom Suite",
    type: "Suite",
    price: 399,
    image: "/grand-ballroom-suite.jpg",
    amenities: ["AV Equipment", "Catering", "WiFi", "Multiple Rooms"],
    rating: 4.8,
    reviews: 145,
  },
]


export default function BookingPage() {
  const params = useParams()
  const roomId = Number(params.id)

  if (isNaN(roomId)) return <div>Invalid Room ID</div>
  const room = ROOMS_DATA.find((r) => r.id === roomId)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    formData: BookingFormData
    roomName: string
    pricePerNight: number
    nights: number
    totalPrice: number
  } | null>(null)

  if (!room) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Room Not Found</h1>
          <p className="text-slate-600 mb-8">The room you're trying to book doesn't exist.</p>
          <Link to="/rooms">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg transition">
              Back to Rooms
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = (formData: BookingFormData) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const checkIn = new Date(formData.checkInDate)
      const checkOut = new Date(formData.checkOutDate)
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      const totalPrice = nights * room.price

      setBookingConfirmation({
        formData,
        roomName: room.name,
        pricePerNight: room.price,
        nights,
        totalPrice,
      })
      setShowConfirmation(true)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Navigation */}
        <Navbar />

      {/* Booking Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Complete Your Booking</h1>
          <p className="text-lg text-slate-600 mb-12">Fill in your details to complete the reservation</p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Booking Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
                <BookingForm
                  roomId={room.id}
                  pricePerNight={room.price}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Right Column - Room Summary */}
            <div>
              <BookingSummary room={room} />
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <BookingConfirmationModal isOpen={showConfirmation} bookingData={bookingConfirmation} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
