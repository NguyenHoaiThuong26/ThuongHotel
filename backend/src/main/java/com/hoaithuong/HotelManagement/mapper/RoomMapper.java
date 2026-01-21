package com.hoaithuong.HotelManagement.mapper;

import com.hoaithuong.HotelManagement.dto.request.RoomRequest;
import com.hoaithuong.HotelManagement.dto.response.RoomResponse;
import com.hoaithuong.HotelManagement.entity.Room;
import com.hoaithuong.HotelManagement.entity.RoomImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(target = "roomType", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "bookings", ignore = true)
    Room toRoom(RoomRequest request);

    @Mapping(source = "roomType.typeName", target = "roomTypeName")
    @Mapping(source = "roomType.roomTypeId", target = "roomTypeId")
    @Mapping(target = "images", source = "images", qualifiedByName = "mapImages")
    RoomResponse toRoomResponse(Room room);

    @Named("mapImages")
    default List<String> mapImages(List<RoomImage> images) {
        if (images == null) {
            return new ArrayList<>();
        }
        return images.stream()
                .map(RoomImage::getImageUrl)
                .toList();
    }
}
