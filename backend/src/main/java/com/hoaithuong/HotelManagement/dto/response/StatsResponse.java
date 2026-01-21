package com.hoaithuong.HotelManagement.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StatsResponse {
    long totalBookingRequest; // Total bookings in range
    double totalRevenue; // Revenue in range
    long activeBookings; // Currently active (status BOOKED/CHECKED_IN) - global or in range? usually
                         // global implies 'current state'.
    long cancelledBookings;

    // For charts
    List<MonthlyStat> revenueTrend;
    List<MonthlyStat> bookingTrend;

    @Data
    @Builder
    public static class MonthlyStat {
        String month; // e.g., "2023-10"
        double revenue;
        long bookings;
    }
}
