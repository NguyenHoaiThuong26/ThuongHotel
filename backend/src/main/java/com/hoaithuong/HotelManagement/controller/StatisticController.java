package com.hoaithuong.HotelManagement.controller;

import com.hoaithuong.HotelManagement.dto.request.ApiResponse;
import com.hoaithuong.HotelManagement.entity.Booking;
import com.hoaithuong.HotelManagement.repository.BookingRepository;
import com.hoaithuong.HotelManagement.repository.RoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatisticController {
    BookingRepository bookingRepository;
    RoomRepository roomRepository;

    @GetMapping("/revenue")
    ApiResponse<Map<String, Object>> getRevenue(@RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year) {
        List<Booking> bookings = bookingRepository.findAll();

        Double revenue = bookings.stream()
                .filter(b -> !"CANCELLED".equals(b.getStatus())) // Filter valid bookings
                .filter(b -> {
                    if (year != null && b.getCreatedAt().getYear() != year)
                        return false;
                    if (month != null && b.getCreatedAt().getMonthValue() != month)
                        return false;
                    return true;
                })
                .mapToDouble(b -> b.getTotalPrice() != null ? b.getTotalPrice() : 0.0)
                .sum();

        return ApiResponse.<Map<String, Object>>builder()
                .result(Map.of(
                        "revenue", revenue,
                        "month", month != null ? month : "ALL",
                        "year", year != null ? year : "ALL"))
                .build();
    }

    @GetMapping("/dashboard")
    ApiResponse<Map<String, Object>> getDashboardStats() {
        long totalRooms = roomRepository.count();
        long bookedRooms = roomRepository.countByStatus("BOOKED"); // Or whatever status implies occupied
        // Note: Room status might be "AVAILABLE", "MAINTENANCE", "BOOKED", "OCCUPIED"
        // Adjust logic based on actual status enums used in app
        long availableRooms = totalRooms - bookedRooms; // Simplistic

        long totalBookings = bookingRepository.count();

        return ApiResponse.<Map<String, Object>>builder()
                .result(Map.of(
                        "totalRooms", totalRooms,
                        "bookedRooms", bookedRooms,
                        "availableRooms", availableRooms,
                        "totalBookings", totalBookings))
                .build();
    }
}
