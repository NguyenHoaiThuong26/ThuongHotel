package com.hoaithuong.HotelManagement.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRequest {
    @NotNull(message = "ROOM_ID_INVALID")
    String roomId;

    @NotNull(message = "CHECK_IN_INVALID")
    @Future(message = "CHECK_IN_FUTURE")
    LocalDateTime checkIn;

    @NotNull(message = "CHECK_OUT_INVALID")
    @Future(message = "CHECK_OUT_FUTURE")
    LocalDateTime checkOut;

    @Min(value = 1, message = "INVALID_NUM_ADULTS")
    int numAdults;

    @Min(value = 0, message = "INVALID_NUM_CHILDREN")
    int numChildren;
}
