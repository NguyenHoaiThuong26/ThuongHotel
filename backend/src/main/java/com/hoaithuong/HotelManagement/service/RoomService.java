package com.hoaithuong.HotelManagement.service;

import com.hoaithuong.HotelManagement.dto.request.RoomRequest;
import com.hoaithuong.HotelManagement.dto.response.RoomResponse;
import com.hoaithuong.HotelManagement.entity.Room;
import com.hoaithuong.HotelManagement.entity.RoomType;
import com.hoaithuong.HotelManagement.exception.AppException;
import com.hoaithuong.HotelManagement.exception.ErrorCode;
import com.hoaithuong.HotelManagement.mapper.RoomMapper;
import com.hoaithuong.HotelManagement.repository.BookingRepository;
import com.hoaithuong.HotelManagement.repository.RoomRepository;
import com.hoaithuong.HotelManagement.repository.RoomTypeRepository;
import com.hoaithuong.HotelManagement.repository.RoomImageRepository;
import com.hoaithuong.HotelManagement.entity.RoomImage;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.ArrayList;
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
    BookingRepository bookingRepository;
    RoomTypeRepository roomTypeRepository;
    RoomImageRepository roomImageRepository;
    RoomMapper roomMapper;

    // get available rooms
    public List<RoomResponse> getAvailableRooms(java.time.LocalDateTime checkIn, java.time.LocalDateTime checkOut) {
        List<Room> allRooms = roomRepository.findAll();
        List<Room> activeRooms = allRooms.stream()
                .filter(room -> !room.isDeleted() && "AVAILABLE".equalsIgnoreCase(room.getStatus()))
                .toList();

        if (checkIn == null || checkOut == null) {
            return activeRooms.stream().map(roomMapper::toRoomResponse).toList();
        }

        List<String> occupiedRoomIds = bookingRepository.findOccupiedRoomIds(checkIn, checkOut);

        return activeRooms.stream()
                .filter(room -> !occupiedRoomIds.contains(room.getRoomId()))
                .map(roomMapper::toRoomResponse)
                .toList();
    }

    public List<RoomResponse> getAllRooms(String status, Long roomTypeId, String keyword) {
        List<Room> rooms = roomRepository.searchRooms(keyword, status, roomTypeId);

        return rooms.stream()
                .filter(room -> !room.isDeleted())
                .map(roomMapper::toRoomResponse)
                .toList();
    }

    // get room details
    public RoomResponse getRoom(String roomId) {
        var room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
        return roomMapper.toRoomResponse(room);
    }

    // create a room
    @Transactional
    public RoomResponse createRoom(RoomRequest request, List<MultipartFile> images) {
        if (roomRepository.existsByRoomNumber(request.getRoomNumber())) {
            throw new AppException(ErrorCode.ROOM_ALREADY_EXISTS);
        }

        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        if (request.getPrice() < 0)
            throw new AppException(ErrorCode.INVALID_PRICE);

        if (request.getMaxAdults() <= 0)
            throw new AppException(ErrorCode.INVALID_CAPACITY);


        Room room = roomMapper.toRoom(request);
        room.setRoomType(roomType);
        room.setAmenities(request.getAmenities());
        room.setStatus("AVAILABLE");

        Room savedRoom = roomRepository.save(room);

        if (images != null && !images.isEmpty()) {
            List<RoomImage> roomImages = new ArrayList<>();
            for (MultipartFile image : images) {
                String imageUrl = saveImage(image);
                RoomImage roomImage = RoomImage.builder()
                        .room(savedRoom)
                        .imageUrl(imageUrl)
                        .isPrimary(false) // Default logic, can be improved
                        .build();
                roomImages.add(roomImageRepository.save(roomImage));
            }
            savedRoom.setImages(roomImages);
        }

        return roomMapper.toRoomResponse(savedRoom);
    }

    private String saveImage(MultipartFile file) {
        try {
            String uploadDir = "uploads/rooms/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.lastIndexOf(".") > 0) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String fileName = UUID.randomUUID().toString() + extension;
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "http://localhost:8080/hotel/uploads/rooms/" + fileName; // Return full URL or relative path
        } catch (IOException e) {
            throw new RuntimeException("Không thể lưu trữ tập tin " + file.getOriginalFilename() + ". Vui lòng thử lại!", e);
        }
    }

    // update a room
    public RoomResponse updateRoom(String roomId, RoomRequest request, List<MultipartFile> newImages) {
        var existingRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        if (!existingRoom.getRoomNumber().equals(request.getRoomNumber()) &&
                roomRepository.existsByRoomNumber(request.getRoomNumber())) {
            throw new AppException(ErrorCode.ROOM_ALREADY_EXISTS);
        }

        existingRoom.setRoomNumber(request.getRoomNumber());
        existingRoom.setPrice(request.getPrice());
        existingRoom.setMaxAdults(request.getMaxAdults());
        existingRoom.setMaxChildren(request.getMaxChildren());
        existingRoom.setFloor(request.getFloor());
        existingRoom.setDescription(request.getDescription());
        existingRoom.setStatus(request.getStatus());
        existingRoom.setRoomType(roomType);
        existingRoom.setAmenities(request.getAmenities());

        // Handle Images
        List<RoomImage> currentImages = existingRoom.getImages();
        if (currentImages == null)
            currentImages = new ArrayList<>();

        // 1. Identify images to delete (those not in retainedImages)
        List<String> retainedUrls = request.getRetainedImages() != null ? request.getRetainedImages()
                : new ArrayList<>();
        List<RoomImage> imagesToDelete = new ArrayList<>();
        List<RoomImage> imagesToKeep = new ArrayList<>();

        for (RoomImage img : currentImages) {
            if (!retainedUrls.contains(img.getImageUrl())) {
                imagesToDelete.add(img);
            } else {
                imagesToKeep.add(img);
            }
        }

        // Delete from DB and FS (optional FS deletion, skipping for safety now)
        roomImageRepository.deleteAll(imagesToDelete);

        // 2. Add new images
        if (newImages != null && !newImages.isEmpty()) {
            for (MultipartFile image : newImages) {
                String imageUrl = saveImage(image);
                RoomImage roomImage = RoomImage.builder()
                        .room(existingRoom)
                        .imageUrl(imageUrl)
                        .isPrimary(false)
                        .build();
                imagesToKeep.add(roomImageRepository.save(roomImage));
            }
        }

        existingRoom.setImages(imagesToKeep);

        return roomMapper.toRoomResponse(roomRepository.save(existingRoom));
    }

    // delete a room (soft delete)
    public void deleteRoom(String roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        boolean hasActiveBooking = bookingRepository.existsActiveBooking(roomId);
        if (hasActiveBooking) {
            throw new AppException(ErrorCode.ROOM_HAS_ACTIVE_BOOKING);
        }

        room.setDeleted(true);
        roomRepository.save(room);
    }

    // update room status
    public RoomResponse updateRoomStatus(String roomId, String status) {
        var room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        room.setStatus(status);
        return roomMapper.toRoomResponse(roomRepository.save(room));
    }


    public List<Room> getAllRoomsForAI() {
        return roomRepository.findAll().stream()
                .filter(room -> !room.isDeleted())
                .toList();
    }
}
