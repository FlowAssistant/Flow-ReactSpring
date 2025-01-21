package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.MorningCheckIn;
import com.hjwjo.flow.repository.MorningCheckInRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MorningCheckInService {

    private final MorningCheckInRepository repository;

    public MorningCheckInService(MorningCheckInRepository repository) {
        this.repository = repository;
    }

    public MorningCheckIn handleCheckIn(String username, List<String> responses) {
        // 추천 활동 로직 (종합 응답 기반)
        String recommendedActivity = generateRecommendation(responses);

        // 데이터 저장
        MorningCheckIn checkIn = new MorningCheckIn();
        checkIn.setUsername(username);
        checkIn.setResponses(String.join(", ", responses)); // 응답 리스트를 문자열로 저장
        checkIn.setRecommendedActivity(recommendedActivity);

        return repository.save(checkIn);
    }

    private String generateRecommendation(List<String> responses) {
        // 간단한 추천 로직 예제
        if (responses.contains("행복") && responses.contains("높음")) {
            return "에너지가 넘치네요! 좋아하는 운동으로 하루를 시작해보세요.";
        } else if (responses.contains("피곤함") && responses.contains("낮음")) {
            return "따뜻한 음료와 함께 편안한 독서를 추천합니다.";
        } else if (responses.contains("슬픔")) {
            return "마음을 안정시키는 음악을 들어보세요.";
        } else {
            return "자신에게 맞는 활동을 찾아보는 것도 좋습니다.";
        }
    }
}
