package com.hoaithuong.HotelManagement.repository;

import com.hoaithuong.HotelManagement.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
        List<Booking> findByUser_UserId(String userId);

        java.util.Optional<Booking> findByBookingCode(String bookingCode);

        @org.springframework.data.jpa.repository.Query("SELECT b FROM Booking b WHERE b.room.roomId = :roomId AND b.status NOT IN ('CANCELLED') AND "
                        +
                        "((:checkIn >= b.checkIn AND :checkIn < b.checkOut) OR " +
                        "(:checkOut > b.checkIn AND :checkOut <= b.checkOut) OR " +
                        "(:checkIn <= b.checkIn AND :checkOut >= b.checkOut))")
        List<Booking> findBookingsAtSameTime(String roomId, java.time.LocalDateTime checkIn,
                        java.time.LocalDateTime checkOut);

        @org.springframework.data.jpa.repository.Query("SELECT b FROM Booking b WHERE b.checkIn >= :startDate AND b.checkOut <= :endDate")
        List<Booking> findBookingsByDateRange(java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);

        @org.springframework.data.jpa.repository.Query("SELECT DISTINCT b.room.roomId FROM Booking b WHERE " +
                        "b.status NOT IN ('CANCELLED', 'CHECKED_OUT', 'COMPLETED') AND " +
                        "((:checkIn < b.checkOut) AND (:checkOut > b.checkIn))")
        List<String> findOccupiedRoomIds(java.time.LocalDateTime checkIn, java.time.LocalDateTime checkOut);
}
