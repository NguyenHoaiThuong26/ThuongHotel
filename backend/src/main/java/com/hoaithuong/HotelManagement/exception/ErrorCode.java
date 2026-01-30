package com.hoaithuong.HotelManagement.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi hệ thống chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Lỗi xác thực", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "Người dùng đã tồn tại", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Tên đăng nhập phải có ít nhất 3 ký tự", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Mật khẩu phải có ít nhất 8 ký tự", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "Người dùng không tồn tại", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Vui lòng đăng nhập", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "Bạn không có quyền truy cập", HttpStatus.FORBIDDEN),
    ROLE_NOT_FOUND(1008, "Không tìm thấy vai trò", HttpStatus.NOT_FOUND),
    PERMISSION_NOT_FOUND(1009, "Không tìm thấy quyền hạn", HttpStatus.NOT_FOUND),
    ROOM_NOT_FOUND(1010, "Không tìm thấy phòng", HttpStatus.NOT_FOUND),
    ROOM_ALREADY_EXISTS(1011, "Phòng đã tồn tại", HttpStatus.BAD_REQUEST),
    ROOM_TYPE_NOT_FOUND(1012, "Không tìm thấy loại phòng", HttpStatus.NOT_FOUND),
    INVALID_ROOM_STATUS(1013, "Trạng thái phòng không hợp lệ", HttpStatus.BAD_REQUEST),
    ROOM_DELETE_FAILED(1014, "Không thể xóa phòng vì có dữ liệu đặt phòng hoặc hình ảnh liên quan",
            HttpStatus.CONFLICT),
    ROOM_TYPE_EXISTED(1015, "Loại phòng đã tồn tại", HttpStatus.BAD_REQUEST),
    ROOM_ID_INVALID(1016, "ID phòng không hợp lệ", HttpStatus.BAD_REQUEST),
    CHECK_IN_INVALID(1017, "Ngày nhận phòng không hợp lệ", HttpStatus.BAD_REQUEST),
    CHECK_IN_FUTURE(1018, "Ngày nhận phòng phải trong tương lai", HttpStatus.BAD_REQUEST),
    CHECK_OUT_INVALID(1019, "Ngày trả phòng không hợp lệ", HttpStatus.BAD_REQUEST),
    CHECK_OUT_FUTURE(1020, "Ngày trả phòng phải trong tương lai", HttpStatus.BAD_REQUEST),
    INVALID_NUM_ADULTS(1021, "Số lượng người lớn không hợp lệ", HttpStatus.BAD_REQUEST),
    INVALID_NUM_CHILDREN(1022, "Số lượng trẻ em không hợp lệ", HttpStatus.BAD_REQUEST),
    USER_NOT_VERIFIED(1023, "Tài khoản chưa được xác thực. Vui lòng kiểm tra email của bạn.", HttpStatus.UNAUTHORIZED),
    INVALID_OLD_PASSWORD(1024, "Mật khẩu cũ không chính xác", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1025, "Người dùng đã tồn tại", HttpStatus.BAD_REQUEST),
    INVALID_PRICE(1026, "Giá phòng không hợp lệ", HttpStatus.BAD_REQUEST),
    INVALID_CAPACITY(1027, "Sức chứa không hợp lệ", HttpStatus.BAD_REQUEST),
    ROOM_HAS_ACTIVE_BOOKING(1028, "Phòng đang được đặt", HttpStatus.BAD_REQUEST),
    ROOM_TYPE_IN_USE(1029, "Loại phòng đang được sử dụng", HttpStatus.BAD_REQUEST),
    MAX_NUM_ADULTS(1030, "Loại phòng đang được sử dụng", HttpStatus.BAD_REQUEST),
    MAX_NUM_CHILDREN(1031, "Loại phòng đang được sử dụng", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1032, "Không tìm thấy người dùng", HttpStatus.NOT_FOUND),
    ROOM_ALREADY_BOOKED(1033, "Phòng đã được đặt trong khoảng thời gian này", HttpStatus.BAD_REQUEST),
    ROOM_IN_MAINTENANCE(1034, "Phòng đang bảo trì", HttpStatus.BAD_REQUEST),
    BOOKING_NOT_FOUND(1035, "Không tim thấy đơn đặt phòng", HttpStatus.NOT_FOUND),
    INVALID_QR_CODE(1036, "Mã QR không hợp lệ", HttpStatus.BAD_REQUEST),
    QR_CODE_NOT_ACTIVE(1037, "Mã QR không hoạt động", HttpStatus.BAD_REQUEST),
    BOOKING_NOT_BOOKED(1038, "Chỉ có thể check-in khi booking ở trạng thái BOOKED", HttpStatus.BAD_REQUEST),
    BOOKING_NOT_CHECKED_IN(1039, "Chỉ có thể check-out khi booking ở trạng thái CHECKED_IN", HttpStatus.BAD_REQUEST),
    BOOKING_NOT_PENDING(1040, "Chỉ có thể duyệt booking ở trạng thái PENDING", HttpStatus.BAD_REQUEST),
    QR_CODE_NOT_FOUND(1041, "Booking này không có mã QR", HttpStatus.BAD_REQUEST);


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