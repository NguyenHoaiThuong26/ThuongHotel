package com.hoaithuong.HotelManagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingResponse {
    String bookingId;
    String userId; // Or UserResponse if detailed info needed
    String roomId; // Or RoomResponse
    LocalDateTime checkIn;
    LocalDateTime checkOut;
    int numAdults;
    int numChildren;
    String status;
    Double totalPrice;
    LocalDateTime createdAt;
    String qrData;
    String bookingCode;

    // Additional info for UI
    String roomName;
    String roomNumber;
    String roomType;
    String roomImage;
    String guestName; // Username or Fullname depending on checks

    ReviewResponse review;
}
