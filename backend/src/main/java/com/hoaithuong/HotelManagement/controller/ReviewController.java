package com.hoaithuong.HotelManagement.controller;

import com.hoaithuong.HotelManagement.dto.request.ReviewRequest;
import com.hoaithuong.HotelManagement.dto.response.ApiResponse;
import com.hoaithuong.HotelManagement.dto.response.ReviewResponse;
import com.hoaithuong.HotelManagement.entity.Review;
import com.hoaithuong.HotelManagement.service.ReviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Map;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewController {
    ReviewService reviewService;

    @PostMapping
    public ApiResponse<Review> createReview(@RequestBody ReviewRequest request) {
        return ApiResponse.<Review>builder()
                .result(reviewService.createReview(request))
                .build();
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getReviewStats() {
        return ApiResponse.<Map<String, Object>>builder()
                .result(reviewService.getReviewStats())
                .build();
    }

    @GetMapping("/room/{roomId}")
    public ApiResponse<List<ReviewResponse>> getReviewByRoomId(@PathVariable String roomId) {
        return ApiResponse.<List<ReviewResponse>>builder()
                .result(reviewService.getReviewByRoomId(roomId))
                .build();
    }
}
