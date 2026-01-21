package com.hoaithuong.HotelManagement.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomTypeRequest {
    String typeName;
    String description;
}
