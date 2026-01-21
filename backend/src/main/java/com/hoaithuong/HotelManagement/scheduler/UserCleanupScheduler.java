package com.hoaithuong.HotelManagement.scheduler;

import com.hoaithuong.HotelManagement.entity.User;
import com.hoaithuong.HotelManagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserCleanupScheduler {

    private final UserRepository userRepository;

    @Scheduled(fixedRate = 60000) // Run every minute
    @Transactional
    public void cleanupUnverifiedUsers() {
        LocalDateTime expirationTime = LocalDateTime.now().minusMinutes(15);
        List<User> unverifiedUsers = userRepository.findAll().stream()
                .filter(user -> !user.isEnabled() && user.getCreateAt() != null
                        && user.getCreateAt().isBefore(expirationTime))
                .toList();

        if (!unverifiedUsers.isEmpty()) {
            log.info("Found {} unverified users to cleanup", unverifiedUsers.size());
            userRepository.deleteAll(unverifiedUsers);
            log.info("Cleanup completed");
        }
    }
}
