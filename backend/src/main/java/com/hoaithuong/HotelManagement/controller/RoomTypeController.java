package com.hoaithuong.HotelManagement.controller;

import com.hoaithuong.HotelManagement.dto.request.ApiResponse;
import com.hoaithuong.HotelManagement.dto.request.RoomTypeRequest;
import com.hoaithuong.HotelManagement.dto.response.RoomTypeResponse;
import com.hoaithuong.HotelManagement.service.RoomTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room-types")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomTypeController {
    RoomTypeService roomTypeService;

    @PostMapping
    ApiResponse<RoomTypeResponse> createRoomType(@RequestBody RoomTypeRequest request) {
        return ApiResponse.<RoomTypeResponse>builder()
                .result(roomTypeService.createRoomType(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<RoomTypeResponse>> getAllRoomTypes() {
        return ApiResponse.<List<RoomTypeResponse>>builder()
                .result(roomTypeService.getAllRoomTypes())
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<RoomTypeResponse> updateRoomType(@PathVariable Long id, @RequestBody RoomTypeRequest request) {
        return ApiResponse.<RoomTypeResponse>builder()
                .result(roomTypeService.updateRoomType(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteRoomType(@PathVariable Long id) {
        roomTypeService.deleteRoomType(id);
        return ApiResponse.<String>builder()
                .result("Room Type has been deleted")
                .build();
    }
}
