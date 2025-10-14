package com.hoaithuong.HotelManagement.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least 3 characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    ROLE_NOT_FOUND(1008, "Role not found", HttpStatus.NOT_FOUND),
    PERMISSION_NOT_FOUND(1009, "Permission not found", HttpStatus.NOT_FOUND),
    ROOM_NOT_FOUND(1010, "Room not found", HttpStatus.NOT_FOUND),
    ROOM_ALREADY_EXISTS(1011, "Room already exists", HttpStatus.BAD_REQUEST),
    ROOM_TYPE_NOT_FOUND(1012, "Room type not found", HttpStatus.NOT_FOUND),
    INVALID_ROOM_STATUS(1013, "Invalid room status", HttpStatus.BAD_REQUEST),
    ROOM_DELETE_FAILED(1014, "Cannot delete room due to related bookings or images", HttpStatus.CONFLICT)
    ;


    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private int code;
    private String message;
    private HttpStatusCode statusCode;
}