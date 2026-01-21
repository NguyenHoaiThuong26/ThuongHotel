package com.hoaithuong.HotelManagement.mapper;

import com.hoaithuong.HotelManagement.dto.request.RoomTypeRequest;
import com.hoaithuong.HotelManagement.dto.response.RoomTypeResponse;
import com.hoaithuong.HotelManagement.entity.RoomType;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RoomTypeMapper {
    RoomType toRoomType(RoomTypeRequest request);

    RoomTypeResponse toRoomTypeResponse(RoomType roomType);

    void updateRoomType(@MappingTarget RoomType roomType, RoomTypeRequest request);
}
