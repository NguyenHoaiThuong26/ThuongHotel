package com.hoaithuong.HotelManagement.dto.response;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    String description;
    String status;

    String roomTypeName; // hiển thị loại phòng
}
