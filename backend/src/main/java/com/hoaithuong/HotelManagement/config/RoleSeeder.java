package com.hoaithuong.HotelManagement.config;


import com.hoaithuong.HotelManagement.entity.Role;
import com.hoaithuong.HotelManagement.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleSeeder {

    @Bean
    CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByRoleName("USER").isEmpty()) {
                roleRepository.save(Role.builder().roleName("USER").build());
            }
            if (roleRepository.findByRoleName("ADMIN").isEmpty()) {
                roleRepository.save(Role.builder().roleName("ADMIN").build());
            }
            if (roleRepository.findByRoleName("RECEPTIONIST").isEmpty()) {
                roleRepository.save(Role.builder().roleName("RECEPTIONIST").build());
            }
        };
    }
}