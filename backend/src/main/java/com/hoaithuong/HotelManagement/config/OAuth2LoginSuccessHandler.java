package com.hoaithuong.HotelManagement.config;

import com.hoaithuong.HotelManagement.service.AuthenticationService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final AuthenticationService authenticationService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttribute("email");
        String firstName = oauth2User.getAttribute("given_name");
        String lastName = oauth2User.getAttribute("family_name");

        // Fallback if specific names are missing
        if (firstName == null)
            firstName = oauth2User.getAttribute("name");
        if (lastName == null)
            lastName = "";

        log.info("OAuth2 User authenticated: {}, Name: {} {}", email, firstName, lastName);

        String token = authenticationService.generateTokenForOAuth2(email, firstName, lastName);

        // Redirect to frontend with token
        // Use environment variable or property for frontend URL in real app, hardcoding
        // for now
        response.sendRedirect("http://localhost:5173/oauth2/redirect?token=" + token);
    }
}
