package com.hoaithuong.HotelManagement.mapper;

import com.hoaithuong.HotelManagement.dto.response.ReviewResponse;
import com.hoaithuong.HotelManagement.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(target = "authorName", expression = "java(review.getBooking().getUser().getFirstName() + \" \" + review.getBooking().getUser().getLastName())")
    ReviewResponse toReviewResponse(Review review);
}
