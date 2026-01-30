package com.hoaithuong.HotelManagement.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hoaithuong.HotelManagement.entity.Room;
import com.hoaithuong.HotelManagement.enums.IntentType;
import com.hoaithuong.HotelManagement.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.NumberFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AIService {
    @Value("${openrouter.api.key}")
    private String apiKey;

    @Value("${openrouter.model}")
    private String model;

    private final RoomRepository roomRepository;

    private final RuleService ruleService;

    private final IntentService intentService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String chat(String userMessage) {
        try {
            // ================== RULE-BASED ==================
            String ruleAnswer = ruleService.handle(userMessage);
            if (ruleAnswer != null) {
                return ruleAnswer;
            }

            // ================== INTENT DETECTION ==================
            IntentType intent = intentService.detect(userMessage);

            // ================== BUILD PROMPT THEO INTENT ==================
            String systemPrompt;

            switch (intent) {
                case ROOM:

                case PRICE:
                    systemPrompt = buildRoomPrompt();
                    break;
                case SERVICE:
                    systemPrompt = buildServicePrompt();
                    break;
                case POLICY:
                    systemPrompt = buildPolicyPrompt();
                    break;
                case BOOKING:
                    systemPrompt = buildBookingPrompt();
                    break;
                case PAYMENT:
                    systemPrompt = buildPaymentPrompt();
                    break;
                case CONTACT:
                    systemPrompt = buildContactPrompt();
                    break;
                default:
                    systemPrompt = buildGeneralPrompt();
            }

            // ================== CALL AI ==================
            return callOpenRouter(systemPrompt, userMessage);

        } catch (Exception e) {
            e.printStackTrace();
            return "Xin lỗi, hệ thống AI đang gặp sự cố.";
        }
    }

    // ================== PROMPT BUILDERS ==================

    // Prompt cho câu hỏi về phòng / giá
    private String buildRoomPrompt() throws Exception {
        List<Room> rooms = roomRepository.findAll();
        NumberFormat vnFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));

        List<Map<String, Object>> roomData = rooms.stream().map(r -> Map.of(
                "name", r.getRoomNumber(),
                "type", r.getRoomType().getTypeName(),
                "price", vnFormat.format(r.getPrice()),
                "status", r.getStatus(),
                "capacity", r.getMaxAdults() + " người lớn, " + r.getMaxChildren() + " trẻ em",
                "amenities", r.getAmenities()
        )).toList();

        return """
Bạn là trợ lý lễ tân khách sạn.

DỮ LIỆU PHÒNG (chỉ được sử dụng dữ liệu này, không được bịa):
%s

NHIỆM VỤ:
- Trả lời câu hỏi dựa trên dữ liệu phòng.
- Nếu phòng còn trống, hãy liệt kê.
- Nếu không có phòng phù hợp, hãy nói rõ.
- Trả lời ngắn gọn, dễ hiểu, thân thiện.

ĐỊNH DẠNG BẮT BUỘC:

Nếu có nhiều phòng:
### Danh sách phòng còn trống
- **Tên phòng**: ...
  - Loại phòng: ...
  - Giá: ... VND
  - Sức chứa: ...
  - Tiện nghi: ...
  - Trạng thái: ...
""".formatted(objectMapper.writeValueAsString(roomData));
    }

    // Prompt cho dịch vụ khách sạn
    private String buildServicePrompt() {
        return """
Bạn là chatbot khách sạn.

Thông tin dịch vụ khách sạn:
- Wifi miễn phí
- Ăn sáng buffet
- Giặt ủi
- Đưa đón sân bay
- Hồ bơi, phòng gym

Hãy trả lời câu hỏi của khách về dịch vụ một cách ngắn gọn, lịch sự.
Nếu không chắc chắn, hãy nói rõ.
""";
    }

    // Prompt cho chính sách
    private String buildPolicyPrompt() {
        return """
Bạn là chatbot khách sạn.

Chính sách khách sạn:
- Check-in: 14:00
- Check-out: 12:00
- Hủy phòng miễn phí trước 24 giờ

Hãy trả lời câu hỏi của khách dựa trên thông tin trên.
""";
    }

    // Prompt cho đặt phòng
    private String buildBookingPrompt() {
        return """
Bạn là chatbot khách sạn.

Hãy hướng dẫn khách cách đặt phòng theo các bước sau:
1. Vào trang phòng, chọn đặt ngay.
2. Chọn ngày nhận phòng và trả phòng.
3. Chọn số lượng người lớn, trẻ em.
4. Xác nhận đặt phòng.

Trả lời ngắn gọn, rõ ràng, thân thiện.
""";
    }

    private String buildPaymentPrompt() {
        return """
Bạn là chatbot khách sạn.

Thông tin thanh toán:
- Thanh toán bằng tiền mặt hoặc chuyển khoản tại quầy lễ tân.
- Có thể thanh toán khi check-in hoặc check-out.

Hãy trả lời câu hỏi của khách về thanh toán một cách rõ ràng, lịch sự.
""";
    }

    private String buildContactPrompt() {
        return """
Bạn là chatbot khách sạn.

Thông tin liên hệ khách sạn:
- Hotline: 0938 998 972
- Email: gnouht26@gmail.com
- Địa chỉ: Đại học Nông Lâm TP. HCM

Hãy trả lời câu hỏi của khách về thông tin liên hệ một cách ngắn gọn, rõ ràng, lịch sự.
""";
    }



    // Prompt chung
    private String buildGeneralPrompt() {
        return """
Bạn là trợ lý khách sạn.
Hãy trả lời câu hỏi của khách một cách lịch sự, ngắn gọn.
Nếu không chắc chắn, hãy khuyên khách liên hệ lễ tân.
""";
    }

    // ================== CALL OPENROUTER ==================

    private String callOpenRouter(String systemPrompt, String userMessage) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", systemPrompt),
                        Map.of("role", "user", "content", userMessage)
                )
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "https://openrouter.ai/api/v1/chat/completions",
                request,
                String.class
        );

        JsonNode json = objectMapper.readTree(response.getBody());
        return json.get("choices").get(0).get("message").get("content").asText();
    }

}
