package com.hoaithuong.HotelManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "qrcodes")
public class QRCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qrCodeId;

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    private String qrData;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;
}

