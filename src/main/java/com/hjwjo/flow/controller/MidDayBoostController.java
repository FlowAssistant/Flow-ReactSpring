package com.hjwjo.flow.controller;

import com.hjwjo.flow.entity.EmotionLog;
import com.hjwjo.flow.service.MidDayBoostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MidDayBoostController {

    private final MidDayBoostService service;

    public MidDayBoostController(MidDayBoostService service) {
        this.service = service;
    }

    @PostMapping("/midday-boost")
    public ResponseEntity<?> middayBoost(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        List<String> responses = (List<String>) request.get("responses"); // 다단계 질문 응답 리스트

        String feedback = service.generatePersonalizedFeedback(username, responses);

        return ResponseEntity.ok(Map.of(
                "username", username,
                "feedback", feedback,
                "pointsEarned", 10 // 예제 포인트 시스템
        ));
    }
}
