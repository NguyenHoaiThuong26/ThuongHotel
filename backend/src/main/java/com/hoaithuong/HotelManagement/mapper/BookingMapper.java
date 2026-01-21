package com.hoaithuong.HotelManagement.mapper;

import com.hoaithuong.HotelManagement.dto.response.BookingResponse;
import com.hoaithuong.HotelManagement.entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = { ReviewMapper.class })
public interface BookingMapper {
    @Mapping(target = "userId", source = "user.userId")
    @Mapping(target = "roomId", source = "room.roomId")
    @Mapping(target = "qrData", source = "qrCode.qrData")
    @Mapping(target = "guestName", expression = "java(booking.getUser().getLastName() + \" \" + booking.getUser().getFirstName())")
    @Mapping(target = "roomName", source = "room.roomNumber") // Using roomNumber as name for now
    @Mapping(target = "roomNumber", source = "room.roomNumber")
    @Mapping(target = "roomType", source = "room.roomType.typeName")
    @Mapping(target = "roomImage", expression = "java(booking.getRoom().getImages() != null && !booking.getRoom().getImages().isEmpty() ? booking.getRoom().getImages().get(0).getImageUrl() : null)")
    @Mapping(target = "review", source = "review")
    BookingResponse toBookingResponse(Booking booking);
}
