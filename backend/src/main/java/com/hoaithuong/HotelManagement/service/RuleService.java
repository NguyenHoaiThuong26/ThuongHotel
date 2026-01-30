package com.hoaithuong.HotelManagement.service;

import org.springframework.stereotype.Service;

@Service
public class RuleService {

    public String handle(String message) {
        message = message.toLowerCase();

        if (message.contains("check-in")) {
            return "Giờ nhận phòng là 14:00.";
        }
        if (message.contains("check-out")) {
            return "Giờ trả phòng là 12:00.";
        }
        if (message.contains("địa chỉ")) {
            return "Khách sạn nằm tại Đại học Nông Lâm TP. HCM.";
        }
        if (message.contains("xin chào") || message.contains("hello")) {
            return "Xin chào! Tôi có thể hỗ trợ bạn về phòng và dịch vụ khách sạn.";
        }

        return null; // không xử lý được thì trả về null
    }
}

