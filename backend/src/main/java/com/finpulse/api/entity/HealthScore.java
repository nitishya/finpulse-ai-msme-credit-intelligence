package com.finpulse.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "health_scores")
public class HealthScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer score; // 0-100
    private String riskCategory; // LOW, MEDIUM, HIGH

    @Column(columnDefinition = "TEXT")
    private String positiveInsightsJson; // Storing as JSON string for simplicity

    @Column(columnDefinition = "TEXT")
    private String riskFactorsJson;

    @OneToOne
    @JoinColumn(name = "msme_id", referencedColumnName = "id")
    private MsmeProfile msmeProfile;
}
