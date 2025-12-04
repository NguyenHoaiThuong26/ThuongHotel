"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"

export default function PaymentReturnPage() {
  const searchParams = useSearchParams()[0]
  const navigate = useNavigate()
  const [status, setStatus] = useState<string | null>(null)
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("bookingData")
    if (!data) {
      navigate("/rooms")
      return
    }
    setBookingData(JSON.parse(data))

    const responseCode = searchParams.get("vnp_ResponseCode")
    if (responseCode === "00") {
      setStatus("success")
      localStorage.removeItem("bookingData")
      // TODO: Gọi backend để lưu booking vào database
    } else {
      setStatus("fail")
    }
  }, [searchParams, navigate])

  if (!bookingData) return null

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Navbar />
      <section className="py-12 md:py-16 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {status === "success" ? (
            <>
              <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
              <p className="text-lg mb-8">
                Your booking for <strong>{bookingData.room.name}</strong> has been confirmed.
              </p>
              <button onClick={() => navigate("/home")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                Go to Home
              </button>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
              <p className="text-lg mb-8">Your payment could not be completed.</p>
              <button onClick={() => navigate(`/booking/${bookingData.room.id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                Try Again
              </button>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
