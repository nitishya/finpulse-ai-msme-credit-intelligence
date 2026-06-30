package com.finpulse.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "financial_transactions")
public class FinancialTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionType; // e.g. GST, UPI
    private Double amount;
    private LocalDateTime transactionDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "msme_id", referencedColumnName = "id")
    private MsmeProfile msmeProfile;
}
