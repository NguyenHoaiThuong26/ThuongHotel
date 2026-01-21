package com.hoaithuong.HotelManagement.service;

import com.hoaithuong.HotelManagement.dto.request.AuthenticationRequest;
import com.hoaithuong.HotelManagement.dto.request.IntrospectRequest;
import com.hoaithuong.HotelManagement.dto.request.LogoutRequest;
import com.hoaithuong.HotelManagement.dto.request.SocialLoginRequest;
import com.hoaithuong.HotelManagement.dto.request.UserCreationRequest;
import com.hoaithuong.HotelManagement.dto.response.AuthenticationResponse;
import com.hoaithuong.HotelManagement.dto.response.IntrospectResponse;
import com.hoaithuong.HotelManagement.dto.response.UserResponse;
import com.hoaithuong.HotelManagement.entity.InvalidatedToken;
import com.hoaithuong.HotelManagement.entity.Role;
import com.hoaithuong.HotelManagement.entity.User;
import com.hoaithuong.HotelManagement.exception.AppException;
import com.hoaithuong.HotelManagement.exception.ErrorCode;
import com.hoaithuong.HotelManagement.mapper.UserMapper;
import com.hoaithuong.HotelManagement.repository.InvalidatedTokenRepository;
import com.hoaithuong.HotelManagement.repository.RoleRepository;
import com.hoaithuong.HotelManagement.repository.UserRepository;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Set;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;
    EmailService emailService;
    InvalidatedTokenRepository invalidatedTokenRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    public IntrospectResponse introspect(IntrospectRequest request)
            throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token);
        } catch (AppException e) {
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(),
                user.getPassword());

        if (!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (!user.isEnabled()) {
            throw new AppException(ErrorCode.USER_NOT_VERIFIED);
        }

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    public boolean verifyUser(String verificationCode) {
        log.info("Attempting to verify user with code: {}", verificationCode);
        User user = userRepository.findByVerificationCode(verificationCode)
                .orElseThrow(() -> {
                    log.error("Verification failed: Code '{}' not found in database.", verificationCode);
                    return new AppException(ErrorCode.INVALID_KEY);
                });

        user.setEnabled(true);
        user.setVerificationCode(null);
        userRepository.save(user);
        return true;
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("thuonghotel.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(user.getRoles()))
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getRoleName());
                if (!CollectionUtils.isEmpty(role.getPermissions()))
                    role.getPermissions()
                            .forEach(permission -> stringJoiner.add(permission.getPermissionName()));
            });

        return stringJoiner.toString();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        var signToken = verifyToken(request.getToken());

        String jit = signToken.getJWTClaimsSet().getJWTID();
        Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();

        invalidatedTokenRepository.save(invalidatedToken);
    }

    private SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedTokenRepository
                .existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    public AuthenticationResponse socialLogin(SocialLoginRequest request) {
        // Mock implementation: Trust the email from request
        // In production: Verify 'token' with 'provider' (Google/Facebook) APIs

        var user = userRepository.findByUsername(request.getEmail())
                .orElseGet(() -> {
                    // Auto-register if not exists
                    User newUser = User.builder()
                            .username(request.getEmail())
                            .password(new BCryptPasswordEncoder(10).encode("123456")) // Default password
                            // .roles(...) // Default role
                            .build();
                    return userRepository.save(newUser);
                });

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    @org.springframework.transaction.annotation.Transactional
    public String generateTokenForOAuth2(String email, String firstName, String lastName) {
        var user = userRepository.findByUsername(email)
                .map(existingUser -> {
                    // Update existing user info if missing
                    boolean changed = false;
                    if (existingUser.getEmail() == null || existingUser.getEmail().isEmpty()) {
                        existingUser.setEmail(email);
                        changed = true;
                    }
                    if (existingUser.getFirstName() == null || existingUser.getFirstName().isEmpty()) {
                        existingUser.setFirstName(firstName);
                        changed = true;
                    }
                    if (existingUser.getLastName() == null || existingUser.getLastName().isEmpty()) {
                        existingUser.setLastName(lastName);
                        changed = true;
                    }
                    if (changed) {
                        return userRepository.save(existingUser);
                    }
                    return existingUser;
                })
                .orElseGet(() -> {
                    // Get USER role
                    Role userRole = roleRepository.findByRoleName("USER")
                            .orElseThrow(() -> new RuntimeException("USER role not found"));

                    // Generate random password
                    String randomPassword = java.util.UUID.randomUUID().toString().substring(0, 8);

                    User newUser = User.builder()
                            .username(email)
                            .password(new BCryptPasswordEncoder(10).encode(randomPassword))
                            .firstName(firstName)
                            .lastName(lastName)
                            .email(email)
                            .roles(Set.of(userRole))
                            .enabled(true)
                            .build();

                    User savedUser = userRepository.save(newUser);

                    // Send email with password
                    try {
                        emailService.sendEmail(email, "Welcome to Thuong Hotel - Your Account Details",
                                "Welcome to Thuong Hotel!\n\n" +
                                        "Your account has been created via Google Login.\n" +
                                        "Your temporary password is: " + randomPassword + "\n\n" +
                                        "Please login and change your password immediately.");
                    } catch (Exception e) {
                        log.error("Failed to send email to user: " + email, e);
                        // Do not rollback creation? Or should we?
                        // User prefers security: "cannot empty password".
                        // If email fails, user doesn't get password. They can't change it.
                        // So they are stuck.
                        // Ideally we should throw exception to rollback.
                        throw new RuntimeException("Failed to send email with password. Account not created.");
                    }

                    return savedUser;
                });
        return generateToken(user);
    }
}
