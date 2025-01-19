package com.hjwjo.flow.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MidDayBoostController {

    @PostMapping("/midday-boost")
    public Map<String, String> middayBoost(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String emotion = request.get("emotion");

        String feedback = generateFeedback(emotion);

        Map<String, String> response = new HashMap<>();
        response.put("username", username);
        response.put("feedback", feedback);

        return response;
    }

    private String generateFeedback(String emotion) {
        switch (emotion) {
            case "행복":
                return "계속 좋은 하루를 유지하세요! 주변 사람들에게 미소를 전해보세요.";
            case "슬픔":
                return "지금 기분이 슬프다면, 좋아하는 음악을 들어보는 건 어때요?";
            case "피곤함":
                return "잠시 스트레칭을 하거나 따뜻한 차를 마시며 에너지를 충전해보세요.";
            case "신남":
                return "좋은 에너지를 이용해 새롭게 도전해보세요!";
            case "중립":
                return "지금 평온한 상태를 즐기며 가벼운 산책을 해보는 건 어떨까요?";
            default:
                return "기분을 입력해주세요!";
        }
    }
}
