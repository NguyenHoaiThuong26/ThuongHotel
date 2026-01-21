package com.hoaithuong.HotelManagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomResponse {
    String roomId;
    String roomNumber;
    Double price;
    int maxAdults;
    int maxChildren;
    int floor;
    Double area; // Added field
    String description;
    String status;
    String roomTypeName; // hiển thị loại phòng
    Long roomTypeId;
    List<String> images; // Added field
    List<String> amenities; // Added field
}
