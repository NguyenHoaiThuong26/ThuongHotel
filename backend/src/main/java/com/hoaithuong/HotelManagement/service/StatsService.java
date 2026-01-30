package com.hoaithuong.HotelManagement.service;

import com.hoaithuong.HotelManagement.dto.response.StatsResponse;
import com.hoaithuong.HotelManagement.entity.Booking;
import com.hoaithuong.HotelManagement.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class StatsService {
    private final BookingRepository bookingRepository;

    public StatsResponse getStats(LocalDateTime startDate, LocalDateTime endDate) {
        List<Booking> bookings = bookingRepository.findBookingsByDateRange(startDate, endDate);

        double totalRevenue = 0;
        long totalBookings = bookings.size();
        long cancelledBookings = 0;
        long activeBookings = 0;

        Map<String, Integer> bookingCountMap = new HashMap<>();
        Map<String, Double> revenueMap = new HashMap<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");

        for (Booking b : bookings) {
            String status = b.getStatus();

            // 1️⃣ Cancelled
            if ("CANCELLED".equalsIgnoreCase(status)) {
                cancelledBookings++;
                continue;
            }

            // 2️⃣ Active bookings
            if (List.of("PENDING", "BOOKED", "CHECKED_IN").contains(status)) {
                activeBookings++;
            }

            // 3️⃣ Booking count theo CHECK-IN
            String bookingMonth = b.getCheckIn().format(formatter);
            bookingCountMap.put(bookingMonth,
                    bookingCountMap.getOrDefault(bookingMonth, 0) + 1);

            // 4️⃣ Revenue theo CHECK-OUT
            if (List.of("CHECKED_OUT", "COMPLETED").contains(status) && b.getTotalPrice() != null) {
                totalRevenue += b.getTotalPrice();

                String revenueMonth = b.getCheckOut().format(formatter);
                revenueMap.put(revenueMonth,
                        revenueMap.getOrDefault(revenueMonth, 0.0) + b.getTotalPrice());
            }
        }

        // 5️⃣ Merge booking + revenue thành MonthlyStat
        Map<String, StatsResponse.MonthlyStat> monthlyStats = new HashMap<>();

        for (String month : bookingCountMap.keySet()) {
            monthlyStats.put(month,
                    StatsResponse.MonthlyStat.builder()
                            .month(month)
                            .bookings(bookingCountMap.get(month))
                            .revenue(0)
                            .build());
        }

        for (String month : revenueMap.keySet()) {
            monthlyStats.putIfAbsent(month,
                    StatsResponse.MonthlyStat.builder()
                            .month(month)
                            .bookings(0)
                            .revenue(0)
                            .build());

            monthlyStats.get(month).setRevenue(revenueMap.get(month));
        }

        List<StatsResponse.MonthlyStat> trends = new ArrayList<>(monthlyStats.values());
        trends.sort((a, b) -> a.getMonth().compareTo(b.getMonth()));

        return StatsResponse.builder()
                .totalBookingRequest(totalBookings)
                .totalRevenue(totalRevenue)
                .activeBookings(activeBookings)
                .cancelledBookings(cancelledBookings)
                .bookingTrend(trends)
                .revenueTrend(trends)
                .build();
    }


}
