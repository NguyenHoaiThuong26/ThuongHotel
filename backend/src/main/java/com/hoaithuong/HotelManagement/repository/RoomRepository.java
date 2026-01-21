package com.hoaithuong.HotelManagement.repository;

import com.hoaithuong.HotelManagement.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {

    List<Room> findByStatus(String status);

    List<Room> findByRoomType_RoomTypeId(Long roomTypeId);

    List<Room> findByRoomType_RoomTypeIdAndStatus(Long roomTypeId, String status);

    boolean existsByRoomNumber(String roomNumber);

    long countByStatus(String status);

    @org.springframework.data.jpa.repository.Query("SELECT r FROM Room r WHERE " +
            "(:roomNumber IS NULL OR LOWER(r.roomNumber) LIKE LOWER(CONCAT('%', :roomNumber, '%'))) AND " +
            "(:status IS NULL OR r.status = :status) AND " +
            "(:roomTypeId IS NULL OR r.roomType.roomTypeId = :roomTypeId)")
    List<Room> searchRooms(@org.springframework.data.repository.query.Param("roomNumber") String roomNumber,
            @org.springframework.data.repository.query.Param("status") String status,
            @org.springframework.data.repository.query.Param("roomTypeId") Long roomTypeId);
}
