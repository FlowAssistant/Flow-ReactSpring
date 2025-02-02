package com.hjwjo.flow.controller;

import com.hjwjo.flow.entity.AIFeedback;
import com.hjwjo.flow.entity.ChatHistory;
import com.hjwjo.flow.service.EveningReflectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class EveningReflectionController {

    private final EveningReflectionService service;

    public EveningReflectionController(EveningReflectionService service) {
        this.service = service;
    }

    @PostMapping("/evening-reflection")
    public ResponseEntity<?> eveningReflection(@RequestBody Map<String, Object> request) {
        try {
            UUID userId = UUID.fromString((String) request.get("userId"));
            String reflection = (String) request.get("reflection");

            ChatHistory chatHistory = service.saveChatHistory(userId, reflection);
            AIFeedback aiFeedback = service.generateFeedback(userId, reflection);

            return ResponseEntity.ok(Map.of(
                    "message", "저녁 회고 완료",
                    "feedback", aiFeedback.getContent()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "잘못된 UUID 형식입니다."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "서버 오류 발생"));
        }
    }
}
