package com.hoaithuong.HotelManagement.repository;

import com.hoaithuong.HotelManagement.entity.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QRCodeRepository extends JpaRepository<QRCode, String> {
    Optional<QRCode> findByQrData(String qrData);
}
