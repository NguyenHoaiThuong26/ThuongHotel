package com.hoaithuong.HotelManagement.service;

import com.hoaithuong.HotelManagement.dto.request.RoomRequest;
import com.hoaithuong.HotelManagement.dto.response.RoomResponse;
import com.hoaithuong.HotelManagement.entity.Room;
import com.hoaithuong.HotelManagement.entity.RoomType;
import com.hoaithuong.HotelManagement.exception.AppException;
import com.hoaithuong.HotelManagement.exception.ErrorCode;
import com.hoaithuong.HotelManagement.mapper.RoomMapper;
import com.hoaithuong.HotelManagement.repository.RoomRepository;
import com.hoaithuong.HotelManagement.repository.RoomTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomService {
    RoomRepository roomRepository;
    RoomTypeRepository roomTypeRepository;
    RoomMapper roomMapper;

    public List<RoomResponse> getAllRooms(String status, Long roomTypeId) {
        List<Room> rooms;

        if (status != null && roomTypeId != null) {
            rooms = roomRepository.findByRoomType_RoomTypeIdAndStatus(roomTypeId, status);
        } else if (status != null) {
            rooms = roomRepository.findByStatus(status);
        } else if (roomTypeId != null) {
            rooms = roomRepository.findByRoomType_RoomTypeId(roomTypeId);
        } else {
            rooms = roomRepository.findAll();
        }

        return rooms.stream().map(roomMapper::toRoomResponse).toList();
    }

    // get room details
    public RoomResponse getRoom(String roomId) {
        var room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
        return roomMapper.toRoomResponse(room);
    }

    // create a room
    public RoomResponse createRoom(RoomRequest request) {
        if (roomRepository.existsByRoomNumber(request.getRoomNumber())) {
            throw new AppException(ErrorCode.ROOM_ALREADY_EXISTS);
        }

        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        Room room = roomMapper.toRoom(request);
        room.setRoomType(roomType);

        return roomMapper.toRoomResponse(roomRepository.save(room));
    }

    // update a room
    public RoomResponse updateRoom(String roomId, RoomRequest request) {
        var existingRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        existingRoom.setRoomNumber(request.getRoomNumber());
        existingRoom.setPrice(request.getPrice());
        existingRoom.setMaxAdults(request.getMaxAdults());
        existingRoom.setMaxChildren(request.getMaxChildren());
        existingRoom.setFloor(request.getFloor());
        existingRoom.setDescription(request.getDescription());
        existingRoom.setStatus(request.getStatus());
        existingRoom.setRoomType(roomType);

        return roomMapper.toRoomResponse(roomRepository.save(existingRoom));
    }

    // delete a room
    public void deleteRoom(String roomId) {
        if (!roomRepository.existsById(roomId))
            throw new AppException(ErrorCode.ROOM_NOT_FOUND);

        roomRepository.deleteById(roomId);
    }

    // update room status
    public RoomResponse updateRoomStatus(String roomId, String status) {
        var room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        room.setStatus(status);
        return roomMapper.toRoomResponse(roomRepository.save(room));
    }
}
