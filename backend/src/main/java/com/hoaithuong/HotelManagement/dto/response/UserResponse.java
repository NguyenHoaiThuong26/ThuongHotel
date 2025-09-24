package com.hoaithuong.HotelManagement.dto.response;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String userId;;
    String username;
    String firstName;
    String lastName;
    String email;
    String address;
    LocalDate dateOfBirth;
    String phone;
}
