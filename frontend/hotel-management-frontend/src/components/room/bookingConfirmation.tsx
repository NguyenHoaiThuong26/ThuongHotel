import { Link } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { CheckCircle2, Home, Calendar } from "lucide-react"
import type { BookingFormData } from "./bookingForm"

interface BookingConfirmationModalProps {
  isOpen: boolean
  bookingData: {
    formData: BookingFormData
    roomName: string
    pricePerNight: number
    nights: number
    totalPrice: number
  } | null
}

export default function BookingConfirmationModal({ isOpen, bookingData }: BookingConfirmationModalProps) {
  if (!isOpen || !bookingData) return null

  const checkInDate = new Date(bookingData.formData.checkInDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const checkOutDate = new Date(bookingData.formData.checkOutDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-serif font-bold text-slate-900">Booking Confirmed!</h2>
          </div>
          <p className="text-slate-600">Your reservation has been successfully processed.</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Confirmation Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              A confirmation email has been sent to <strong>{bookingData.formData.email}</strong>
            </p>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-slate-900">Reservation Details</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Guest Information */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Guest Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-600">Full Name</p>
                    <p className="font-medium text-slate-900">{bookingData.formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Email</p>
                    <p className="font-medium text-slate-900">{bookingData.formData.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Phone</p>
                    <p className="font-medium text-slate-900">{bookingData.formData.phone}</p>
                  </div>
                </div>
              </div>

              {/* Room & Dates */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Room & Dates</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-600">Room</p>
                    <p className="font-medium text-slate-900">{bookingData.roomName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="text-slate-600">Check-in</p>
                      <p className="font-medium text-slate-900">{checkInDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="text-slate-600">Check-out</p>
                      <p className="font-medium text-slate-900">{checkOutDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-slate-50 rounded-lg p-6 space-y-3">
              <h4 className="font-semibold text-slate-900">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    {bookingData.nights} night{bookingData.nights !== 1 ? "s" : ""} × ${bookingData.pricePerNight}/night
                  </span>
                  <span className="font-medium text-slate-900">${bookingData.nights * bookingData.pricePerNight}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Number of Guests</span>
                  <span className="font-medium text-slate-900">{bookingData.formData.numGuests}</span>
                </div>
                {bookingData.formData.specialRequests && (
                  <div className="border-t border-slate-200 pt-2">
                    <p className="text-slate-600">Special Requests</p>
                    <p className="font-medium text-slate-900 mt-1">{bookingData.formData.specialRequests}</p>
                  </div>
                )}
              </div>

              {/* Total Price */}
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Total Price</span>
                  <span className="text-2xl font-bold text-blue-600">${bookingData.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-blue-900">Next Steps</h4>
              <ul className="text-sm text-blue-900 space-y-1">
                <li>• A confirmation email will be sent shortly</li>
                <li>• Check-in is available from 3:00 PM</li>
                <li>• Check-out is required by 11:00 AM</li>
                <li>• For questions, contact our front desk</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <Link to="/" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
            <Link to="/rooms" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 bg-white h-12 rounded-xl"
              >
                View More Rooms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
