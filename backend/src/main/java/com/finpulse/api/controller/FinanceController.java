package com.finpulse.api.controller;

import com.finpulse.api.dto.ApiResponse;
import com.finpulse.api.entity.FinancialTransaction;
import com.finpulse.api.service.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
public class FinanceController {

    private final FinanceService service;

    @PostMapping("/transaction")
    public ResponseEntity<ApiResponse<FinancialTransaction>> addTransaction(
            Authentication authentication,
            @RequestBody FinancialTransaction transaction
    ) {
        return ResponseEntity.ok(ApiResponse.success("Transaction added", service.addTransaction(authentication.getName(), transaction)));
    }

    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse<List<FinancialTransaction>>> getTransactions(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("Transactions fetched", service.getTransactions(authentication.getName())));
    }
}
