package com.finpulse.api.service;

import com.finpulse.api.entity.MsmeProfile;
import com.finpulse.api.entity.User;
import com.finpulse.api.repository.MsmeProfileRepository;
import com.finpulse.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MsmeProfileService {

    private final MsmeProfileRepository profileRepository;
    private final UserRepository userRepository;

    public MsmeProfile createOrUpdateProfile(String userEmail, MsmeProfile profileData) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        MsmeProfile existingProfile = profileRepository.findByUserId(user.getId()).orElse(new MsmeProfile());
        
        existingProfile.setBusinessName(profileData.getBusinessName());
        existingProfile.setGstNumber(profileData.getGstNumber());
        existingProfile.setIndustry(profileData.getIndustry());
        existingProfile.setLocation(profileData.getLocation());
        existingProfile.setAnnualRevenue(profileData.getAnnualRevenue());
        existingProfile.setBusinessAgeYears(profileData.getBusinessAgeYears());
        existingProfile.setUser(user);
        
        return profileRepository.save(existingProfile);
    }

    public MsmeProfile getProfile(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return profileRepository.findByUserId(user.getId()).orElse(null);
    }
    
    public List<MsmeProfile> getAllProfiles() {
        return profileRepository.findAll();
    }
}
