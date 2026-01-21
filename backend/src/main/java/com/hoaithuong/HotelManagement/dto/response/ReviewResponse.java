package com.hoaithuong.HotelManagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponse {
    String reviewId;
    int rating;
    String comment;
    LocalDateTime createdAt;
    String authorName;
    String authorAvatar;
}
