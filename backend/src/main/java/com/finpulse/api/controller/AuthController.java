package com.finpulse.api.controller;

import com.finpulse.api.dto.ApiResponse;
import com.finpulse.api.dto.AuthRequest;
import com.finpulse.api.dto.AuthResponse;
import com.finpulse.api.dto.RegisterRequest;
import com.finpulse.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", service.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticate(
            @RequestBody AuthRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Login successful", service.authenticate(request)));
    }
}
