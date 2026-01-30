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
            if (userRepository.findByUsername("admin@gmail.com").isEmpty()) {
                Role adminRole = roleRepository.findByRoleName("ADMIN")
                        .orElseGet(() -> roleRepository.save(Role.builder()
                                .roleName("ADMIN")
                                .build()));

                // Init USER role
                roleRepository.findByRoleName("USER")
                        .orElseGet(() -> roleRepository.save(Role.builder()
                                .roleName("USER")
                                .build()));

                Set<Role> roles = new HashSet<>();
                roles.add(adminRole);

                User user = User.builder()
                        .username("admin@gmail.com")
                        .email("admin@gmail.com")
                        .password(passwordEncoder.encode("admin"))
                        .roles(roles)
                        .firstName("System")
                        .lastName("Admin")
                        .enabled(true)
                        .build();

                userRepository.save(user);
                log.warn("✅ Admin user has been created with default password: admin. Please change it.");
            } else {
                if (roleRepository.findByRoleName("USER").isEmpty()) {
                    roleRepository.save(Role.builder().roleName("USER").build());
                }
            }
        };
    }
}
