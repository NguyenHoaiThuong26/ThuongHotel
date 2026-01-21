package com.hoaithuong.HotelManagement.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomTypeResponse {
    Long roomTypeId;
    String typeName;
    String description;
}
