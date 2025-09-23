package com.hoaithuong.HotelManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "qrcodes")
public class QRCode {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String qrCodeId;

    @OneToOne
    @JoinColumn(name = "booking_id")
    Booking booking;

    String qrData;
    LocalDateTime createdAt;
    LocalDateTime expiredAt;
    String status;
}

