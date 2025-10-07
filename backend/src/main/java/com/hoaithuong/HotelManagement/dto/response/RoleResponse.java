package com.hoaithuong.HotelManagement.dto.response;

import lombok.*;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleResponse {
    private String roleId;
    private String roleName;
    private Set<PermissionResponse> permissions;
}