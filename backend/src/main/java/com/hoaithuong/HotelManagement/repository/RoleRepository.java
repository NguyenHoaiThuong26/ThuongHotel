package com.hoaithuong.HotelManagement.repository;

import com.hoaithuong.HotelManagement.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByRoleName(String roleName);
    void deleteByRoleName(String roleName);
}