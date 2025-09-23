package com.hoaithuong.HotelManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chatbot_logs")
public class ChatbotLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long chatbotLogId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    String message;
    String response;
    String intent;
    LocalDateTime timestamp;
}

