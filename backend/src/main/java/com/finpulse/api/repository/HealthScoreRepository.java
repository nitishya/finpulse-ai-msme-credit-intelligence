package com.finpulse.api.repository;

import com.finpulse.api.entity.HealthScore;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface HealthScoreRepository extends JpaRepository<HealthScore, Long> {
    Optional<HealthScore> findByMsmeProfileId(Long msmeProfileId);
}
