package com.hoaithuong.HotelManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chatbot_logs")
public class ChatbotLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatbotLogId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String message;
    private String response;
    private String intent;
    private LocalDateTime timestamp;
}

