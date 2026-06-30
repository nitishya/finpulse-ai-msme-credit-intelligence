package com.finpulse.api.service;

import com.finpulse.api.entity.FinancialTransaction;
import com.finpulse.api.entity.MsmeProfile;
import com.finpulse.api.repository.FinancialTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FinanceService {

    private final FinancialTransactionRepository transactionRepository;
    private final MsmeProfileService profileService;

    public FinancialTransaction addTransaction(String userEmail, FinancialTransaction transaction) {
        MsmeProfile profile = profileService.getProfile(userEmail);
        if (profile == null) {
            throw new RuntimeException("MSME Profile not found for user");
        }
        transaction.setMsmeProfile(profile);
        if (transaction.getTransactionDate() == null) {
            transaction.setTransactionDate(LocalDateTime.now());
        }
        return transactionRepository.save(transaction);
    }

    public List<FinancialTransaction> getTransactions(String userEmail) {
        MsmeProfile profile = profileService.getProfile(userEmail);
        if (profile == null) return List.of();
        return transactionRepository.findByMsmeProfileId(profile.getId());
    }
}
