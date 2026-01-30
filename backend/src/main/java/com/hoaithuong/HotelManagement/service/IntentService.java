package com.hoaithuong.HotelManagement.service;

import com.hoaithuong.HotelManagement.enums.IntentType;
import org.springframework.stereotype.Service;

@Service
public class IntentService {

    public IntentType detect(String message) {
        message = message.toLowerCase();

        if (message.contains("phòng")) return IntentType.ROOM;
        if (message.contains("giá")) return IntentType.PRICE;
        if (message.contains("dịch vụ")
                || message.contains("hồ bơi")
                || message.contains("gym")
                || message.contains("spa")
                || message.contains("ăn sáng")
                || message.contains("wifi")) return IntentType.SERVICE;
        if (message.contains("đặt") || message.contains("đặt phòng")) return IntentType.BOOKING;
        if (message.contains("chính sách")
                || message.contains("hủy")
                ) return IntentType.POLICY;
        if (message.contains("thanh toán")
                || message.contains("trả tiền")
                || message.contains("payment")) return IntentType.PAYMENT;
        if (message.contains("liên hệ")
                || message.contains("số điện thoại")
                || message.contains("hotline")
                || message.contains("email")
                || message.contains("gọi")
                || message.contains("contact")) return IntentType.CONTACT;
        return IntentType.GENERAL;
    }
}
