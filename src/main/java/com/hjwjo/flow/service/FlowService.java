package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.*;
import com.hjwjo.flow.repository.*;
import org.springframework.stereotype.Service;

@Service
public class FlowService {

    private final MoodRepository moodRepository;
    private final ActivityRepository activityRepository;
    private final ChatHistoryRepository chatHistoryRepository;
    private final AIFeedbackRepository aiFeedbackRepository;

    public FlowService(MoodRepository moodRepository, ActivityRepository activityRepository,
                       ChatHistoryRepository chatHistoryRepository, AIFeedbackRepository aiFeedbackRepository) {
        this.moodRepository = moodRepository;
        this.activityRepository = activityRepository;
        this.chatHistoryRepository = chatHistoryRepository;
        this.aiFeedbackRepository = aiFeedbackRepository;
    }

    // Mood 저장
    public Mood saveMood(Mood mood) {
        return moodRepository.save(mood);
    }

    // Activity 저장
    public Activity saveActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    // ChatHistory 저장
    public ChatHistory saveChat(ChatHistory chat) {
        return chatHistoryRepository.save(chat);
    }

    // AI_Feedback 저장
    public AIFeedback saveFeedback(AIFeedback feedback) {
        return aiFeedbackRepository.save(feedback);
    }
}
