package com.hoaithuong.HotelManagement.dto.request;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomRequest {
    @NotBlank
    String roomNumber;

    @Positive
    Double price;

    @Min(1)
    int maxAdults;

    @Min(0)
    int maxChildren;

    int floor;

    String description;

    @NotBlank
    String status;

    @NotNull
    Long roomTypeId; // liên kết với RoomType

}
