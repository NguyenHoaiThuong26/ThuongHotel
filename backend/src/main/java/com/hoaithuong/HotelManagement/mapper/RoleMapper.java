package com.hoaithuong.HotelManagement.mapper;

import com.hoaithuong.HotelManagement.dto.request.RoleRequest;
import com.hoaithuong.HotelManagement.dto.response.RoleResponse;
import com.hoaithuong.HotelManagement.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
