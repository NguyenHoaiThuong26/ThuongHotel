package com.hoaithuong.HotelManagement.controller;

import com.hoaithuong.HotelManagement.dto.request.ApiResponse;
import com.hoaithuong.HotelManagement.dto.response.StatsResponse;
import com.hoaithuong.HotelManagement.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatsController {
    private final StatsService statsService;

    @GetMapping
    public ApiResponse<StatsResponse> getStats(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        // Default to current year or reasonable range if null
        if (startDate == null)
            startDate = LocalDate.now().minusMonths(1);
        if (endDate == null)
            endDate = LocalDate.now();

        return ApiResponse.<StatsResponse>builder()
                .result(statsService.getStats(startDate.atStartOfDay(), endDate.atTime(23, 59, 59)))
                .build();
    }
}
