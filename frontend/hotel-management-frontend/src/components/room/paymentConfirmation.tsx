import type { FC } from "react"

interface Props {
  booking: any
  onClose: () => void
}

const PaymentConfirmationModal: FC<Props> = ({ booking, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Successful!</h2>
        <p className="text-slate-700 mb-2">Thank you, {booking.customerName}.</p>
        <p className="text-slate-700 mb-4">
          Your payment of <strong>${booking.totalPrice}</strong> for {booking.roomName} has been processed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-medium"
          >
            Back to Home
          </button>
          <button
            onClick={() => onClose()}
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
