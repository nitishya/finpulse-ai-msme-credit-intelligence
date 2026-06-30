package com.finpulse.api.controller;

import com.finpulse.api.dto.ApiResponse;
import com.finpulse.api.entity.MsmeProfile;
import com.finpulse.api.service.MsmeProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/msme")
@RequiredArgsConstructor
public class MsmeProfileController {

    private final MsmeProfileService service;

    @PostMapping("/profile")
    public ResponseEntity<ApiResponse<MsmeProfile>> createOrUpdateProfile(
            Authentication authentication,
            @RequestBody MsmeProfile profileData
    ) {
        MsmeProfile savedProfile = service.createOrUpdateProfile(authentication.getName(), profileData);
        return ResponseEntity.ok(ApiResponse.success("Profile saved", savedProfile));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<MsmeProfile>> getProfile(Authentication authentication) {
        MsmeProfile profile = service.getProfile(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", profile));
    }
    
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<MsmeProfile>>> getAllProfiles() {
        return ResponseEntity.ok(ApiResponse.success("Profiles fetched", service.getAllProfiles()));
    }
}
