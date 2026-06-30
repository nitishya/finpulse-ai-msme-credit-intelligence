package com.finpulse.api.controller;

import com.finpulse.api.dto.ApiResponse;
import com.finpulse.api.entity.HealthScore;
import com.finpulse.api.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/score")
@RequiredArgsConstructor
public class ScoreController {

    private final ScoreService service;

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<HealthScore>> generateScore(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("Score generated", service.generateScore(authentication.getName())));
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse<HealthScore>> getScore(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("Score fetched", service.getScore(authentication.getName())));
    }
}
