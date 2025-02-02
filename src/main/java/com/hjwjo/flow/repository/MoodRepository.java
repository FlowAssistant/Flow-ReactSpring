package com.hjwjo.flow.repository;

import com.hjwjo.flow.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MoodRepository extends JpaRepository<Mood, UUID> {
    List<Mood> findByUserId(UUID userId);
}