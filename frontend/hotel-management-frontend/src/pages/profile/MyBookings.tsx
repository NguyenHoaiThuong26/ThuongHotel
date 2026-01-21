import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../configuration/configuration"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import { Loader2, Calendar, CreditCard, QrCode, Star } from "lucide-react"
import ReviewModal from "../../components/profile/ReviewModal"

interface Booking {
    bookingId: string;
    roomName: string;
    roomNumber: string;
    roomType: string;
    roomImage: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    status: string;
    bookingCode?: string;
    qrData: string;
    createdAt: string;
    review?: {
        rating: number;
        comment: string;
    }
}

const MyBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedQr, setSelectedQr] = useState<string | null>(null);
    const [selectedReviewBookingId, setSelectedReviewBookingId] = useState<string | null>(null);

    const handleReviewSuccess = () => {
        fetchMyBookings();
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/bookings/my-history`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.result) {
                    // Sort by newest first
                    const sorted = data.result.sort((a: Booking, b: Booking) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    setBookings(sorted);
                }
            }
        } catch (error) {
            console.error("Error fetching bookings", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            BOOKED: "bg-blue-100 text-blue-800",
            CHECKED_IN: "bg-green-100 text-green-800",
            CANCELLED: "bg-red-100 text-red-800",
            COMPLETED: "bg-gray-100 text-gray-800"
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100"}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 mt-20">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Lịch sử đặt phòng của tôi</h1>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin w-10 h-10 text-teal-600" />
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                        <p className="text-slate-500 mb-4">Bạn chưa có đặt phòng nào.</p>
                        <a href="/all-rooms" className="text-teal-600 font-semibold hover:underline">Đặt phòng ngay</a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking.bookingId} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                                <div className="flex flex-col md:flex-row">
                                    {/* Image Section */}
                                    <div className="md:w-1/3 lg:w-1/4 h-48 md:h-auto bg-slate-200 relative">
                                        <img
                                            src={booking.roomImage || "/placeholder.svg?height=300&width=400"}
                                            alt={booking.roomName}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 left-4">
                                            {getStatusBadge(booking.status)}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 md:w-2/3 lg:w-3/4 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                                                        Phòng {booking.roomNumber} - {booking.roomType}
                                                    </h3>
                                                    <p className="text-sm text-slate-500">
                                                        Mã đặt phòng: <span className="font-mono font-bold text-slate-700">{booking.bookingCode || booking.bookingId}</span>
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-teal-600">{booking.totalPrice.toLocaleString()} VND</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-2 text-sm text-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4 text-slate-400" />
                                                    <span>Ngày đặt: <strong>{new Date(booking.createdAt).toLocaleString('vi-VN')}</strong></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-teal-500" />
                                                    <span>
                                                        Check-in: <strong>{new Date(booking.checkIn).toLocaleString('vi-VN')}</strong>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-red-500" />
                                                    <span>
                                                        Check-out: <strong>{new Date(booking.checkOut).toLocaleString('vi-VN')}</strong>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4 text-blue-500" />
                                                    <span>Thanh toán tại khách sạn</span>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="mt-6 flex gap-3 justify-end border-t border-slate-100 pt-4">
                                            {booking.status === 'COMPLETED' && !booking.review && (
                                                <button
                                                    onClick={() => setSelectedReviewBookingId(booking.bookingId)}
                                                    className="flex items-center gap-2 px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition font-medium"
                                                >
                                                    <Star className="w-4 h-4" />
                                                    Đánh giá
                                                </button>
                                            )}
                                            {booking.status === 'COMPLETED' && booking.review && (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg border border-yellow-200 cursor-default">
                                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                                    <span className="font-semibold">{booking.review.rating}/5</span>
                                                </div>
                                            )}
                                            {booking.status === 'BOOKED' && (
                                                <button
                                                    onClick={() => setSelectedQr(booking.bookingId)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                                                >
                                                    <QrCode className="w-4 h-4" />
                                                    Xem mã QR
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />

            {/* QR Modal */}
            {selectedQr && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedQr(null)}
                >
                    <div
                        className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Mã QR Check-in</h3>
                        <p className="text-slate-600 mb-6 text-sm">Vui lòng đưa mã này cho lễ tân khi nhận phòng</p>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex justify-center">
                            <img
                                src={`${API_BASE_URL}/bookings/${selectedQr}/qr`}
                                alt="Booking QR"
                                className="w-48 h-48 object-contain"
                            />
                        </div>

                        <button
                            onClick={() => setSelectedQr(null)}
                            className="w-full py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            <ReviewModal
                bookingId={selectedReviewBookingId || ""}
                isOpen={!!selectedReviewBookingId}
                onClose={() => setSelectedReviewBookingId(null)}
                onSuccess={handleReviewSuccess}
            />
        </div>
    );
};

export default MyBookings;
