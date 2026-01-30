package com.hoaithuong.HotelManagement.service;

import com.hoaithuong.HotelManagement.dto.request.RoomTypeRequest;
import com.hoaithuong.HotelManagement.dto.response.RoomTypeResponse;
import com.hoaithuong.HotelManagement.entity.RoomType;
import com.hoaithuong.HotelManagement.exception.AppException;
import com.hoaithuong.HotelManagement.exception.ErrorCode;
import com.hoaithuong.HotelManagement.mapper.RoomTypeMapper;
import com.hoaithuong.HotelManagement.repository.RoomRepository;
import com.hoaithuong.HotelManagement.repository.RoomTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomTypeService {
    RoomTypeRepository roomTypeRepository;
    RoomTypeMapper roomTypeMapper;
    RoomRepository roomRepository;

    public RoomTypeResponse createRoomType(RoomTypeRequest request) {
        if (roomTypeRepository.existsByTypeName(request.getTypeName())) {
            throw new com.hoaithuong.HotelManagement.exception.AppException(
                    com.hoaithuong.HotelManagement.exception.ErrorCode.ROOM_TYPE_EXISTED);
        }
        RoomType roomType = roomTypeMapper.toRoomType(request);
        return roomTypeMapper.toRoomTypeResponse(roomTypeRepository.save(roomType));
    }

    public List<RoomTypeResponse> getAllRoomTypes() {
        return roomTypeRepository.findAll().stream()
                .map(roomTypeMapper::toRoomTypeResponse)
                .toList();
    }

    public RoomTypeResponse updateRoomType(Long id, RoomTypeRequest request) {
        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new com.hoaithuong.HotelManagement.exception.AppException(
                        com.hoaithuong.HotelManagement.exception.ErrorCode.ROOM_TYPE_NOT_FOUND));

        if (!roomType.getTypeName().equals(request.getTypeName())
                && roomTypeRepository.existsByTypeName(request.getTypeName())) {
            throw new com.hoaithuong.HotelManagement.exception.AppException(
                    com.hoaithuong.HotelManagement.exception.ErrorCode.ROOM_TYPE_EXISTED);
        }

        roomTypeMapper.updateRoomType(roomType, request);
        return roomTypeMapper.toRoomTypeResponse(roomTypeRepository.save(roomType));
    }

    public void deleteRoomType(Long id) {
        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        boolean hasRooms = roomRepository.existsByRoomType_RoomTypeId(id);
        if (hasRooms) {
            throw new AppException(ErrorCode.ROOM_TYPE_IN_USE);
        }
        roomTypeRepository.deleteById(id);
    }

}
