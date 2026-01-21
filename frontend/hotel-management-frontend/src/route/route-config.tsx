import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import HomePage from '../pages/home/HomePage'
import RoomListPage from '../pages/rooms/RoomListPage'
import RoomDetailPage from '../pages/rooms/RoomDetailPage'
import BookingPage from '../pages/rooms/BookingPage'
import ProfilePage from '../pages/profile/ProfilePage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import PaymentPage from '../pages/payment/PaymentPage'
import PaymentReturnPage from '../pages/payment/PaymentReturnPage';
import AboutPage from '../pages/about/AboutPage';
import ContactPage from '../pages/contact/ContactPage';
import MyBookings from '../pages/profile/MyBookings';
import CheckInScanner from '../pages/admin/CheckInScanner';
import OAuth2RedirectHandler from '../pages/auth/OAuth2RedirectHandler';
import VerifyAccountPage from '../pages/auth/VerifyAccountPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-account" element={<VerifyAccountPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/all-rooms" element={<RoomListPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/room/:id" element={<RoomDetailPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
            <Route path="/payment-return" element={<PaymentReturnPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/checkin" element={<CheckInScanner />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        </Routes>
    );
};

export default AppRoutes;