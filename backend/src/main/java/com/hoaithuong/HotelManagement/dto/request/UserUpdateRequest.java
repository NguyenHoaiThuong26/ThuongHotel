package com.hoaithuong.HotelManagement.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    String firstName;
    String lastName;
    String email;
    String address;
    LocalDate dateOfBirth;
    String phone;
    String oldPassword; // New field for security check
    String password;
    List<String> roles;
}
