package com.hoaithuong.HotelManagement.repository;

import com.hoaithuong.HotelManagement.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

    boolean existsByBooking_BookingId(String bookingId);

    List<Review> findByBooking_Room_RoomId(String roomId);

    @Query("SELECT AVG(r.rating) FROM Review r")
    Double getAverageRating();

    @Query("SELECT r.rating, COUNT(r) FROM Review r GROUP BY r.rating")
    List<Object[]> getRatingDistribution();

    List<Review> findAllByOrderByCreatedAtDesc();
}
