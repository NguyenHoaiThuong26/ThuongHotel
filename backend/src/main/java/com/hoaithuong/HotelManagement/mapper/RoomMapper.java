package com.hoaithuong.HotelManagement.mapper;

import com.hoaithuong.HotelManagement.dto.request.RoomRequest;
import com.hoaithuong.HotelManagement.dto.response.RoomResponse;
import com.hoaithuong.HotelManagement.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(target = "roomType", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "bookings", ignore = true)
    Room toRoom(RoomRequest request);

    @Mapping(source = "roomType.typeName", target = "roomTypeName")
    RoomResponse toRoomResponse(Room room);
}
