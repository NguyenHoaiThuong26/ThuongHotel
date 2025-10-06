package com.hoaithuong.HotelManagement.config;

import com.hoaithuong.HotelManagement.entity.Role;
import com.hoaithuong.HotelManagement.entity.User;
import com.hoaithuong.HotelManagement.repository.RoleRepository;
import com.hoaithuong.HotelManagement.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    RoleRepository roleRepository;

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {

                // 🔑 Lấy role ADMIN từ DB
                Role adminRole = roleRepository.findByRoleName("ADMIN")
                        .orElseThrow(() -> new RuntimeException("Role ADMIN not found in DB. Hãy insert sẵn vào bảng roles."));

                Set<Role> roles = new HashSet<>();
                roles.add(adminRole);

                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .roles(roles)
                        .build();

                userRepository.save(user);
                log.warn("✅ Admin user has been created with default password: admin. Please change it.");
            }
        };
    }
}
