package com.hoaithuong.HotelManagement.controller;

import com.hoaithuong.HotelManagement.dto.request.ApiResponse;
import com.hoaithuong.HotelManagement.dto.request.BookingRequest;
import com.hoaithuong.HotelManagement.dto.response.BookingResponse;
import com.hoaithuong.HotelManagement.service.BookingService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingController {
    BookingService bookingService;

    @PostMapping
    ApiResponse<BookingResponse> createBooking(@RequestBody @Valid BookingRequest request) {
        return ApiResponse.<BookingResponse>builder()
                .result(bookingService.createBooking(request))
                .build();
    }

    @GetMapping("/my-history")
    ApiResponse<List<BookingResponse>> getMyHistory() {
        return ApiResponse.<List<BookingResponse>>builder()
                .result(bookingService.getMyHistory())
                .build();
    }

    @PostMapping("/cancel/{bookingId}")
    ApiResponse<Void> cancelBooking(@PathVariable String bookingId) {
        bookingService.cancelBooking(bookingId);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/approve/{bookingId}")
    ApiResponse<Void> approveBooking(@PathVariable String bookingId) {
        bookingService.approveBooking(bookingId);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/check-in")
    ApiResponse<BookingResponse> checkIn(@RequestParam String qrData) {
        return ApiResponse.<BookingResponse>builder()
                .result(bookingService.checkIn(qrData))
                .build();
    }

    @PostMapping("/check-in/{bookingId}")
    ApiResponse<BookingResponse> checkInByBookingId(@PathVariable String bookingId) {
        return ApiResponse.<BookingResponse>builder()
                .result(bookingService.checkInByBookingId(bookingId))
                .build();
    }

    @PostMapping("/check-out/{bookingId}")
    ApiResponse<BookingResponse> checkOut(@PathVariable String bookingId) {
        return ApiResponse.<BookingResponse>builder()
                .result(bookingService.checkOut(bookingId))
                .build();
    }

    // Admin only
    @GetMapping
    ApiResponse<List<BookingResponse>> getAllBookings() {
        return ApiResponse.<List<BookingResponse>>builder()
                .result(bookingService.getAllBookings())
                .build();
    }

    @GetMapping(value = "/{bookingId}/qr", produces = org.springframework.http.MediaType.IMAGE_PNG_VALUE)
    byte[] getBookingQRCode(@PathVariable String bookingId) {
        return bookingService.getBookingQRCode(bookingId);
    }
}
