import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import HomePage from '../pages/home/HomePage'
import RoomListPage from '../pages/rooms/RoomListPage'
import RoomDetailPage from '../pages/rooms/RoomDetailPage'
import BookingPage from '../pages/rooms/BookingPage'
import ProfilePage from '../pages/profile/ProfilePage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/rooms" element={<RoomListPage />} />
             
            <Route path="/room/:id" element={<RoomDetailPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />

        </Routes>
    );
};

export default AppRoutes;