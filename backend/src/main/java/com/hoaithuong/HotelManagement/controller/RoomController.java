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
                        @RequestParam(required = false) Long roomTypeId,
                        @RequestParam(required = false) String keyword) {
                return ApiResponse.<List<RoomResponse>>builder()
                                .result(roomService.getAllRooms(status, roomTypeId, keyword))
                                .build();
        }

        // get available rooms
        @GetMapping("/available")
        ApiResponse<List<RoomResponse>> getAvailableRooms(
                        @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime checkIn,
                        @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime checkOut) {
                return ApiResponse.<List<RoomResponse>>builder()
                                .result(roomService.getAvailableRooms(checkIn, checkOut))
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
        // add room (admin)
        @PostMapping(consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
        ApiResponse<RoomResponse> createRoom(
                        @RequestPart("request") String roomRequestJson,
                        @RequestPart(value = "images", required = false) List<org.springframework.web.multipart.MultipartFile> images) {
                try {
                        com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();
                        RoomRequest request = objectMapper.readValue(roomRequestJson, RoomRequest.class);
                        return ApiResponse.<RoomResponse>builder()
                                        .result(roomService.createRoom(request, images))
                                        .build();
                } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
                        throw new RuntimeException("Invalid JSON format: " + e.getMessage());
                }
        }

        // update room
        // update room
        @PutMapping(value = "/{roomId}", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
        ApiResponse<RoomResponse> updateRoom(
                        @PathVariable String roomId,
                        @RequestPart("request") String roomRequestJson,
                        @RequestPart(value = "images", required = false) List<org.springframework.web.multipart.MultipartFile> images) {
                try {
                        com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();
                        RoomRequest request = objectMapper.readValue(roomRequestJson, RoomRequest.class);
                        return ApiResponse.<RoomResponse>builder()
                                        .result(roomService.updateRoom(roomId, request, images))
                                        .build();
                } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
                        throw new RuntimeException("Invalid JSON format: " + e.getMessage());
                }
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
                        @RequestParam String status) {
                return ApiResponse.<RoomResponse>builder()
                                .result(roomService.updateRoomStatus(roomId, status))
                                .build();
        }

}
