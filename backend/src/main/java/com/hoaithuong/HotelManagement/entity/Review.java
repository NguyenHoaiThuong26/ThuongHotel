package com.hoaithuong.HotelManagement.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String reviewId;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false)
    Booking booking;

    int rating; // 1-5

    @Column(columnDefinition = "TEXT")
    String comment;

    LocalDateTime createdAt;
}
