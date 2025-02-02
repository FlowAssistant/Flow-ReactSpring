package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.AIFeedback;
import com.hjwjo.flow.entity.ChatHistory;
import com.hjwjo.flow.entity.User;
import com.hjwjo.flow.repository.AIFeedbackRepository;
import com.hjwjo.flow.repository.ChatHistoryRepository;
import com.hjwjo.flow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class EveningReflectionService {

    private final ChatHistoryRepository chatHistoryRepository;
    private final AIFeedbackRepository aiFeedbackRepository;
    private final UserRepository userRepository;

    @Autowired
    public EveningReflectionService(ChatHistoryRepository chatHistoryRepository, AIFeedbackRepository aiFeedbackRepository, UserRepository userRepository) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.aiFeedbackRepository = aiFeedbackRepository;
        this.userRepository = userRepository;
    }

    // 📝 채팅 기록 저장
    public ChatHistory saveChatHistory(UUID userId, String reflection) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + userId));

        ChatHistory chat = new ChatHistory();
        chat.setUser(user);
        chat.setMessage(reflection);
        chat.setSender(ChatHistory.SenderType.USER);
        return chatHistoryRepository.save(chat);
    }

    // 📝 AI 피드백 생성 및 저장
    public AIFeedback generateFeedback(UUID userId, String reflection) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + userId));

        // 🔹 AI 분석 로직이 들어갈 부분 (현재는 더미 데이터)
        String feedbackContent;
        if (reflection.toLowerCase().contains("스트레스")) {
            feedbackContent = "오늘 스트레스가 많았군요. 내일은 더 여유로운 하루를 보내세요.";
        } else if (reflection.toLowerCase().contains("행복")) {
            feedbackContent = "행복한 하루를 보내셨네요! 내일도 좋은 기분 유지하세요.";
        } else {
            feedbackContent = "오늘 하루를 잘 마무리하셨네요. 내일도 좋은 하루가 되길 바랍니다.";
        }

        AIFeedback feedback = new AIFeedback();
        feedback.setUser(user);
        feedback.setContent(feedbackContent);

        return aiFeedbackRepository.save(feedback);
    }
}
