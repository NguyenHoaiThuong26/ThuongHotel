package com.hoaithuong.HotelManagement.repository;

import com.hoaithuong.HotelManagement.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
    Optional<Permission> findByPermissionName(String permissionName);
    void deleteByPermissionName(String permissionName);
    List<Permission> findByPermissionNameIn(Set<String> names);
}
