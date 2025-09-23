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
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    LocalDateTime checkIn;
    LocalDateTime checkOut;
    int numAdults;
    int numChildren;
    String status;
    Double totalPrice;
    LocalDateTime createdAt;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    Payment payment;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    QRCode qrCode;

    @ManyToMany
    @JoinTable(
            name = "booking_services",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private List<ServiceEntity> services;
}

