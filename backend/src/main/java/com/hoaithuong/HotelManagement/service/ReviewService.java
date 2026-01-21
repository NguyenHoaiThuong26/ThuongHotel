package com.hoaithuong.HotelManagement.service;

import com.hoaithuong.HotelManagement.dto.request.ReviewRequest;
import com.hoaithuong.HotelManagement.dto.response.ReviewResponse;
import com.hoaithuong.HotelManagement.entity.Booking;
import com.hoaithuong.HotelManagement.entity.Review;
import com.hoaithuong.HotelManagement.mapper.ReviewMapper;
import com.hoaithuong.HotelManagement.repository.BookingRepository;
import com.hoaithuong.HotelManagement.repository.ReviewRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewService {
    ReviewRepository reviewRepository;
    BookingRepository bookingRepository;
    ReviewMapper reviewMapper;

    public Review createReview(ReviewRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Validate Status
        if (!"COMPLETED".equals(booking.getStatus())) {
            throw new RuntimeException("Chỉ có thể đánh giá các phòng đã trả.");
        }

        // Validate if already reviewed
        if (reviewRepository.existsByBooking_BookingId(booking.getBookingId())) {
            throw new RuntimeException("Bạn đã đánh giá booking này rồi.");
        }

        // Validate Ownership (Optional, but good for security)
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!booking.getUser().getUsername().equals(currentUsername)) {
            // In a real app we check Admin too, but usually only user reviews their own
            // stay
            throw new RuntimeException("Bạn không có quyền đánh giá booking này.");
        }

        Review review = Review.builder()
                .booking(booking)
                .rating(request.getRating())
                .comment(request.getComment())
                .createdAt(LocalDateTime.now())
                .build();

        return reviewRepository.save(review);
    }

    public Map<String, Object> getReviewStats() {
        Double avgRating = reviewRepository.getAverageRating();
        List<Object[]> distribution = reviewRepository.getRatingDistribution();
        long totalReviews = reviewRepository.count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("averageRating", avgRating != null ? avgRating : 0.0);
        stats.put("totalReviews", totalReviews);

        // Convert distribution to map
        Map<Integer, Long> starCounts = new HashMap<>();
        for (Object[] row : distribution) {
            starCounts.put((Integer) row[0], (Long) row[1]);
        }
        stats.put("starCounts", starCounts);

        return stats;
    }

    public List<ReviewResponse> getReviewByRoomId(String roomId) {
        return reviewRepository.findByBooking_Room_RoomId(roomId).stream()
                .map(reviewMapper::toReviewResponse)
                .toList();
    }
}
