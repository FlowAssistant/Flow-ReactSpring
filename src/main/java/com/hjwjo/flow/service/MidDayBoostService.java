package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.EmotionLog;
import com.hjwjo.flow.repository.EmotionLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MidDayBoostService {

    private final EmotionLogRepository repository;

    public MidDayBoostService(EmotionLogRepository repository) {
        this.repository = repository;
    }

    public String generatePersonalizedFeedback(String username, List<String> responses) {
        // 다단계 응답을 기반으로 피드백 생성
        String feedback;
        if (responses.contains("피곤함") && responses.contains("산책")) {
            feedback = "피곤한 상태에서 산책을 선택하셨네요. 에너지가 조금 회복되었나요?";
        } else if (responses.contains("행복") && responses.contains("운동")) {
            feedback = "활동적인 하루를 보내셨네요! 꾸준히 이어가면 좋을 것 같아요!";
        } else {
            feedback = "자신만의 리듬을 찾아가는 모습을 응원합니다!";
        }

        // 데이터 저장
        EmotionLog log = new EmotionLog();
        log.setUsername(username);
        log.setEmotion(String.join(", ", responses));
        log.setRecommendedActivity(feedback);
        log.setCreatedAt(LocalDateTime.now());
        repository.save(log);

        return feedback;
    }
}
