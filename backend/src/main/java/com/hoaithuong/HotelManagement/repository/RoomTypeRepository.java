package com.hoaithuong.HotelManagement.repository;

import com.hoaithuong.HotelManagement.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {

    Optional<RoomType> findByTypeName(String typeName);

    boolean existsByTypeName(String typeName);
}
