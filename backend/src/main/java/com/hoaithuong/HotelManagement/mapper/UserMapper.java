package com.hoaithuong.HotelManagement.mapper;

import com.hoaithuong.HotelManagement.dto.request.UserCreationRequest;
import com.hoaithuong.HotelManagement.dto.request.UserUpdateRequest;
import com.hoaithuong.HotelManagement.dto.response.UserResponse;
import com.hoaithuong.HotelManagement.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
