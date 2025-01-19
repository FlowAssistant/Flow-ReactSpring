package com.hjwjo.flow.repository;

import com.hjwjo.flow.entity.EmotionLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmotionLogRepository extends JpaRepository<EmotionLog, Long> {
    List<EmotionLog> findByUsername(String username);
}
