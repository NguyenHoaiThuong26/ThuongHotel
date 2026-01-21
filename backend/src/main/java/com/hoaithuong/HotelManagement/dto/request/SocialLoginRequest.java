package com.hoaithuong.HotelManagement.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SocialLoginRequest {
    String token;
    String provider; // GOOGLE, FACEBOOK
    String email; // Use email directly for mock
    String name;
}
