package com.hoaithuong.HotelManagement;

import com.hoaithuong.HotelManagement.entity.Role;
import com.hoaithuong.HotelManagement.entity.User;
import com.hoaithuong.HotelManagement.repository.RoleRepository;
import com.hoaithuong.HotelManagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HotelManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelManagementApplication.class, args);
	}

	@Bean
	CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository) {
		return args -> {
			// Init Roles
			Role adminRole = createRoleIfNotFound(roleRepository, "ADMIN");
			createRoleIfNotFound(roleRepository, "USER");
			Role receptionistRole = createRoleIfNotFound(roleRepository, "RECEPTIONIST");

			// Init Admin User
			if (!userRepository.existsByUsername("admin")) {
				User user = User.builder()
						.username("admin")
						.password(new BCryptPasswordEncoder(10).encode("123456"))
						.firstName("Admin")
						.lastName("System")
						.email("admin@hotel.com")
						.roles(Set.of(adminRole))
						.enabled(true)
						.build();
				userRepository.save(user);
				System.out.println("Initialized Admin User: admin / 123456");
			}

			// Init Receptionist User
			if (!userRepository.existsByUsername("receptionist")) {
				User user = User.builder()
						.username("receptionist")
						.password(new BCryptPasswordEncoder(10).encode("123456"))
						.firstName("Le Tan")
						.lastName("Hotel")
						.email("receptionist@hotel.com")
						.roles(Set.of(receptionistRole))
						.enabled(true)
						.build();
				userRepository.save(user);
				System.out.println("Initialized Receptionist User: receptionist / 123456");
			}
		};
	}

	private Role createRoleIfNotFound(RoleRepository roleRepository, String name) {
		return roleRepository.findByRoleName(name)
				.orElseGet(() -> roleRepository.save(Role.builder().roleName(name).build()));
	}
}
