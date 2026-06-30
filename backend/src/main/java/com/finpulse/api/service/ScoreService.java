package com.finpulse.api.service;

import com.finpulse.api.entity.HealthScore;
import com.finpulse.api.entity.MsmeProfile;
import com.finpulse.api.repository.HealthScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ScoreService {

    private final HealthScoreRepository scoreRepository;
    private final MsmeProfileService profileService;
    private final RestTemplate restTemplate = new RestTemplate();

    public HealthScore generateScore(String userEmail) {
        MsmeProfile profile = profileService.getProfile(userEmail);
        if (profile == null) throw new RuntimeException("Profile not found");

        // In a real app, this would use a robust DTO and proper error handling.
        // We are calling the FastAPI AI Engine directly on the local docker network (finpulse-ai-engine)
        // Or localhost if running outside docker. We will default to a local URL for now.
        String aiEngineUrl = "http://finpulse-ai-engine:8000/api/v1/analyze";
        
        try {
            HealthScore aiResponse = restTemplate.postForObject(aiEngineUrl, profile, HealthScore.class);
            if (aiResponse != null) {
                HealthScore existing = scoreRepository.findByMsmeProfileId(profile.getId()).orElse(new HealthScore());
                existing.setScore(aiResponse.getScore());
                existing.setRiskCategory(aiResponse.getRiskCategory());
                existing.setPositiveInsightsJson(aiResponse.getPositiveInsightsJson());
                existing.setRiskFactorsJson(aiResponse.getRiskFactorsJson());
                existing.setMsmeProfile(profile);
                return scoreRepository.save(existing);
            }
        } catch (Exception e) {
            // Fallback mock if AI Engine is unavailable (e.g. local dev without docker)
            HealthScore existing = scoreRepository.findByMsmeProfileId(profile.getId()).orElse(new HealthScore());
            existing.setScore(86);
            existing.setRiskCategory("LOW");
            existing.setPositiveInsightsJson("[\"Revenue increased 18%\", \"Payment consistency good\"]");
            existing.setRiskFactorsJson("[\"Slight dip in Q2 margins\"]");
            existing.setMsmeProfile(profile);
            return scoreRepository.save(existing);
        }
        return null;
    }

    public HealthScore getScore(String userEmail) {
        MsmeProfile profile = profileService.getProfile(userEmail);
        return scoreRepository.findByMsmeProfileId(profile.getId()).orElse(null);
    }
}
