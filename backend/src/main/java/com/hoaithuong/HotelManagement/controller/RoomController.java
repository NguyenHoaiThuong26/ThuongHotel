package com.hoaithuong.HotelManagement.controller;


import com.hoaithuong.HotelManagement.dto.request.ApiResponse;
import com.hoaithuong.HotelManagement.dto.request.RoomRequest;
import com.hoaithuong.HotelManagement.dto.response.RoomResponse;
import com.hoaithuong.HotelManagement.service.RoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomController {
    RoomService roomService;

    // get all rooms
    @GetMapping
    ApiResponse<List<RoomResponse>> getAllRooms(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long roomTypeId
    ) {
        return ApiResponse.<List<RoomResponse>>builder()
                .result(roomService.getAllRooms(status, roomTypeId))
                .build();
    }

    // get room
    @GetMapping("/{roomId}")
    ApiResponse<RoomResponse> getRoom(@PathVariable String roomId) {
        return ApiResponse.<RoomResponse>builder()
                .result(roomService.getRoom(roomId))
                .build();
    }

    // add room (admin)
    @PostMapping
    ApiResponse<RoomResponse> createRoom(@RequestBody @Valid RoomRequest request) {
        return ApiResponse.<RoomResponse>builder()
                .result(roomService.createRoom(request))
                .build();
    }

    // update room
    @PutMapping("/{roomId}")
    ApiResponse<RoomResponse> updateRoom(
            @PathVariable String roomId,
            @RequestBody RoomRequest request
    ) {
        return ApiResponse.<RoomResponse>builder()
                .result(roomService.updateRoom(roomId, request))
                .build();
    }

    // delete room (admin)
    @DeleteMapping("/{roomId}")
    ApiResponse<Void> deleteRoom(@PathVariable String roomId) {
        roomService.deleteRoom(roomId);
        return ApiResponse.<Void>builder().build();
    }

    // update status room
    @PatchMapping("/{roomId}/status")
    ApiResponse<RoomResponse> updateRoomStatus(
            @PathVariable String roomId,
            @RequestParam String status
    ) {
        return ApiResponse.<RoomResponse>builder()
                .result(roomService.updateRoomStatus(roomId, status))
                .build();
    }

}
