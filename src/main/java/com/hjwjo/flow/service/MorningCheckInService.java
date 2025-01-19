package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.MorningCheckIn;
import com.hjwjo.flow.repository.MorningCheckInRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class MorningCheckInService {

    private final MorningCheckInRepository repository;

    public MorningCheckInService(MorningCheckInRepository repository) {
        this.repository = repository;
    }

    public MorningCheckIn handleCheckIn(String username, String emotion) {
        // 간단한 추천 활동 로직
        Map<String, String> recommendations = new HashMap<>();
        recommendations.put("행복", "좋은 음악을 들으며 하루를 시작해 보세요!");
        recommendations.put("슬픔", "따뜻한 차 한 잔과 함께 마음을 안정시키세요.");
        recommendations.put("피곤함", "잠깐의 스트레칭이나 산책으로 에너지를 회복하세요.");
        recommendations.put("신남", "활동적인 운동을 시작해보세요!");
        recommendations.put("중립", "오늘 하루를 계획하며 여유롭게 시작하세요.");

        String recommendedActivity = recommendations.getOrDefault(emotion, "자신에게 맞는 활동을 찾아보세요.");

        // 데이터 저장
        MorningCheckIn checkIn = new MorningCheckIn();
        checkIn.setUsername(username);
        checkIn.setEmotion(emotion);
        checkIn.setRecommendedActivity(recommendedActivity);

        return repository.save(checkIn);
    }
}
