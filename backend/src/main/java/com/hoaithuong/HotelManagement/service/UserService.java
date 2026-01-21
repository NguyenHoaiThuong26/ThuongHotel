package com.hoaithuong.HotelManagement.service;

import com.hoaithuong.HotelManagement.dto.request.ChangePasswordRequest;
import com.hoaithuong.HotelManagement.dto.request.UserCreationRequest;
import com.hoaithuong.HotelManagement.dto.request.UserUpdateRequest;
import com.hoaithuong.HotelManagement.dto.response.UserResponse;
import com.hoaithuong.HotelManagement.entity.Role;
import com.hoaithuong.HotelManagement.entity.User;
import com.hoaithuong.HotelManagement.exception.AppException;
import com.hoaithuong.HotelManagement.exception.ErrorCode;
import com.hoaithuong.HotelManagement.mapper.UserMapper;
import com.hoaithuong.HotelManagement.repository.RoleRepository;
import com.hoaithuong.HotelManagement.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    EmailService emailService;

    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);

        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Init properties
        user.setCreateAt(java.time.LocalDateTime.now());
        user.setEnabled(false);
        String verificationCode = java.util.UUID.randomUUID().toString();
        user.setVerificationCode(verificationCode);

        // 🔑 Lấy role "USER" từ DB
        Role userRole = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        // Gán role vào user
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(savedUser.getEmail(), verificationCode);

        return userMapper.toUserResponse(savedUser);

    }

    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Logic mapping fields (handled by Mapper)
        userMapper.updateUser(user, request);

        // Password update should use the dedicated /change-password endpoint

        // Only update roles if provided
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            var roles = roleRepository.findAllById(request.getRoles());
            user.setRoles(new HashSet<>(roles));
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Prefix deleted- to username and email to allow reuse of original values
        // Add timestamp to ensure uniqueness of deleted records
        String timestamp = String.valueOf(System.currentTimeMillis());
        user.setUsername("deleted-" + timestamp + "-" + user.getUsername());
        user.setEmail("deleted-" + timestamp + "-" + user.getEmail());
        user.setStatus("DELETED");

        // Cannot change Primary Key (userId) safely without re-inserting,
        // effectively deleting the old record (which breaks FKs).
        // So we only mark as DELETED and rename fields.

        userRepository.save(user);
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        log.info("In method get Users");
        return userRepository.findAll().stream()
                .filter(user -> !"DELETED".equals(user.getStatus()))
                .map(userMapper::toUserResponse).toList();
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse getUser(String id) {
        log.info("In method get user by Id");
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    public void changePassword(String userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_OLD_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

}
