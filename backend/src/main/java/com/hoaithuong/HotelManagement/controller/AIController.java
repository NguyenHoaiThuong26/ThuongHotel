package com.hoaithuong.HotelManagement.controller;

import com.hoaithuong.HotelManagement.dto.request.ApiResponse;
import com.hoaithuong.HotelManagement.dto.request.ChatRequest;
import com.hoaithuong.HotelManagement.dto.response.ChatResponse;
import com.hoaithuong.HotelManagement.service.AIService;
import com.hoaithuong.HotelManagement.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/chat")
    public ApiResponse<ChatResponse> chat(@RequestBody ChatRequest request) {
        String reply = aiService.chat(request.getMessage());
        return ApiResponse.<ChatResponse>builder()
                .result(new ChatResponse(reply))
                .build();
    }
}
