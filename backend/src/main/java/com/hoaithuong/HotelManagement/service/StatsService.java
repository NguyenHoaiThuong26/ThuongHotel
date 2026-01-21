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

        Map<String, StatsResponse.MonthlyStat> monthlyMap = new HashMap<>();

        for (Booking b : bookings) {
            String status = b.getStatus();
            if ("CANCELLED".equalsIgnoreCase(status)) {
                cancelledBookings++;
            } else {
                totalRevenue += (b.getTotalPrice() != null ? b.getTotalPrice() : 0);
                if ("BOOKED".equalsIgnoreCase(status) || "CHECKED_IN".equalsIgnoreCase(status)) {
                    activeBookings++;
                }

                // Chart Data (Group by Year-Month)
                String monthKey = b.getCheckIn().format(DateTimeFormatter.ofPattern("yyyy-MM"));
                monthlyMap.putIfAbsent(monthKey,
                        StatsResponse.MonthlyStat.builder().month(monthKey).revenue(0).bookings(0).build());

                StatsResponse.MonthlyStat stat = monthlyMap.get(monthKey);
                stat.setBookings(stat.getBookings() + 1);
                stat.setRevenue(stat.getRevenue() + (b.getTotalPrice() != null ? b.getTotalPrice() : 0));
            }
        }

        List<StatsResponse.MonthlyStat> trends = new ArrayList<>(monthlyMap.values());
        trends.sort((a, b) -> a.getMonth().compareTo(b.getMonth()));

        return StatsResponse.builder()
                .totalBookingRequest(totalBookings)
                .totalRevenue(totalRevenue)
                .activeBookings(activeBookings)
                .cancelledBookings(cancelledBookings)
                .revenueTrend(trends)
                .bookingTrend(trends) // Same for now
                .build();
    }
}
