package com.hoaithuong.HotelManagement.dto.response;


import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PermissionResponse {
    private String permissionId;
    private String permissionName;
    private String description;
}