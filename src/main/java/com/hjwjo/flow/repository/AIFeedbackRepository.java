package com.hjwjo.flow.repository;

import com.hjwjo.flow.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface AIFeedbackRepository extends JpaRepository<AIFeedback, UUID> {
    List<AIFeedback> findByUserId(UUID id);
}
