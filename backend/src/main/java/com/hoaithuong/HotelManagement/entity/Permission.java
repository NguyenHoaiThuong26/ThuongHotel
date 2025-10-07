package com.hoaithuong.HotelManagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "permissions")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private String permissionId;

    @Column(nullable = false, unique = true)
    private String permissionName;

    private String description;


    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles;
}
