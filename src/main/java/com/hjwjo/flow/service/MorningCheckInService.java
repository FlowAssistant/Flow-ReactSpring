package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.EmotionLog;
import com.hjwjo.flow.repository.EmotionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class MorningCheckInService {

    @Autowired
    private EmotionLogRepository emotionLogRepository;

    private static final Map<String, String> RECOMMENDATIONS = new HashMap<>() {{
        put("Happy", "Take a short walk outside.");
        put("Sad", "Listen to your favorite music.");
        put("Tired", "Try stretching or yoga.");
        put("Excited", "Plan a fun activity for the day.");
        put("Neutral", "Take a moment to relax and breathe.");
    }};

    public String getRecommendation(String emotion) {
        return RECOMMENDATIONS.getOrDefault(emotion, "Do something you enjoy!");
    }

    public EmotionLog saveEmotionLog(String username, String emotion) {
        String activity = getRecommendation(emotion);

        EmotionLog log = new EmotionLog();
        log.setUsername(username);
        log.setEmotion(emotion);
        log.setRecommendedActivity(activity);
        log.setCreatedAt(LocalDateTime.now());

        return emotionLogRepository.save(log);
    }
}
