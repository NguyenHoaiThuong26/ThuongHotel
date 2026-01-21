package com.hoaithuong.HotelManagement.mapper;

import com.hoaithuong.HotelManagement.dto.request.UserCreationRequest;
import com.hoaithuong.HotelManagement.dto.request.UserUpdateRequest;
import com.hoaithuong.HotelManagement.dto.response.RoleResponse;
import com.hoaithuong.HotelManagement.dto.response.UserResponse;
import com.hoaithuong.HotelManagement.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    @Mapping(target = "roles", expression = "java(mapRolesToRoleResponses(user.getRoles()))")
    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);

    default Set<RoleResponse> mapRolesToRoleResponses(Set<com.hoaithuong.HotelManagement.entity.Role> roles) {
        if (roles == null)
            return null;
        return roles.stream()
                .map(role -> RoleResponse.builder()
                        .roleId(role.getRoleId())
                        .roleName(role.getRoleName())
                        .build())
                .collect(Collectors.toSet());
    }
}
