package com.hoaithuong.HotelManagement.dto.request;

import lombok.*;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleRequest {
    private String roleName;
    private Set<String> permissions;
}