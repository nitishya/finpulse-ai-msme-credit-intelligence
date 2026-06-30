package com.finpulse.api.repository;

import com.finpulse.api.entity.FinancialTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FinancialTransactionRepository extends JpaRepository<FinancialTransaction, Long> {
    List<FinancialTransaction> findByMsmeProfileId(Long msmeProfileId);
}
