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

}
