"use client"

import type { FC } from "react"

interface Props {
  paymentData: {
    customerName: string
    email: string
    totalPrice: number
    roomName: string
  }
  onClose: () => void
}

const PaymentConfirmationModal: FC<Props> = ({ paymentData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Successful!</h2>
        <p className="text-slate-700 mb-2">Thank you, {paymentData.customerName}.</p>
        <p className="text-slate-700 mb-4">
          Your payment of <strong>${paymentData.totalPrice}</strong> for {paymentData.roomName} has been processed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-medium"
          >
            Back to Home
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-200 text-slate-900 py-2 rounded-xl hover:bg-slate-300 transition font-medium"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmationModal
