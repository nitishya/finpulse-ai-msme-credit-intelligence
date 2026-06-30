package com.finpulse.api.repository;

import com.finpulse.api.entity.MsmeProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MsmeProfileRepository extends JpaRepository<MsmeProfile, Long> {
    Optional<MsmeProfile> findByUserId(Long userId);
}
