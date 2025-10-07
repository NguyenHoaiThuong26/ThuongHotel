package com.hoaithuong.HotelManagement.service;

import com.hoaithuong.HotelManagement.dto.request.RoleRequest;
import com.hoaithuong.HotelManagement.dto.response.RoleResponse;
import com.hoaithuong.HotelManagement.mapper.RoleMapper;
import com.hoaithuong.HotelManagement.repository.PermissionRepository;
import com.hoaithuong.HotelManagement.repository.RoleRepository;
import jakarta.transaction.Transactional;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;

    public RoleResponse create(RoleRequest request) {
        var role = roleMapper.toRole(request);

        var permissions = permissionRepository.findByPermissionNameIn(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    @Transactional
    public void delete(String roleName) {
        roleRepository.deleteByRoleName(roleName);
    }
}