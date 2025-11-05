"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { AlertCircle } from "lucide-react"

interface BookingFormProps {
  roomId: number
  pricePerNight: number
  onSubmit: (formData: BookingFormData) => void
  isLoading: boolean
}

export interface BookingFormData {
  fullName: string
  email: string
  phone: string
  checkInDate: string
  checkOutDate: string
  numGuests: number
  specialRequests: string
}

export default function BookingForm({ roomId, pricePerNight, onSubmit, isLoading }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    numGuests: 1,
    specialRequests: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.checkInDate) newErrors.checkInDate = "Check-in date is required"
    if (!formData.checkOutDate) newErrors.checkOutDate = "Check-out date is required"
    if (formData.checkOutDate && formData.checkInDate && formData.checkOutDate <= formData.checkInDate) {
      newErrors.checkOutDate = "Check-out date must be after check-in date"
    }
    if (formData.numGuests < 1) newErrors.numGuests = "At least 1 guest is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numGuests" ? Number.parseInt(value) : value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Calculate number of nights
  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0
    const checkIn = new Date(formData.checkInDate)
    const checkOut = new Date(formData.checkOutDate)
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const totalPrice = nights * pricePerNight

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.fullName ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.fullName && (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.fullName}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.email ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.email && (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.phone ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.phone && (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.phone}
            </div>
          )}
        </div>
      </div>

      {/* Reservation Details */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Reservation Details</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Check-in Date</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.checkInDate ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.checkInDate && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.checkInDate}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Check-out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.checkOutDate ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.checkOutDate && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.checkOutDate}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Number of Guests</label>
          <select
            name="numGuests"
            value={formData.numGuests}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.numGuests ? "border-red-500" : "border-slate-300"
            }`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          {errors.numGuests && (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.numGuests}
            </div>
          )}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Special Requests</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Any special requests or requirements? (Optional)"
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="pt-6 border-t border-slate-200 bg-slate-50 p-4 rounded-lg space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              {nights} night{nights !== 1 ? "s" : ""} × ${pricePerNight}/night
            </span>
            <span className="font-semibold text-slate-900">${nights * pricePerNight}</span>
          </div>
          <div className="border-t border-slate-200 pt-3 flex justify-between">
            <span className="font-semibold text-slate-900">Total Price</span>
            <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Confirm Booking"}
      </Button>
    </form>
  )
}
