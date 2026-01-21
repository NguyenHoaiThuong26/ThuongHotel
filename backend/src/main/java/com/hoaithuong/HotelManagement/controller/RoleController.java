package com.hoaithuong.HotelManagement.controller;

import com.hoaithuong.HotelManagement.dto.request.ApiResponse;
import com.hoaithuong.HotelManagement.dto.request.RoleRequest;
import com.hoaithuong.HotelManagement.dto.response.RoleResponse;
import com.hoaithuong.HotelManagement.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoleController {
    RoleService roleService;

    @PostMapping
    ApiResponse<RoleResponse> create(@RequestBody RoleRequest request) {
        RoleResponse result = roleService.create(request);
        return new ApiResponse<RoleResponse>(1000, null, result);
    }

    @GetMapping
    ApiResponse<List<RoleResponse>> getAll() {
        List<RoleResponse> result = roleService.getAll();
        return new ApiResponse<List<RoleResponse>>(1000, null, result);
    }

    @DeleteMapping("/{role}")
    ApiResponse<Void> delete(@PathVariable String role) {
        roleService.delete(role);
        return new ApiResponse<Void>(1000, null, null);
    }
}
